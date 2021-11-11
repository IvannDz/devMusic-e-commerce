const { Cart, Product, User } = require("../models");

class CartController {
  static async getCart(req, res) {
    const cart = await Cart.findOne({
      where: { userId: req.user.id, done: false },
    });
    res.send(cart);
  }

  static async postProduct(req, res) {
    const { id, price } = req.body;
    let cart = await Cart.findOne({
      where: { userId: req.user.id, done: false },
    });
    const user = await User.findOne({ where: { id: req.body.id } });
    if (!cart) {
      cart = await Cart.create({ products: id, total: price });
      user.addUsuario(cart);
    res.send(cart) 
    } else {
      const newCart = await Cart.update(
        {
          products: [...cart.products, id],
        },
        { where: { id: cart.id }, returning: true }
      );
      res.send(newCart);
    }
  }
  static async putProduct(req, res) {
    res.sendStatus(200);
  }

  static async deleteProduct(req, res) {
    res.sendStatus(200);
  }
}

module.exports = CartController;
