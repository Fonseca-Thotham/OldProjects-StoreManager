const productModel = require('../models/postmodel');

const insertProduct = async (name) => {
  const result = await productModel.insertProduct(name);
  return result;
};

module.exports = {
  insertProduct,
};