const { Cart, User } = require("../models");
const getProductsById = require("../utils/getProductsById");

class CartController {
  static async getCart(req, res) {
    try {
      const cart = await Cart.findOne({
        where: { userId: req.user.id, done: false },
      });

  
      

      const products = await getProductsById(cart.products);
      res.send(products);
    } catch {
      res.send(null);
    }
  }

  static async postProduct(req, res) {
    //id y precio del producto
    console.log(req.user);
    const { id, price } = req.body;

    let cart = await Cart.findOne({
      where: { userId: req.user.id, done: false },
    });

    const user = await User.findOne({ where: { id: req.user.id } });

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
  static async comprar(req, res) {
    const upCart = await Cart.update(
      {
        done: true,
      },
      { where: { userId: req.user.id, done: false }, returning: true }
    );
    res.send(upCart[1][0]);
  }

  static async deleteProduct(req, res) {
    const { idProduct, price } = req.body;

    let cart = await Cart.findOne({
      where: { userId: req.user.id, done: false },
    });

    const productsCopy = cart.products;
    const index = cart.products.indexOf(idProduct);

    productsCopy.splice(index, 1);

    const upCart = await Cart.update(
      { products: productsCopy, total: cart.total - price },
      {
        where: { userId: req.user.id, done: false },
        returning: true,
      }
    );

    res.send(upCart[1][0]);
  }
}

module.exports = CartController;
