const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../lib/db');
const User = require('./user');

class Transaction extends Model {}

Transaction.init({
  userId: DataTypes.INTEGER,
  symbol: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  cost: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
}, { 
  sequelize,
  modelName: 'transaction'
}); 

Transaction.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = Transaction;