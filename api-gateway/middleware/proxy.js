const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('./rateLimit.js');

const app = express();


// Gateway middlewares
app.use(rateLimit);
app.use(express.json());

// Route tới Customer Service
app.use('/customers', createProxyMiddleware({
  target: process.env.CUSTOMER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/customers': '' }
}));

// Route tới Product Service
app.use('/products', createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/products': '' }
}));

// Route tới Order Service
app.use('/orders', createProxyMiddleware({
  target: process.env.ORDER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/orders': '' }
}));

// Root check
app.get('/', (req, res) => {
  res.send('🌀 API Gateway đang hoạt động!');
});

// Start gateway server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`🚪 API Gateway đang chạy tại http://localhost:${PORT}`);
});
