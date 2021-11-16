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

    const puntuation = [];
    comments.forEach((com) => puntuation.push(com.dataValues.puntuacion));
    const valoration = (
      puntuation.reduce((a, b) => (b += a)) / puntuation.length
    ).toFixed(1);

    res.send({ product: product , comments: comments, valoration: valoration });
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
