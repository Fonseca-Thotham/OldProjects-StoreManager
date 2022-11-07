const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/database/connection');
const { saleProduct, saleId, newProductName } = require('./mocks/sales.model.mock');

describe('Teste unitário "Sales" da camada Model', function () {
  afterEach(sinon.restore);

  it('Retorna todas as vendas do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([saleProduct])
    const result = await salesModel.selectGetAll();
    expect(result).to.deep.equal(saleProduct)
  });

  it('Retorna uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([saleId])
    const result = await salesModel.selectGetById(1);
    expect(result).to.deep.equal(saleId)
  });

  it('Deleta um item na tabela "sales_products" do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([1])
    const result = await salesModel.deleteSaleId(1);
    expect(result).to.deep.equal(1)
  });
});