const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../lib/db')

class User extends Model {}

User.init({
  first: DataTypes.STRING,
  last: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, { 
  indexes: [
    {
      unique: true,
      fields: ['email']
    }
  ],
  sequelize,
  modelName: 'user'
});


module.exports = User;