// middleware/proxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  // Proxy tới Customer Service
  app.use('/customers', createProxyMiddleware({
    target: process.env.CUSTOMER_SERVICE_URL,
    changeOrigin: true,
    // pathRewrite: {
    //   '^/customers': '',
    // },
  }));

  // Proxy tới Product Service
  app.use('/products', createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
    // pathRewrite: {
    //   '^/products': '',
    // },
  }));

  // Proxy tới Order Service
  app.use('/orders', createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL,
    changeOrigin: true,
    // pathRewrite: {
    //   '^/orders': '',
    // },
  }));
};
