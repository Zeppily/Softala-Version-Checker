require('dotenv').config();
// dotenv.config({ path: "config.env" });

module.exports = {
  "development": {
    "database": 'version_checker',
    "username": 'postgres',
    "password": process.env.TEST_DB_PSWD,
    "host": '127.0.0.1',
    "dialect": 'postgres',
    // // "dialectOptions": {
    // //   "ssl": {
    // //       require: true,
    // //       rejectUnauthorized: true
    // //   }
    // // }
    // // port: 5432
  },
  "test" : {
    "database": 'version_checker',
    "username": 'postgres',
    "password": process.env.TEST_DB_PSWD,
    "host": '127.0.0.1',
    "dialect": 'postgres',
    // port: 5432
  },
  "production": {
    "database": process.env.DB_NAME,
    "username": process.env.DB_USER,
    "password": process.env.DB_PSWD,
    "host": process.env.DB_HOST,
    "dialect": 'postgres',
    "port": process.env.DB_PORT
  }
};