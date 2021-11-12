const { Sequelize } = require('sequelize')
const {database, username, password, dialect, logging} = require('./configDB.json')

const db = new Sequelize( database, username, password,{
    host: 'localhost',
    dialect,
    logging
})

module.exports = db