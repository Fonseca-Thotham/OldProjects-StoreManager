const express = require('express');
const getController = require('../controllers/getcontroller');
const postController = require('../controllers/postcontroller');

const route = express.Router();

route.get('/products', getController.getAll);
route.get('/products/:id', getController.getById);

route.post('/products', postController.insertProduct);

module.exports = route;