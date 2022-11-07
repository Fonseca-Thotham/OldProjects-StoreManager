const productsModel = require('../models/products.model');

const getProducts = async () => {
  const [result] = await productsModel.findAll();
  return result;
};

const getProductsById = async (id) => {
  const [[result]] = await productsModel.findProductById(id);
  return result;
};

const createNewProduct = async (name) => {
  const result = await productsModel.insertProduct(name);
  return result;
};

const updateProduct = async (name, id) => {
  const result = await productsModel.updateProduct(name, id);
  return result;
};

const deleteProduct = async (id) => {
  const { affectedRows } = await productsModel.deleteProduct(id);
  return affectedRows;
};

const getProductsByName = async (name) => {
  const [result] = await productsModel.findProductByName(name);
  return result;
};

module.exports = {
  getProducts,
  getProductsById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProductsByName,
};