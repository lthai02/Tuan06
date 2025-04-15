const orderItemService = require('../services/OrderItemService');

const createOrderItem = async (req, res) => {
  try {
    const item = await orderItemService.createOrderItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllOrderItems = async (req, res) => {
  const items = await orderItemService.getAllOrderItems();
  res.json(items);
};

const getOrderItemsByOrderId = async (req, res) => {
  const items = await orderItemService.getOrderItemsByOrderId(req.params.orderId);
  res.json(items);
};

const getOrderItemById = async (req, res) => {
  const item = await orderItemService.getOrderItemById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Không tìm thấy item' });
  res.json(item);
};

const updateOrderItem = async (req, res) => {
  const item = await orderItemService.updateOrderItem(req.params.id, req.body);
  if (!item) return res.status(404).json({ message: 'Không tìm thấy item' });
  res.json(item);
};

const deleteOrderItem = async (req, res) => {
  const deleted = await orderItemService.deleteOrderItem(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Không tìm thấy item' });
  res.json({ message: 'Xoá thành công' });
};

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItemsByOrderId,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem
};
