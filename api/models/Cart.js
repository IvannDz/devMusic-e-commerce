const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db')

class Cart extends Model {}
Cart.init({
    total: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    sequelize, 
    modelName: 'Cart' 
  })

module.exports = Cart