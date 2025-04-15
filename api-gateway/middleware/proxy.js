// middleware/proxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const CircuitBreaker = require('opossum');
const { breakerOptions, retryOptions, timeout } = require('./config');
const rateLimit = require('./rateLimit');

// Hàm gọi service thực tế với axios
const callService = async (url, method = 'get', data = null) => {
  return await axios({ url, method, data, timeout });
};

// Cấu hình Circuit Breaker
const breaker = new CircuitBreaker(callService, breakerOptions);

breaker.on('open', () => console.warn('[CIRCUIT BREAKER] OPEN - requests are now blocked'));
breaker.on('halfOpen', () => console.log('[CIRCUIT BREAKER] HALF-OPEN - trial request allowed'));
breaker.on('close', () => console.log('[CIRCUIT BREAKER] CLOSED - requests are allowed again'));
breaker.on('reject', () => console.warn('[CIRCUIT BREAKER] REJECTED - breaker is open'));
breaker.on('timeout', () => console.warn('[CIRCUIT BREAKER] TIMEOUT - request took too long'));
breaker.on('success', () => console.log('[CIRCUIT BREAKER] SUCCESS - service responded'));
breaker.on('failure', () => console.warn('[CIRCUIT BREAKER] FAILURE - service failed'));

// Fallback: Khi Circuit Breaker kích hoạt, trả về thông báo lỗi
breaker.fallback((err) => {
  return { data: { message: 'Service temporarily unavailable', error: err.message } };
});

// Cấu hình Retry
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const retry = async (url, method, data) => {
  let attempt = 0;
  let lastError;

  while (attempt < retryOptions.retries) {
    console.log(`[RETRY] Attempt ${attempt + 1} - ${method.toUpperCase()} ${url}`);
    try {
      const response = await breaker.fire(url, method, data);

      if (response?.data?.message === 'Service temporarily unavailable') {
        throw new Error('Circuit breaker fallback triggered');
      }

      return response.data;
    } catch (err) {
      console.error(`Attempt ${attempt + 1} failed:`, err.message);
      lastError = err;
      attempt++;

      if (attempt < retryOptions.retries) {
        await delay(3000); // 🕐 Chờ 3 giây trước khi thử lại
      }
    }
  }

  throw lastError;
};



const proxyWithRetry = async (req, res, next, baseUrl) => {
  const fullUrl = `${baseUrl}${req.url}`;
  try {
    const result = await retry(fullUrl, req.method, req.body);
    if (result) {
      res.json(result);
    } else {
      res.status(500).send('Empty response from service');
    }
  } catch (err) {
    console.error('Final retry failed:', err.message);
    res.status(500).send('Service unavailable after retries');
  }
};


// Proxy tới Customer Service với Rate Limiter và Retry Logic
module.exports = (app) => {
  // Proxy tới Customer Service với Rate Limiter và Retry
  app.use('/customers', rateLimit, async (req, res, next) => {
    await proxyWithRetry(req, res, null, process.env.CUSTOMER_SERVICE_URL);
  });

  // Proxy tới Product Service với Rate Limiter và Retry Logic
  app.use('/products', rateLimit, async (req, res, next) => {
    await proxyWithRetry(req, res, null, process.env.PRODUCT_SERVICE_URL);
  });

  // Proxy tới Order Service với Rate Limiter và Retry Logic
  app.use('/orders', rateLimit, async (req, res, next) => {
    await proxyWithRetry(req, res, null, process.env.ORDER_SERVICE_URL);
  });
};
