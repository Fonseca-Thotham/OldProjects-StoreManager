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

const productId = {
  id: 2,
  name: 'Traje de encolhimento'
}

const newProductName = {
  id: 4,
  name: 'Armadura do Homem de Ferro'
}

const updateProductName = {
  code: 200,
  message: {
    id: 4,
    name: 'Joias do Infinito'
  }
}

const ERROR_PRODUCT = {
  code: 404,
  message: {
    message: 'Product not found'
  }
}

const DELETE_PRODUCT = {
  code: 204,
  message: {
    id: 3,
    name: 'Escudo do Capitão América'
  }
}



module.exports = {
  allProducts,
  productId,
  newProductName,
  updateProductName,
  ERROR_PRODUCT,
  DELETE_PRODUCT,
};