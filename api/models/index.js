const User = require('./User')
const Product = require('./Product')
const Category = require('./Category')
const Cart = require('./Cart')
const Comment = require('./Comment')




Category.hasMany(Product, {as: "category"})


module.exports = { User, Product, Category, Cart, Comment }