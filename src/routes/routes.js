const express = require('express');
const productController = require('../controllers/getcontroller');

const route = express.Router();

route.get('/products', productController.getAll);
route.get('/products/:id', productController.getById);

module.exports = route;