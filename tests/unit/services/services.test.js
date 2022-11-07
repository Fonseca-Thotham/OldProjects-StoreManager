const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const mock = require('./services_mock');
const productModel = require('../../../src/models/getmodel');
const productService = require('../../../src/services/getservice');

describe('Product service', function () {
  describe('Get service', function () {
    it('Verifica o retorno da função quando o id não existe', async function () {
      sinon.stub(productModel, 'getById').resolves(undefined);

      const result = await productService.getById(111);
      expect(result.message).to.be.deep.equal('Product not found');
    });

    it('Verifica o retorno da função quando o id é inválido', async function () {
      sinon.stub(productModel, 'getById').resolves(undefined);

      const result = await productService.getById(0);
      expect(result.message).to.be.deep.equal('Product not found');
    });

    afterEach(sinon.restore);

  });
});