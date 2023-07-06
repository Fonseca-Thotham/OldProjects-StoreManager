const express = require('express');
const salesController = require('../controllers/sales.controller');
const { saleValidation } = require('../middlewares/validations');

const route = express.Router();

route.post('/', saleValidation, salesController.createNewSale);

route.get('/', salesController.getSales);

route.get('/:id', salesController.getSalesById);

route.delete('/:id', salesController.deleteSale);

route.put('/:id', saleValidation, salesController.updateSales);

module.exports = route;