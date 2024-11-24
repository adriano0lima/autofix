const Sequelize = require('sequelize');
const sequelize = new Sequelize('autofix-db', 'admin', 'unicsul2024', {
    dialect: 'mssql',
    host: 'db-autofix.c5o6e84g87cl.us-east-1.rds.amazonaws.com',
    port: 1433
})
module.exports = sequelize
