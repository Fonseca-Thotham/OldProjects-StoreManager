const connection = require('./database/connection');

const selectGetAll = async () => connection.execute(
  'SELECT * FROM StoreManager.products',
);

const selectGetById = async (productId) => connection.execute(
  'SELECT * FROM StoreManager.products WHERE id = ?', [productId],
);

const insertName = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products(name) VALUE (?)', [name],
  );
  return { id: insertId, name };
};

const updateName = async (name, id) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?`,
    [name, id],
  );
  return result;
};

const deleteNameId = async (id) => {
  const [result] = await connection.execute(
    `DELETE FROM StoreManager.products
      WHERE id = ?`, [id],
  );
  return result;
};

module.exports = {
  selectGetAll,
  selectGetById,
  insertName,
  updateName,
  deleteNameId,
};