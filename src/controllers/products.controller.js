const { productsService } = require('../services');

const getAllController = async (_request, response) => {
  const result = await productsService.getAllService();
  response.status(200).json(result);
};

const getByIdController = async (request, response) => {
  const { id } = request.params;
  const result = await productsService.getByIdService(id);

  if (result) {
    response.status(200).json(result);
  }
  response.status(404).json({ message: 'Product not found' });
};

module.exports = {
  getAllController,
  getByIdController,
};