const productService = require('../services/getservices');

const getAll = async (_req, res) => {
  const products = await productService.getAll();

  if (products.error) {
    return res.status(products.error).json({ message: products.message });
  }
  return res.status(products.value).json(products.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const productId = await productService.getById(id);
  if (productId.error) {
    return res.status(productId.error).json({ message: productId.message });
  }
  return res.status(productId.value).json(productId.message);
};

module.exports = {
  getAll,
  getById,
};