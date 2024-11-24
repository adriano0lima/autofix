const { Sequelize } = require("sequelize")

const database = require('../db');

const Carrinho = database.define('carrinho', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: false
    }

});

module.exports = Carrinho;
