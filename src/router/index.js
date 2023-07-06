const express = require('express');
const products = require('./products.router');
const sales = require('./sales.router');

const router = express.Router();
router.use('/products', products);
router.use('/sales', sales);

module.exports = router;