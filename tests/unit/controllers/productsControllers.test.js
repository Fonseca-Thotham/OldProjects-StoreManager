const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');

const { products, productById, newProduct, updateResponse, productByName } = require('../models/mocks/products.model.mock');

describe('Testes da camada productsController', function () {
  afterEach(sinon.restore);

  it('A requisição /products retorna o status 200 e todos os produtos', async function () {
    const res = {}
    const req = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(products);

    sinon.stub(productsService, 'getProducts').resolves(products);

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('A requisição /products/1 retorna o status 200 e o produto com id informado', async function () {
    const res = {}
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(productById);

    sinon.stub(productsService, 'getProductsById').resolves(productById);
    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productById)
  });

  it('A requisição /products/4 retorna o status 200 e a mensagem de erro para o produto nao encontrado', async function () {
    const res = {}
    const req = { params: { id: 4 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getProductsById').resolves(false);
    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Realiza a criação de um novo produto e retorna o status 201', async function () {
    const res = {}
    const req = { body: { name: 'ProdutoX' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'createNewProduct').resolves([newProduct]);
    await productsController.createNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    // expect(res.json).to.have.been.calledWith(newProduct);
  });

  it('Atualiza o nome de um produto com o id informado e retorna o status 200', async function () {
    const res = {}
    const req = { body: { name: 'Martelo do batman' }, params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'updateProduct').resolves([updateResponse]);
    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Ao atualizar o nome de um produto com o id inexistente, retorna uma mensagem de erro', async function () {
    const res = {}
    const req = { body: { name: 'Martelo do batman' }, params: { id: 4 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'updateProduct').resolves([{ affectedRows: 0 }]);
    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });

  it('Deleta um produto informando id', async function () {
    const res = {}
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns();

    sinon.stub(productsService, 'deleteProduct').resolves([{ affectedRows: 1 }]);
    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Retorna uma mensagem de erro quando tenta deletar um id inexistente', async function () {
    const res = {}
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'deleteProduct').resolves(0);
    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });

  it('A requisição /products/search?q=Martelo retorna o status 200 e o produto com name informado', async function () {
    const res = {}
    const req = { query: { q: 'Martelo' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(productByName);

    sinon.stub(productsService, 'getProductsByName').resolves(productByName);
    await productsController.getProductsByName(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productByName)
  });

  it('A requisição /products/search?q=Mascara com name informado inexistente retorna o status 404', async function () {
    const res = {}
    const req = { query: { q: 'Mascara' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns({ message: 'Product not found' });

    sinon.stub(productsService, 'getProductsByName').resolves();
    await productsController.getProductsByName(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });
});