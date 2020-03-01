const Sequelize = require('sequelize');
const pg = require('pg');

// workaround for sequelize bug
pg.types.setTypeParser(1700, parseFloat);

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres'
  }
);

Sequelize.postgres.DECIMAL.parse = function (value) { return parseFloat(value); };

async function connect() {
  try {
    console.log('connecting to database');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch(e) {
    console.error('Unable to connect to the database:', err);
  }
  return true
}

module.exports = {
  sequelize,
  connect
}