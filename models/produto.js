const { Sequelize } = require("sequelize")

const database = require('../db');
const Categoria = require('../models/categoria')
const Carrinho = require('../models/carrinho');
const Usuario = require("./usuario");

const Produto = database.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    preco: {
        type: Sequelize.FLOAT,
        allowNull: false,
    }
});

module.exports = Produto;
