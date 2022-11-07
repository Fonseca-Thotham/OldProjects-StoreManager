const connection = require('./connection');

const insertProduct = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)', [name],
  );

  const newProduct = {
    id: result.insertId,
    name,
  };

  return newProduct;
};

module.exports = {
  insertProduct,
};