const { expect } = require('chai');
const sinon = require('sinon');
const mock = require('./models_mock');

const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/getmodel');

describe('Product model', function () {
  describe('Get model', function () {

    it('Verifica se getAll retorna um array com todos elementos', async function () {
      sinon.stub(connection, 'execute').resolves([mock]);

      const result = await productModel.getAll();
      expect(result).to.be.deep.equal(mock);
    });

    it('Verifica se getById retorna o elemento pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([[mock[0]]]);

      const result = await productModel.getById(1);
      expect(result).to.be.deep.equal(mock[0]);
    })

    afterEach(sinon.restore);
  });
});