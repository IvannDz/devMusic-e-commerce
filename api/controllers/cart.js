const { Cart, Product, User } = require("../models");
const { getProductsById } = require("../utils/getProductsById");

class CartController {
  static async getCart(req, res) {
    const cart = await Cart.findOne({
      where: { userId: req.user.id, done: false },
    });
    const products = await getProductsById(cart.products);

    res.send(products);
  }

  static async postProduct(req, res) {
    //id y precio del producto
    const { id, price } = req.body;

    //busco si ya existe un carrito activo
    let cart = await Cart.findOne({
      where: { userId: req.user.id, done: false },
    });

    const user = await User.findOne({ where: { id: req.body.id } });

    if (!cart) {
      cart = await Cart.create({ products: [id], total: price });
      user.addUsuario(cart);
      res.send(cart);
    } else {
      const upCart = await Cart.update(
        {
          total: cart.total + price,
          products: [...cart.products, id],
        },
        { where: { id: cart.id }, returning: true }
      );
      res.send(upCart[1][0]);
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
