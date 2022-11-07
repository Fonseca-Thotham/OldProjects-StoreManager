const { productsModel } = require('../models');

const getAllService = async () => {
  const [result] = await productsModel.getAll();
  return result;
};

const getByIdService = async (productId) => {
  const [[result]] = await productsModel.getById(productId);
    return result || false;
};

module.exports = {
  getAllService,
  getByIdService,
};