const connection = require('./database/connection');

const getAll = async () => connection.execute(
  'SELECT * FROM StoreManager.products',
);

const getById = async (productId) => connection.execute(
  'SELECT * FROM StoreManager.products WHERE id = ?', [productId],
);

module.exports = {
  getAll,
  getById,
};