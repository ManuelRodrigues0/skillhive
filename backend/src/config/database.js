require('dotenv').config();
const { Sequelize } = require('sequelize');
const path = require('path');

let sequelize;

if (process.env.DB_DIALECT === 'mysql' || (!process.env.DB_DIALECT && process.env.DB_PASSWORD && process.env.DB_PASSWORD !== 'your_password')) {
  console.log('Attempting to connect to MySQL database...');
  sequelize = new Sequelize(
    process.env.DB_NAME || 'skillhive_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'password',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false,
    }
  );
} else {
  console.log('Using SQLite database as fallback/default (no MySQL running)...');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database.sqlite'),
    logging: false,
  });
}

module.exports = sequelize;

