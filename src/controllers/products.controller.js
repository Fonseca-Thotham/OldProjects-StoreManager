const productsService = require('../services/products.service');

const getProducts = async (_req, res) => {
  const products = await productsService.getProducts();
  res.status(200).json(products);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductsById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

const createNewProduct = async (req, res) => {
  const { name } = req.body;

  const [product] = await productsService.createNewProduct(name);

  res.status(201).json({ name, id: product.insertId });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const product = await productsService.updateProduct(name, id);

  if (product[0].affectedRows === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json({ id, name });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deleted = await productsService.deleteProduct(id);

  if (deleted === 0) return res.status(404).json({ message: 'Product not found' });

  res.status(204).send();
};

const getProductsByName = async (req, res) => {
  const { q } = req.query;

  const products = await productsService.getProductsByName(q);

  if (!products) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(products);
};

module.exports = {
  getProducts,
  getProductsById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProductsByName,
};