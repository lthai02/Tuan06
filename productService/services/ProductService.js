const Product = require('../models/Products');
const {
  createBreaker,
  limiter,
  applyTimeout,
  applyRetry
} = require('../config/faultTolerance');

// Base functions
const getAllProductsRaw = async () => {
  return await Product.findAll();
};

const getProductByIdRaw = async (id) => {
  return await Product.findByPk(id);
};

// -- Apply retry + rate limit + timeout + circuit breaker --
const getAllProducts = async () => {
  const limited = limiter.wrap(getAllProductsRaw);
  const retried = applyRetry(limited, 3, 300); // retry 3 lần, mỗi 300ms
  const timeoutFn = () => applyTimeout(retried, 3000, []);
  const breaker = createBreaker(timeoutFn);
  breaker.fallback(() => []);
  return await breaker.fire();
};

const getProductById = async (id) => {
  const limited = limiter.wrap(() => getProductByIdRaw(id));
  const retried = applyRetry(limited, 3, 300);
  const timeoutFn = () => applyTimeout(retried, 3000, null);
  const breaker = createBreaker(timeoutFn);
  breaker.fallback(() => null);
  return await breaker.fire();
};

// CRUD khác không cần retry
const createProduct = async (data) => {
  return await Product.create(data);
};

const updateProduct = async (id, updateData) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.update(updateData);
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return true;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
