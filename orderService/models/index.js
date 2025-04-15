const initSequelize = require('../configs/database');

const Orders = require('./Orders');
const OrderItems = require('./OrderItems');

// Order có nhiều OrderItem (alias: 'items')
Orders.hasMany(OrderItems, {
  foreignKey: 'orderId',
  as: 'items',
  onDelete: 'CASCADE'
});

OrderItems.belongsTo(Orders, {
  foreignKey: 'orderId',
  as: 'order'
});

module.exports = {
    initSequelize,
    models: {
        Orders,
        OrderItems
    }   
};