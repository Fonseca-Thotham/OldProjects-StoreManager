const connection = require('../db/connection');

const findId = async (id) => {
  const [productsId] = await connection.execute(
    'SELECT id FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return productsId;
};

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  return insertId;
};

const insertSaleProduct = async (saleId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [
      saleId,
      productId,
      quantity,
    ],
  );
  return insertId;
};

const findAll = async () => {
  const sales = await connection.execute(
    `SELECT sale_id as saleId, date, product_id as productId, quantity
      FROM StoreManager.sales_products as sp
      INNER JOIN StoreManager.sales as s
      ON sp.sale_id = s.id;`,
  );
  return sales;
};

const findSalesById = async (id) => {
  const sale = await connection.execute(
    `SELECT date, product_id as productId, quantity
      FROM StoreManager.sales_products as sp
      INNER JOIN StoreManager.sales as s
      ON sp.sale_id = s.id
      WHERE sp.sale_id = ?`,
    [id],
  );
  return sale;
};

const deleteSale = async (id) => {
  const [products] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  const [sale] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return { affectedRows: sale.affectedRows + products.affectedRows };
};

const findSalesProduct = async (productId, saleId) => {
  const [productsById] = await connection.execute(
    `SELECT * FROM StoreManager.sales_products 
      WHERE product_id = ? AND sale_id = ?`,
    [productId, saleId],
  );

  return productsById;
};

const updateSale = async (quantity, saleId, productId) => {
  const [updatedSale] = await connection.execute(
    `UPDATE StoreManager.sales_products SET quantity = ?
      WHERE sale_id = ? AND product_id = ?;`,
    [quantity, saleId, productId],
  );

  return updatedSale;
};

module.exports = {
  findId,
  insertSale,
  insertSaleProduct,
  findAll,
  findSalesById,
  deleteSale,
  updateSale,
  findSalesProduct,
};