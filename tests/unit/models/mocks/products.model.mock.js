const products = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const productById = { "id": 1, "name": "Martelo de Thor" }

const newProduct = { "name": "ProdutoX", "id": 4 }

const updateResponse = [
  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "Rows matched: 1  Changed: 1  Warnings: 0",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 1
  },
  null
]

const productByName = { "id": 1, "name": "Martelo de Thor" }

module.exports = {
  products,
  productById,
  newProduct,
  updateResponse,
  productByName,
};