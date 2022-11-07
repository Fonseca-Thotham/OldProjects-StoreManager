const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const { mock, idResponse, serviceResponse } = require('./controller_mock')
const productService = require('../../../src/services/getservice');
const productController = require('../../../src/controllers/getcontroller');

describe('Product controller', function () {
  describe('Get controller', function () {

    it('Verifica se getAll retorna um array com todos elementos', async function () {
      sinon.stub(productService, 'getAll').resolves(serviceResponse);

      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      try {
        await productController.getAll(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(mock);
      } catch (error) {
        console.log(error)
      }

    });

    it('Verifica se getById retorna o elemento pelo id', async function () {
      sinon.stub(productService, 'getById').resolves(idResponse);

      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      try {
        await productController.getById(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(mock[0]);
      } catch (error) {
        console.log(error)
      }

    });

    afterEach(sinon.restore);

  });
});