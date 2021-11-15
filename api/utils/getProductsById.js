const { Product } = require("../models");

async function getProductsById(ids) {
  let products = [];
  for (let i = 0; i < ids.length; i++) {
    products.push(await Product.findOne({ where: { id: ids[i] } }));
  }

  return products;
}

module.exports = getProductsById;
