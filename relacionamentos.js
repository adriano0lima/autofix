const Usuario = require('./models/usuario');
const Produto = require('./models/produto');
const Categoria = require('./models/categoria');
const Carrinho = require('./models/carrinho');
const Perfil = require('./models/perfil');

// Relacionamento entre Perfil e Usuario (1:N)
Usuario.belongsTo(Perfil, {
    constraint: true,
    foreignKey: 'idPerfil'
});
Perfil.hasMany(Usuario, {
    foreignKey: 'idPerfil'
});

// Relacionamento entre Categoria e Produto (1:N)
Produto.belongsTo(Categoria, {
    constraint: true,
    foreignKey: 'idCategoria'
});
Categoria.hasMany(Produto, {
    foreignKey: 'idCategoria'
});

// Relacionamento entre Produto e Usuario (N:M)
Produto.belongsToMany(Usuario, {
    through: {
        model: Carrinho
    },
    constraint: true,
    foreignKey: 'idProduto'
});
Usuario.belongsToMany(Produto, {
    through: {
        model: Carrinho
    },
    constraint: true,
    foreignKey: 'idUsuario'
});

// Relacionamento entre Carrinho e Produto (N:1)
Produto.hasMany(Carrinho, { foreignKey: 'idProduto' });
Carrinho.belongsTo(Produto, { foreignKey: 'idProduto' });

// Relacionamento entre Carrinho e Usuario (N:1)
Usuario.hasMany(Carrinho, { foreignKey: 'idUsuario' });
Carrinho.belongsTo(Usuario, { foreignKey: 'idUsuario' });