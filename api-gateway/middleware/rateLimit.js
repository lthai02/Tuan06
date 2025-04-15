const rateLimits = require('express-rate-limit');

const rateLimit = rateLimits({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Tối đa 100 request mỗi IP
  message: '🚫 Quá nhiều yêu cầu từ IP này, hãy thử lại sau 15 phút.',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimit;
