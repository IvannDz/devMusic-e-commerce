const { Product, Category } = require("../models");
const { Op } = require('sequelize');

class ProductsController {
  static async getAll(req, res) {
    const products = await Product.findAll();

    res.send(products);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.send(product);
  }

  //a testear
  static async getByCategory(req, res) {
    const { category } = req.params; //nombre de la categoria
    const categoria = await Category.findOne({
      where: { name: category },
    });
    const products = await Product.findAll({
      where: { CategoryId: categoria.id },
    });
    res.send(products);
  }

  static async getByName(req, res) {
    const { name } = req.params;
    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`
        }
      }
    });



    res.send(products);
  }

  static async getAllCategory(req, res) {
    try {
      const category = await Category.findAll()
      res.send(category);
    }
    catch {
      res.sendStatus(500);
    }
  }

}

module.exports = ProductsController;
