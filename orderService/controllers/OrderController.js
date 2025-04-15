const orderService = require('../services/OrderService');

const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.json(orders);
};

const getOrderById = async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
  res.json(order);
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const updated = await orderService.updateOrderStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
  res.json(updated);
};

const deleteOrder = async (req, res) => {
  const deleted = await orderService.deleteOrder(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
  res.json({ message: 'Đã huỷ đơn hàng' });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};
