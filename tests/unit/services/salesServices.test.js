const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../src/models/sales.models');
const salesServices = require('../../../src/services/sales.services');
const { sales, salesById, saleProduct, updatedResponse } = require('../models/mocks/sales.model.mock');

describe('Testes da camada salesService', function () {
  it('Cria uma nova venda na tabela sales e sales_products', async function () {
    sinon.stub(salesModel, 'findId').resolves([[{ id: 2 }]])
    sinon.stub(salesModel, 'insertSale').resolves([{ insertId: 3 }]);
    sinon.stub(salesModel, 'insertSaleProduct').resolves({ insertId: 3 });

    const result = await salesServices.createNewSale([{ productId: 1, quantity: 1 }]);
    expect(result).to.deep.equal([{ insertId: 3 }]);
  });

  it('Retorna uma mensagem de erro quando informado um produto com id inexistente', async function () {
    sinon.stub(salesModel, 'insertSale').resolves([]);
    sinon.stub(salesModel, 'insertSaleProduct').resolves({ message: 'Product not found' });

    const result = await salesServices.createNewSale([{ productId: 4, quantity: 1 }])
    expect(result).to.deep.equal({ message: 'Product not found' });
  });

  it('Retorna todas as sales', async function () {
    sinon.stub(salesModel, 'findAll').resolves([sales]);

    const result = await salesServices.getSales();
    expect(result).to.deep.equal(sales);
  });

  it('Retorna todas as sales de acordo com id informado', async function () {
    sinon.stub(salesModel, 'findSalesById').resolves([salesById]);

    const result = await salesServices.getSalesById(1);
    expect(result).to.deep.equal(salesById);
  });

  it('Deleta as vendas de sales e sales_products de acordo com o id informado', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves({ affectedRows: 2 });

    const result = await salesServices.deleteSale(1);
    expect(result).to.deep.equal({ affectedRows: 2 });
  });

  it('Atualiza a tabela sales_products com saleId, productId e quantidade informada', async function () {
    sinon.stub(salesModel, 'findSalesById').resolves([salesById]);
    sinon.stub(salesModel, 'findSalesProduct').resolves([saleProduct]);
    sinon.stub(salesModel, 'updateSale').resolves(updatedResponse);

    const result = await salesServices.updateSales(1, [{ "productId": 3, "quantity": 10 }]);
    expect(result).to.deep.equal([updatedResponse]);
  });

  it('Retorna uma mensagem de erro quando informado um product_id inválido', async function () {
    sinon.stub(salesModel, 'findSalesById').resolves([salesById]);
    sinon.stub(salesModel, 'findSalesProduct').resolves([]);

    const result = await salesServices.updateSales(1, [{ "productId": 10, "quantity": 10 }]);
    expect(result).to.deep.equal({ message: 'Product not found' });
  });

  afterEach(sinon.restore);
});