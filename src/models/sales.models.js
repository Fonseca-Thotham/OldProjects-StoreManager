const camelize = require('camelize');
const connection = require('./database/connection');

const selectGetAll = async () => {
  const [result] = await connection.execute(
    `SELECT
      sale_id AS sale_id, date, product_id, quantity
      FROM StoreManager.sales_products
      INNER JOIN StoreManager.sales
      ON sale_id = id
      ORDER BY sale_id, product_id`,
  );
  return camelize(result);
};

const selectGetById = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity
      FROM StoreManager.sales_products
      INNER JOIN StoreManager.sales
      ON sale_id = id
      WHERE sale_id = ?
      ORDER BY sale_id, product_id;`, [id],
  );
  return camelize(result);
};

const deleteSaleId = async (id) => {
  const [result] = await connection.execute(
    `DELETE FROM StoreManager.sales_products
      WHERE sale_id = ?`, [id],
  );
  return result;
};

module.exports = {
  selectGetAll,
  selectGetById,
  deleteSaleId,
};