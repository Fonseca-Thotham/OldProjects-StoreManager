const salesModel = require('../models/sales.models');

const createNewSale = async (sales) => {
  const products = await Promise.all(sales.map(({ productId }) => salesModel
    .findId(productId)));

  if (products.some((product) => product.length === 0)) {
    return { message: 'Product not found' };
  }

  const saleId = await salesModel.insertSale();
  await Promise.all(sales.map((sale) => (
    salesModel.insertSaleProduct(saleId, sale.productId, sale.quantity)
  )));

  return saleId;
};

const getSales = async () => {
  const [result] = await salesModel.findAll();
  return result;
};

const getSalesById = async (id) => {
  const [result] = await salesModel.findSalesById(id);
  return result;
};

const deleteSale = async (id) => {
  const result = await salesModel.deleteSale(id);
  return result;
};

const updateSales = async (saleId, sales) => {
  const products = await Promise.all(sales.map(({ productId }) => salesModel
    .findSalesProduct(productId, saleId)));

  if (products.some((product) => product.length === 0)) {
    return { message: 'Product not found' };
  }

  const result = await Promise.all(sales.map(({ quantity, productId }) => (
    salesModel.updateSale(quantity, saleId, productId)
  )));

  return result;
};

module.exports = {
  createNewSale,
  getSales,
  getSalesById,
  deleteSale,
  updateSales,
};