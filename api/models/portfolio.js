const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../lib/db');
const User = require('./user');

class Portfolio extends Model {}

Portfolio.init({
  userId: DataTypes.INTEGER,
  symbol: DataTypes.STRING,
  quantity: DataTypes.INTEGER
}, { 
  indexes: [
    {
      unique: true,
      fields: ['userId', 'symbol']
    }
  ],
  sequelize,
  modelName: 'portfolio'
});

Portfolio.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = Portfolio;