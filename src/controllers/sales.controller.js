const salesService = require('../services/sales.service');

const createNewSale = async (req, res) => {
  const { body } = req;

  const sale = await salesService.createNewSale(body);

  if (sale.message) {
    return res.status(404).json({ message: sale.message });
  }

  res.status(201).json({
    id: sale,
    itemsSold: body,
  });
};

const getSales = async (_req, res) => {
  const sales = await salesService.getSales();
  res.status(200).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getSalesById(id);

  if (sales.length === 0) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sales);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getSalesById(id);

  if (sales.length === 0) return res.status(404).json({ message: 'Sale not found' });

  await salesService.deleteSale(id);

  res.status(204).send();
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const sales = await salesService.getSalesById(id);
  if (sales.length === 0) return res.status(404).json({ message: 'Sale not found' });

  const update = await salesService.updateSales(id, body);
  if (update.message) return res.status(404).json({ message: update.message });
  res.status(200).json({
    saleId: id,
    itemsUpdated: body,
  });
};

module.exports = {
  createNewSale,
  getSales,
  getSalesById,
  deleteSale,
  updateSales,
};