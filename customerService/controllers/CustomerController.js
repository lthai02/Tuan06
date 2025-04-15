const customerService = require('../services/CustomerService');

const createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  const customers = await customerService.getAllCustomers();
  res.json(customers);
};

const getCustomerById = async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.id);
  if (!customer) return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
  res.json(customer);
};

const updateCustomer = async (req, res) => {
  const updatedCustomer = await customerService.updateCustomer(req.params.id, req.body);
  if (!updatedCustomer) return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
  res.json(updatedCustomer);
};

const deleteCustomer = async (req, res) => {
  const result = await customerService.deleteCustomer(req.params.id);
  if (!result) return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
  res.json({ message: 'Đã xoá khách hàng' });
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
};
