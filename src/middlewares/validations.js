const productValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const saleValidation = (req, res, next) => {
  const productsSale = req.body;

  if (productsSale.some(({ quantity }) => quantity < 1)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (productsSale.some(({ productId }) => !productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (productsSale.some(({ quantity }) => !quantity)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

module.exports = {
  productValidation,
  saleValidation,
};