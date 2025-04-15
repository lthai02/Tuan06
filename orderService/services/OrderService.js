const Order = require('../models/Orders');

const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

const getAllOrders = async () => {
  return await Order.findAll();
};

const getOrderById = async (id) => {
  return await Order.findByPk(id);
};

const updateOrderStatus = async (id, status) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  order.status = status;
  await order.save();
  return order;
};

const deleteOrder = async (id) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  await order.destroy();
  return true;
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};
