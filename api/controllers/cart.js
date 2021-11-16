const { Cart, User } = require("../models");
const getProductsById = require("../utils/getProductsById");
const nodemailer = require("nodemailer");

class CartController {
  static async getCart(req, res) {
    try {
      const cart = await Cart.findOne({
        where: { userId: req.user.id, done: false },
      });
      let count = {};
      await cart.products.forEach(
        (prod) => (count[prod] = (count[prod] || 0) + 1)
      ); //{1: 2, 3: 5}

      const products = await getProductsById(count);
      const resp = { products: products, total: cart.total };
      res.send(resp);
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

    //creo nuevo carrito
    const user = await User.findOne({ where: { id: req.user.id } });
    const newCart = await Cart.create();
    user.addUsuario(newCart);

    //envio confirmacion
    console.log("gmail", process.env.SUPER_ADMIN_GMAIL);
    const transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SUPER_ADMIN_GMAIL, // generated ethereal user
        pass: process.env.SUPER_ADMIN_APP_KEY, // generated ethereal password
      },
    });

    const message = {
      from: "DevMusic.com",
      to: user.email,
      subject: "FELICIDADES POR ALTA COMPRA",
      text: "Terrible compra lagarto que te mandaste",
      html: "<p>Bien ahi vieja, gracias muñeco</p>",
    };

    const confirm = await transporter.sendMail(message);

    res.send(confirm);
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
