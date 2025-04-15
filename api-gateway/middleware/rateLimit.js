const rateLimits = require('express-rate-limit');

const rateLimit = rateLimits({
  windowMs: 1 * 60 * 1000, // 1 phút (60 giây * 1000 mili giây)
  max: 5,                   // Tối đa 5 request mỗi IP trong 1 phút
  message: '🚫 Quá nhiều yêu cầu từ IP này, hãy thử lại sau 1 phút.',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimit;
