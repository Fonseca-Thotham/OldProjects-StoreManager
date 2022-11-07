const productModel = require('../models/getmodel');

const getAll = async () => {
  const result = await productModel.getAll();
  if (result) {
    return { value: 200, message: result };
  }
  return { error: 404, message: 'Product not found' };
};

const getById = async (id) => {
  const result = await productModel.getById(id);
  if (result) {
    return { value: 200, message: result };
  }

  return { error: 404, message: 'Product not found' };
};

module.exports = {
  getAll,
  getById,
};