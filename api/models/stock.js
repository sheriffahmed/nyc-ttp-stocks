const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../lib/db')

class Stock extends Model {}
Stock.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  }
}, { 
  sequelize,
  modelName: 'stock'
});


module.exports = Stock;