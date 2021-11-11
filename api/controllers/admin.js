const { Product, Category } = require("../models");

class AdminController {
  // '/admin'
  static async postProduct(req, res) {
    try {
      const newProduct = await Product.create(req.body);
      const categoria = await Category.findOne({
        where: { name: req.body.category },
      });
      await categoria.addCategory(newProduct);
      res.sendStatus(201);
    } catch (err) {
      res.send(err);
    }
  }
  static async putProduct(req, res) {
    try {
      if (!req.body.category) {
        const productUpd = await Product.update(req.body, {
          where: { id: req.params.id },
          returning: true,
        });
        res.send(productUpd);
      } else {
        const category = await Category.findOne({
          where: { name: req.body.category },
        });
        const product = await Product.findOne({ where: { id: req.params.id } });
        category.setCategory(product);

        res.send(await Product.findOne({ where: { id: req.params.id } }));
      }
    } catch {
      res.sendStatus(500);
    }
  }
  static async deleteProduct(req, res) {
    Product.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  }
  /*static async getAllUsers(req, res) {}
  static async getOnlyUser(req, res) {}
  static async putUser(req, res) {}
  static async deleteUser(req, res) {} */
}

module.exports = AdminController;
