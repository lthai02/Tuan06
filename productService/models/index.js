const initSequelize = require('../configs/database');

const Products = require('./Products');


module.exports = {
    initSequelize,
    models: {
        Products
    }   
};