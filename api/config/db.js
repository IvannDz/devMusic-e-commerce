require('dotenv').config();
const { Sequelize } = require('sequelize')
const {database, username, password, dialect, logging} = require('./configDB.json')
console.log("soy el process",process.env.DB_NAME)

const db = new Sequelize( database, username, password,{
    host: 'localhost',
    dialect,
    logging
})

module.exports = db