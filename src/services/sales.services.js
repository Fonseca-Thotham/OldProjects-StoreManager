const { salesModel } = require('../models');

const getAll = async () => {
  const result = await salesModel.selectGetAll();
  return { code: 200, message: result };
};

const getById = async (id) => {
  const result = await salesModel.selectGetById(id);

  if (result.length !== 0) {
    return { code: 200, message: result };
  }

  return {
    code: 404, message: { message: 'Sale not found' },
  };
};

const deleteSaleId = async (id) => {
  const [getSalesId] = await salesModel.selectGetById(id);
  await salesModel.deleteSaleId(id);

  if (!getSalesId) {
    return {
      code: 404, message: { message: 'Sale not found' },
    };
  }
  return { code: 204 };
};

module.exports = {
  getAll,
  getById,
  deleteSaleId,
};