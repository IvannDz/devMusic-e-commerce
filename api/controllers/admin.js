const { Product, Category, User } = require("../models");
const sequelize = require("sequelize");

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
      res.sendStatus(500);
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

  static async getAllUsers(req, res) {
    const users = await User.findAll({
      where: {
        isSuperAdmin: {
          [sequelize.Op.ne]: true
        }
      }
    })
    res.send(users)
  }
  static async getOnlyUser(req, res) {
    const user = await User.findOne({
      where: {
        id: req.params.id,
        isSuperAdmin: {
          [sequelize.Op.ne]: true
        }
      }
    })
    res.send(user);
  }
  static async putUser(req, res) {
    if (req.user.isSuperAdmin) {
      const user = await User.update(
        { isAdmin: true }
        ,
        {
          where: {
            id: req.params.id
          },
          returning: true,
        })
      res.send(user)
    }
    else {
      res.sendStatus(500)
    }
  }

  static async deleteUser(req, res) {
    if (req.user.isAdmin) {
      await User.destroy({
        where: {
          id: req.params.id
        }
      })
      res.send("DELETER")
    }
    else {
      res.sendStatus(500)
    }
  }
}

module.exports = AdminController;
