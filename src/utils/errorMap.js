const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  SALES_NOT_FOUND: 404,
  'any.required': 400,
  'number.min': 422,
  'string.min': 422,

};

const mapError = (type) => errorMap[type] || 500;

module.exports = { errorMap, mapError };