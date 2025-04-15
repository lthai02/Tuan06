const initSequelize = require('../configs/database');

const Customers = require('./Customers');

module.exports = {
    initSequelize,
    models: {
        Customers
    }
};