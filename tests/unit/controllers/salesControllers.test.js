const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const { sales, salesById } = require('../models/mocks/sales.model.mock');

describe('Testes da camada salesController', function () {
  afterEach(sinon.restore);

  it('Teste de sucesso da requisição POST /sales', async function () {
    const res = {}
    const req = { body: [{ productId: 1, quantity: 1 }] };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'createNewSale').resolves({
      id: 3,
      itemsSold: [{ productId: 1, quantity: 1 }],
    });
    await salesController.createNewSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
  });

  it('Teste de falha da requisição POST /sales', async function () {
    const res = {}
    const req = { body: [{ productId: 1, quantity: 1 }] };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns({ message: 'Product not found' });

    sinon.stub(salesService, 'createNewSale').resolves({ message: 'Product not found' });
    await salesController.createNewSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
  });

  it('Teste da requisição GET /sales', async function () {
    const res = {}
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSales').resolves(sales);
    await salesController.getSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('Teste da requisição GET /sales/:id', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSalesById').resolves(salesById);
    await salesController.getSalesById(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('Teste de falha da requisição GET /sales/:id', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSalesById').resolves([]);
    await salesController.getSalesById(req, res);
    expect(res.status).to.have.been.calledWith(404);
  });

  it('Teste de sucesso de DELETE /sales/id', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns();

    sinon.stub(salesService, 'getSalesById').resolves([salesById])
    sinon.stub(salesService, 'deleteSale').resolves({ affectedRows: 2 });
    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });

  it('Teste de falha de DELETE /sales/id', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSalesById').resolves([])

    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
  });

  it('Teste de sucesso de PUT /sales/id', async function () {
    const res = {}
    const req = { body: [{ "productId": 1, "quantity": 10 }], params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSalesById').resolves([salesById])
    sinon.stub(salesService, 'updateSales').resolves({ affectedRows: 1 });
    await salesController.updateSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('Teste de falha por sale_id de PUT /sales/id', async function () {
    const res = {}
    const req = { body: [{ "productId": 1, "quantity": 10 }], params: { id: 10 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSalesById').resolves([])

    await salesController.updateSales(req, res);
    expect(res.status).to.have.been.calledWith(404);
  });

  it('Teste de falha por product_id de PUT /sales/id', async function () {
    const res = {}
    const req = { body: [{ "productId": 10, "quantity": 10 }], params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSalesById').resolves([salesById])
    sinon.stub(salesService, 'updateSales').resolves({ message: 'Product not found' });
    await salesController.updateSales(req, res);
    expect(res.status).to.have.been.calledWith(404);
  });
});