const CircuitBreaker = require('opossum');
const Bottleneck = require('bottleneck');
const pTimeout = require('p-timeout');
const retry = require('async-retry');

// Circuit breaker config
const createBreaker = (fn) => new CircuitBreaker(fn, {
  timeout: 5000,
  errorThresholdPercentage: 50,
  resetTimeout: 10000,
});

// Rate limiter
const limiter = new Bottleneck({
  minTime: 200
});

// Retry wrapper
const applyRetry = (fn, retries = 3, delay = 500) => async (...args) => {
  return await retry(async () => {
    return await fn(...args);
  }, {
    retries,
    minTimeout: delay
  });
};

// Timeout wrapper
const applyTimeout = (fn, timeout = 3000, fallback = null) =>
  () => pTimeout(fn(), {
    milliseconds: timeout,
    fallback: () => fallback
  });

module.exports = {
  createBreaker,
  limiter,
  applyTimeout,
  applyRetry
};
