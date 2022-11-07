const productsMock = [
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

const serviceResponse = {
  type: null,
  message: productsMock,
};

const idResponse = {
  type: null,
  message: productsMock[0],
};


module.exports = {
  productsMock,
  serviceResponse,
  idResponse,
}