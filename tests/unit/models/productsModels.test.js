const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/db/connection');
const productModel = require('../../../src/models/products.model');

const { products, productById, newProduct, updateResponse, productByName } = require('./mocks/products.model.mock');

describe('Testes da camada productModel', function () {
  it('Realiza a operação SELECT de todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves(products);

    const result = await productModel.findAll();
    expect(result).to.deep.equal(products);

  });

  it('Realiza a operação SELECT de um produto por ID', async function () {
    sinon.stub(connection, 'execute').resolves(productById);

    const result = await productModel.findProductById(1);
    expect(result).to.equal(productById);
  });

  it('Realiza a operação INSERT de um produto informando "name"', async function () {
    sinon.stub(connection, 'execute').resolves(newProduct);

    const result = await productModel.insertProduct('ProdutoX');
    expect(result).to.deep.equal(newProduct);
  });

  it('Realiza a operação UPDATE de um produto informando "name" e id', async function () {
    sinon.stub(connection, 'execute').resolves(updateResponse);

    const result = await productModel.updateProduct('Martelo do Batman', 1);
    expect(result).to.deep.equal(updateResponse);
  });

  it('Realiza a operação DELETE de um produto informando id', async function () {
    sinon.stub(connection, 'execute').resolves(updateResponse);

    const result = await productModel.deleteProduct(1);
    expect(result).to.deep.equal(updateResponse[0]);
  });

  it('Realiza a operação SELECT de um produto por name', async function () {
    sinon.stub(connection, 'execute').resolves(productByName);

    const result = await productModel.findProductByName('Martelo');
    expect(result).to.equal(productByName);
  });

  afterEach(sinon.restore);
});