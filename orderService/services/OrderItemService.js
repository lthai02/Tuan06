const OrderItem = require('../models/OrderItems');

const createOrderItem = async (data) => {
  return await OrderItem.create(data);
};

const createManyOrderItems = async (items) => {
  return await OrderItem.bulkCreate(items);
};

const getAllOrderItems = async () => {
  return await OrderItem.findAll();
};

const getOrderItemsByOrderId = async (orderId) => {
  return await OrderItem.findAll({ where: { orderId } });
};

const getOrderItemById = async (id) => {
  return await OrderItem.findByPk(id);
};

const updateOrderItem = async (id, updateData) => {
  const item = await OrderItem.findByPk(id);
  if (!item) return null;
  await item.update(updateData);
  return item;
};

const deleteOrderItem = async (id) => {
  const item = await OrderItem.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};

module.exports = {
  createOrderItem,
  createManyOrderItems,
  getAllOrderItems,
  getOrderItemsByOrderId,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem
};
