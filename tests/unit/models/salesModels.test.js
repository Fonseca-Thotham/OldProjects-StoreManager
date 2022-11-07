const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/db/connection');
const salesModel = require('../../../src/models/sales.model');
const { sales, salesById, deletedResult, updatedResponse, saleProduct } = require('./mocks/sales.model.mock');

describe('Testes da camada salesModel', function () {
  it('Realiza a operação SELECT de um Id existente', async function () {
    sinon.stub(connection, 'execute').resolves([{ id: 1 }]);

    const result = await salesModel.findId(1);
    expect(result).to.deep.equal({ id: 1 });
  });

  it('Realiza a operação INSERT de uma venda na tabela sales', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    const result = await salesModel.insertSale();
    expect(result).to.deep.equal(3);
  });

  it('Realiza a operação INSERT de venda na tabela sales_products', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    const result = await salesModel.insertSaleProduct(3, 1, 1);
    expect(result).to.deep.equal(3);
  });

  it('Realiza a operação SELECT de sales', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);

    const result = await salesModel.findAll();
    expect(result).to.deep.equal([sales]);
  });

  it('Realiza a operação SELECT de sales por Id', async function () {
    sinon.stub(connection, 'execute').resolves([salesById]);

    const result = await salesModel.findSalesById(1);
    expect(result).to.deep.equal([salesById]);
  });

  it('Realiza a operação DELETE de sales e sales_products por Id', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([deletedResult])
      .onSecondCall().resolves([deletedResult]);

    const result = await salesModel.deleteSale(1);
    expect(result).to.deep.equal({ affectedRows: 2 });
  });

  it('Realiza a operação SELECT na tabela de sales_products informando product_id e sale_id', async function () {
    sinon.stub(connection, 'execute').resolves([saleProduct]);

    const result = await salesModel.findSalesProduct(1, 1);
    expect(result).to.deep.equal(saleProduct);
  });

  it('Realiza a operação UPDATE na tabela de sales_products', async function () {
    sinon.stub(connection, 'execute').resolves([updatedResponse]);

    const result = await salesModel.updateSale(10, 1, 1);
    expect(result).to.deep.equal(updatedResponse);
  });

  afterEach(sinon.restore);
});