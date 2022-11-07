const { productsService } = require('../services');

const getAllProducts = async (_request, response) => {
  const result = await productsService.getAll();
  return response.status(200).json(result);
};

const getByIdProducts = async (request, response) => {
  const { id } = request.params;
  const result = await productsService.getById(id);

  if (result) {
    return response.status(200).json(result);
  }
  return response.status(404).json({ message: 'Product not found' });
};

const createNewProduct = async (request, response) => {
  const productName = request.body;
  const result = await productsService.createProduct(productName);

  response.status(201).json(result);
};

const updateProduct = async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  const { code, message } = await productsService.updateProductName(name, id);

  response.status(code).json(message);
};

const deleteProduct = async (request, response) => {
  const { id } = request.params;
  const { code, message } = await productsService.deleteProductId(id);

  response.status(code).json(message);
};

module.exports = {
  getAllProducts,
  getByIdProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
};