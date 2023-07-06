const express = require('express');
const productsController = require('../controllers/products.controller');
const { productValidation } = require('../middlewares/validations');

const route = express.Router();

route.get('/search', productsController.getProductsByName);

route.get('/', productsController.getProducts);

route.get('/:id', productsController.getProductsById);

route.post('/', productValidation, productsController.createNewProduct);

route.put('/:id', productValidation, productsController.updateProduct);

route.delete('/:id', productsController.deleteProduct);

module.exports = route;