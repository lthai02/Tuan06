// middleware/config.js
const CircuitBreaker = require('opossum');

// Cấu hình Circuit Breaker và Retry
const breakerOptions = {
    timeout: 2000, // request timeout in ms
    errorThresholdPercentage: 50, // % thất bại để mở circuit
    resetTimeout: 5000, // thời gian chờ để thử lại sau khi mở (ms)
    rollingCountTimeout: 10000, // cửa sổ thời gian thống kê
    rollingCountBuckets: 10, // 10 buckets cho rolling count
    volumeThreshold: 2, // Cần ít nhất 2 yêu cầu để đánh giá lỗi
};

// Cấu hình Retry
const retryOptions = {
  retries: 3, // Số lần thử lại tối đa
  minTimeout: 1000, // Thử lại sau 1s
  maxTimeout: 3000, // Thử lại tối đa sau 3s
};

// Cấu hình Timeout (cho tất cả các request HTTP)
const timeout = 3000; // 3s timeout cho tất cả các request

module.exports = {
  breakerOptions,
  retryOptions,
  timeout,
};
