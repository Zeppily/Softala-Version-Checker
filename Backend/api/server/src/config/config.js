require('dotenv').config();
// dotenv.config({ path: "config.env" });

module.exports = {
  "development": {
    "database": 'postgres',
    "username": process.env.DB_USER,
    "password": process.env.DB_PSWD,
    "host": process.env.DB_URL,
    "dialect": 'postgres',
    // // "dialectOptions": {
    // //   "ssl": {
    // //       require: true,
    // //       rejectUnauthorized: true
    // //   }
    // // }
    // // port: 5432
  },
  "test": {
    "database": process.env.TEST_DB,
    "username": process.env.DB_USER,
    "password": process.env.TEST_DB_PSWD,
    "host": process.env.DB_URL,
    "dialect": 'postgres',
    // port: 5432
  },
  "production": {
    "database": 'postgres',
    "username": process.env.DB_USER,
    "password": process.env.DB_PSWD,
    "host": process.env.DB_URL,
    "dialect": 'postgres',
  }
};