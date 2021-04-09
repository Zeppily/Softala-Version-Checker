require('dotenv').config;

let pswd = process.env.TEST_DB_PSWD

const sequelize = new Sequelize('postgres', 'postgres', pswd, {
    host: process.env.DB_URL,
    dialect: 'postgres',
    define: {
        freezeTableName: true,
    }
});