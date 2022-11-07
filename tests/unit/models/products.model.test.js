const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/database/connection');
const { products, productId, newProductName } = require('./mocks/products.model.mock');

describe('Teste unitário "Products" da camada Model', function () {
  afterEach(sinon.restore);

  it('Retorna todos os produtos do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([products])
    const result = await productsModel.selectGetAll();
    expect(result).to.deep.equal([products])
  });

  it('Retorna um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([productId])
    const result = await productsModel.selectGetById();
    expect(result).to.deep.equal([productId])
  });

  it('Adiciona um item na tabela "products" do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }])
    const result = await productsModel.insertName('Armadura do Homem de Ferro');
    expect(result).to.deep.equal(newProductName)
  });

  it('Atualiza um item na tabela "products" do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([productId])
    const result = await productsModel.updateName('Capa do Thor');
    expect(result).to.deep.equal(productId)
  });

  it('Deleta um item na tabela "products" por id', async function () {
    sinon.stub(connection, 'execute').resolves([productId])
    const result = await productsModel.deleteNameId('Capa do Thor');
    expect(result).to.deep.equal(productId)
  });
});