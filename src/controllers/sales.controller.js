const { salesService } = require('../services');

const getAllSeles = async (_request, response) => {
  const { code, message } = await salesService.getAll();

  return response.status(code).json(message);
};

const getByIdSales = async (request, response) => {
  const { id } = request.params;
  const { code, message } = await salesService.getById(id);

  return response.status(code).json(message);
};

const deleteSale = async (request, response) => {
  const { id } = request.params;
  const { code, message } = await salesService.deleteSaleId(id);

  return response.status(code).json(message);
};

module.exports = {
  getAllSeles,
  getByIdSales,
  deleteSale,
};