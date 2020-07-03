const Sequelize = require('sequelize')

const DB_NAME = 'node_rest'
const USER_NAME = 'root'
const PASSWORD = 'root'

const sequelize = new Sequelize(DB_NAME,USER_NAME,PASSWORD,{
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
})

module.exports = sequelize