const sinon = require('sinon');

const { products, productById, newProduct, updateResponse, productByName } = require('../models/mocks/products.model.mock');
const productsService = require('../../../src/services/products.service');
const productModel = require('../../../src/models/products.model');
const { expect } = require('chai');

describe('Testes da camada productService', function () {
  it('Retorna todos os produtos da tabela products', async function () {
    sinon.stub(productModel, 'findAll').resolves([products]);

    const result = await productsService.getProducts()
    expect(result).to.deep.equal(products);
  });

  it('Retorna um produto com o id existente', async function () {
    sinon.stub(productModel, 'findProductById').resolves([[productById]]);

    const result = await productsService.getProductsById(1);

    expect(result).to.deep.equal(productById);
  });

  it('Cria um novo produto na tabela', async function () {
    sinon.stub(productModel, 'insertProduct').resolves(newProduct);

    const result = await productsService.createNewProduct('ProdutoX');

    expect(result).to.deep.equal(newProduct);
  });

  it('Atualiza um produto na tabela', async function () {
    sinon.stub(productModel, 'updateProduct').resolves(updateResponse);

    const result = await productsService.updateProduct('Martelo do Batman', 1);

    expect(result).to.deep.equal(updateResponse);
  });

  it('Deleta um produto na tabela', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves({ "affectedRows": 1 });

    const result = await productsService.deleteProduct(1);

    expect(result).to.deep.equal(1);
  });

  it('Retorna os produtos com name informado existente', async function () {
    sinon.stub(productModel, 'findProductByName').resolves([productByName]);

    const result = await productsService.getProductsByName('Martelo');

    expect(result).to.deep.equal(productByName);
  });

  afterEach(sinon.restore);
});