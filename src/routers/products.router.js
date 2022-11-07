const express = require('express');
const { productsController } = require('../controllers');
const { validateProductName } = require('../middlewares');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllProducts);

productsRouter.get('/:id', productsController.getByIdProducts);

productsRouter.post('/', validateProductName, productsController.createNewProduct);

productsRouter.put('/:id', validateProductName, productsController.updateProduct);

productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;