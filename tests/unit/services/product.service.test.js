const { expect } = require('chai');
const sinon = require('sinon');


const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models')


const { allProducts, productId } = require('./mock/products.service.mock');

describe('Teste unitário da camada Service', function () {
  afterEach(sinon.restore);

  it('Retorna todos os produtos do banco de dados', async function () {
    sinon.stub(productsModel, 'getAll').resolves([allProducts])
    const result = await productsService.getAllService();
    expect(result).to.deep.equal(allProducts)
  });

  it('Retorna um produto pelo Id', async function () {
    sinon.stub(productsModel, 'getById').resolves([[productId]])
    const result = await productsService.getByIdService(1);
    expect(result).to.deep.equal(productId);
  });

  it('Retorna "false" quando um produto não é encontrado', async function () {
    sinon.stub(productsModel, 'getById').resolves([[]])
    const result = await productsService.getByIdService(1);
    expect(result).to.deep.equal(false);
  });
});