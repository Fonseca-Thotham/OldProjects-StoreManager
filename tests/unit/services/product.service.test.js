const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/database/connection');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models')


const { allProducts, productId, newProductName, updateProductName, ERROR_PRODUCT, DELETE_PRODUCT } = require('./mock/products.service.mock');

describe('Teste unitário da camada Service', function () {
  afterEach(sinon.restore);

  it('Retorna todos os produtos do banco de dados', async function () {
    sinon.stub(productsModel, "selectGetAll").resolves([allProducts]);
    const result = await productsService.getAll();
    expect(result).to.deep.equal(allProducts)
  });

  it('Retorna um produto pelo Id', async function () {
    sinon.stub(productsModel, "selectGetById").resolves([[productId]]);
    const result = await productsService.getById(1);
    expect(result).to.deep.equal(productId);
  });

  it('Retorna "false" quando um produto não é encontrado', async function () {
    sinon.stub(productsModel, 'selectGetById').resolves([[]])
    const result = await productsService.getById(1);
    expect(result).to.deep.equal(false);
  });

  it('Retorna um produto cadastrado', async function () {
    sinon.stub(productsModel, 'insertName').resolves([[newProductName]])
    const result = await productsService.createProduct('Armadura do Homem de Ferro');
    expect(result).to.deep.equal([[newProductName]]);
  });

  it('Retorna um produto atualizado', async function () {
    sinon.stub(productsModel, 'selectGetById').resolves([[newProductName]])
    sinon.stub(productsModel, 'updateName').resolves(1)
    const result = await productsService.updateProductName('Joias do Infinito', 4);
    expect(result).to.deep.equal(updateProductName);
  });

  it('Retorna um erro caso o produto atualizado não exista', async function () {
    sinon.stub(productsModel, 'selectGetById').resolves([[allProducts[7]]])
    sinon.stub(productsModel, 'updateName').resolves(1)
    const result = await productsService.updateProductName('Escudo do Capitão America', 7);
    expect(result).to.deep.equal(ERROR_PRODUCT);
  });

  it('Deleta um produto do banco de dados', async function () {
    sinon.stub(productsModel, 'selectGetById').resolves([[allProducts[2]]])
    sinon.stub(productsModel, 'deleteNameId').resolves(DELETE_PRODUCT)
    const result = await productsService.deleteProductId(2);
    expect(result.code).to.deep.equal(204);
  });

  it('Retorna um erro ao tentar deletar um produto inexistente do banco de dados', async function () {
    sinon.stub(productsModel, 'selectGetById').resolves([[allProducts[7]]])
    sinon.stub(productsModel, 'deleteNameId').resolves(DELETE_PRODUCT)
    const result = await productsService.deleteProductId(6);
    expect(result).to.deep.equal(ERROR_PRODUCT);
  });

});