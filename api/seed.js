const { User, Product, Category } = require("./models");
const db = require("./config/db");
const { arrayProducts, arrayCategory } = require("./utils/fakedata");


db.sync()
  .then(() => {
    return User.create({
      userName: "SuperAdmin",
      email: process.env.SUPER_ADMIN_GMAIL,
      tel: 1154656108,
      password: "password",
      isAdmin: true,
      isSuperAdmin: true,
    })
      .then((user) => {
        console.log("SuperAdmin:", user);
        return Product.bulkCreate(arrayProducts);
      })
      .then(() => {
        return Category.bulkCreate(arrayCategory);
      });
  })
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log("Somethin went wrong on the seed process", err.message);
    process.exit(1);
  });
