const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db')

class Product extends Model {}

Product.init({

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
}, {
    sequelize, 
    modelName: 'Product' 
  })

  module.exports = Product