const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../lib/db');
const User = require('./user');

class Cash extends Model {}

Cash.init({
  userId: DataTypes.INTEGER,
  balance: DataTypes.INTEGER
}, { 
  indexes: [
    {
      unique: true,
      fields: ['userId']
    }
  ],
  sequelize,
  modelName: 'cash'
});

Cash.belongsTo(User, {
  foreignKey: 'userId'
})



module.exports = Cash;