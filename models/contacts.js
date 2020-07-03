const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const contacts = sequelize.define('Contacts',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        type:Sequelize.INTEGER
    },
    name:{
        allowNull:false,
        type:Sequelize.STRING
    },
    value:{
        allowNull:false,
        type:Sequelize.STRING
    },
    marked:{
        allowNull:false,
        type:Sequelize.BOOLEAN
    },
},
{
    timestamps: false
  })


module.exports = contacts