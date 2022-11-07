const productService = require('../services/postservice');

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const result = await productService.insertProduct(name);
  res.status(201).json(result);
};

module.exports = {
  insertProduct,
};