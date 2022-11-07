const app = require('../../../src/app')
const sinon = require('sinon');
const chai = require('chai')
const chaiHttp = require('chai-http');

const connection = require('../../../src/models/database/connection');
const { STATUS_NOT_FOUND, STATUS_OK, allProducts } = require('./mock/products.controller.mock')

chai.use(chaiHttp)

describe('Teste unitário da camada Controller', function () {
  afterEach(sinon.restore);

  it('GET /products, retorna todos os produtos do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const response = await chai.request(app).get('/products');
    chai.expect(response.status).to.be.equal(STATUS_OK);
  });

  it('GET /products/:id, retorna um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const response = await chai.request(app).get('/products/3');
    chai.expect(response.status).to.be.equal(STATUS_OK);
  });

  it('GET /products, retorna todos os produtos, mesmo sem um id definido', async function () {
    sinon.stub(connection, 'execute').resolves([]);
    const response = await chai.request(app).get('/products/');
    chai.expect(response.status).to.be.equal(STATUS_OK);
  });

  it('GET /products/:id, retorna um erro ao passar um id inválido', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const response = await chai.request(app).get('/products/4');
    chai.expect(response.status).to.be.equal(STATUS_NOT_FOUND);
  });

});