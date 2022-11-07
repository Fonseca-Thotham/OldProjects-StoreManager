const sales = [
  {
    "saleId": 1,
    "date": "2022-10-25T00:12:19.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-10-25T00:12:19.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-10-25T00:12:19.000Z",
    "productId": 3,
    "quantity": 15
  }
];

salesById = [
  [
    {
      "date": "2022-10-25T00:12:19.000Z",
      "productId": 1,
      "quantity": 5
    },
    {
      "date": "2022-10-25T00:12:19.000Z",
      "productId": 2,
      "quantity": 10
    }
  ]
];

const deletedResult = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const updatedResponse = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 0  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0
};

const saleProduct = { sale_id: 1, product_id: 1, quantity: 5 };

module.exports = {
  sales,
  salesById,
  deletedResult,
  updatedResponse,
  saleProduct,
}