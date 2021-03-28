require('dotenv').config();

module.exports = {
  "development": {
    "database": 'postgres',
    "username": process.env.DB_USER,
    "password": process.env.DB_PSWD,
    "host": process.env.DB_URL,
    "dialect": 'postgres',
  },
  "test": {
    "database": process.env.TEST_DB,
    "username": process.env.DB_USER,
    "password": process.env.DB_PSWD,
    "host": process.env.DB_URL,
    "dialect": 'postgres',
  },
  "production": {
    "database": 'postgres',
    "username": process.env.DB_USER,
    "password": process.env.DB_PSWD,
    "host": process.env.DB_URL,
    "dialect": 'postgres',
  }
};