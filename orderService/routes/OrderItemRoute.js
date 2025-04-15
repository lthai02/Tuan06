const express = require('express');
const router = express.Router();
const controller = require('../controllers/OrderItemController');

router.post('/', controller.createOrderItem);
router.get('/', controller.getAllOrderItems);
router.get('/order/:orderId', controller.getOrderItemsByOrderId);
router.get('/:id', controller.getOrderItemById);
router.put('/:id', controller.updateOrderItem);
router.delete('/:id', controller.deleteOrderItem);

module.exports = router;
