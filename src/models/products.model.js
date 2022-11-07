const connection = require('../db/connection');

const findAll = async () => {
  const products = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const findProductById = async (id) => {
  const product = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return product;
};

const insertProduct = async (name) => {
  const product = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );
  return product;
};

const updateProduct = async (name, id) => {
  const newProduct = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [name, id],
  );
  return newProduct;
};

const deleteProduct = async (id) => {
  const [product] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return product;
};

const findProductByName = async (name) => {
  const products = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?',
    [`%${name}%`],
  );

  return products;
};

module.exports = {
  findAll,
  findProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  findProductByName,
};