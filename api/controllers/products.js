const { Product, Category, Comment } = require("../models");
const { Op } = require('sequelize');

class ProductsController {
  static async getAll(req, res) {
    const products = await Product.findAll();

    res.send(products);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    const comments = await Comment.findAll({
      where: {
        ProductId: req.params.id,
      },
    });

    const puntuation = [0];
    comments.forEach((com) => puntuation.push(com.dataValues.puntuacion));
    const valoration = (
      puntuation.reduce((a, b) => (b += a)) / puntuation.length
    ).toFixed(1);

    const category = await Category.findOne({where: {id:product.CategoryId}})

    res.send({ product: product , comments: comments, valoration: valoration, categoryName: category });
  }


  static async getByCategory(req, res) {
    const {page = 1} = req.query
    const { category } = req.params; 
    const categoria = await Category.findOne({
      where: { name: category },
    });
    const products = await Product.findAll({
      where: { CategoryId: categoria.id },
    });
    res.send(products.slice(9*(page-1), 9 * page));
  }

  static async getByName(req, res) {
    const { name } = req.params;
    const {page = 1} = req.query
    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`
        }
      }
    });

    res.send(products.slice(9*(page-1), 9 * page));
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
