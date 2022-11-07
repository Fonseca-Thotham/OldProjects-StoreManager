const STATUS_NOT_FOUND = 404
const STATUS_OK = 200

const allProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento'
  },
  {
    id: 3,
    name: 'Escudo do Capitão América'
  },
];

const newProductName = {
  name: 'Armadura do Homem de Ferro'
}

const updateProduct = {
  message: {
    name: 'Capa do Batman'
  }
}

module.exports = {
  STATUS_NOT_FOUND,
  STATUS_OK,
  allProducts,
  newProductName,
  updateProduct,
};