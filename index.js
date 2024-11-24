const database = require('./db');
const Perfil = require('./models/perfil');
const Usuario = require('./models/usuario');
const Produto = require('./models/produto');
const Categoria = require('./models/categoria');
const Carrinho = require('./models/carrinho');


//const router = express.Router()

require('./relacionamentos')

database.sync();




//Perfil
async function setPerfil(n) {
    const novoPerfil = await Perfil.create({
        nome: n
    });
    return (novoPerfil);
}

async function getPerfil(id) {
    let perfil = await Perfil.findByPk(id);
    return perfil;
}

async function listPerfis() {
    const perfil = await Perfil.findAll();
    return perfil;
}

async function updatePerfil(dados) {
    const perfil = await Perfil.update(dados, { where: { id: dados.id } });
    return (perfil);
}

async function deletePerfil(i) {
    const perfil = await Perfil.destroy({ where: { id: i } });

    return (perfil)
}

//------------------------------------------------------


//Usuario
async function setUsuario(n, s, e, p) {
    const novoUsuario = await Usuario.create({
        nome: n,
        senha: s,
        email: e,
        idPerfil: p
    });
    return (novoUsuario);
}

async function getUsuario(id) {
    let usuario = await Usuario.findByPk(id);
    return usuario;
}

async function listUsuarios() {
    const usuarios = await Usuario.findAll();
    return usuarios;
}

async function updateUsuario(dados) {
    const usuario = await Usuario.update(dados, { where: { id: dados.id } });
    return usuario;
}

//Usuario - Cadastrar e Login
async function cadastrarUsuario(n, s, e, p) {
    const consultaUsuario = await Usuario.findAll({ where: { email: e } });
    if (!consultaUsuario == null) {
        return null
    } else {
        return setUsuario(n, s, e, p)
    }

}

async function loginUsuario(s, e) {
    let consultaUsuario = await Usuario.findAll({ where: { email: e } });


    if (!consultaUsuario) {
        return null;
    }


    consultaUsuario = await Usuario.findAll({ where: { email: e, senha: s} })

    if (!consultaUsuario) {
        return false;
    } else {
        return consultaUsuario;
    }
}



//------------------------------------------------------


//Produto
async function setProduto(n, p, c) {
    const novoProduto = await Produto.create({
        nome: n,
        preco: p,
        idCategoria: c
    });
    return (novoProduto);
}

async function getProduto(id) {
    let produto = await Produto.findByPk(id);
    return produto;
}

async function listProdutos() {
    const produtos = await Produto.findAll();
    return produtos;
}

async function updateProduto(dados) {
    const produto = await Produto.update(dados, { where: { id: dados.id } });
    return produto;
}

async function deleteProduto(i) {
    const produto = await Produto.destroy({ where: { id: i } });

    return (produto)
}
//------------------------------------------------------


//Categoria
async function setCategoria(n) {
    const novaCategoria = await Categoria.create({
        nome: n
    });
    return (novaCategoria);
}

async function getCategoria(id) {
    let categoria = await Categoria.findByPk(id);
    return categoria;
}

async function listCategorias() {
    const categorias = await Categoria.findAll();
    return categorias;
}

async function updateCategoria(dados) {
    const categoria = await Categoria.update(dados, { where: { id: dados.id } });
    return categoria;
}

async function deleteCategoria(i) {
    const categoria = await Categoria.destroy({ where: { id: i } });

    return (categoria)
}

//------------------------------------------------------


//Carrinho
async function setCarrinho(qtd, p, u) {
    const novoCarrinho = await Carrinho.create({
        quantidade: qtd,
        idProduto: p,
        idUsuario: u
    });
    return (novoCarrinho);
}

async function getCarrinho(id) {
    let carrinho = await Carrinho.findByPk(id);
    return carrinho;
}

async function listCarrinhos() {
    const carrinhos = await Carrinho.findAll();
    return carrinhos;
}

async function updateCarrinho(dados) {
    const carrinho = await Carrinho.update(dados, { where: { id: dados.id } });
    return carrinho;
}

async function deleteCarrinho(i) {
    const carrinho = await Carrinho.destroy({ where: { id: i } });

    return (carrinho)
}

async function meuCarrinho(uID) {
    const carrinhos = await Carrinho.findAll({ where: { idUsuario: uID } });
    return carrinhos;
}

async function adicinarCarrinho(qtd, p, u) {
    const consultaCarrinho = await Carrinho.findOne({ where: { idUsuario: u } });
    if (!consultaCarrinho == null) {
        return null
    } else {
        return setCarrinho(qtd, p, u)
    }

}
//------------------------------------------------------






module.exports = {
    setPerfil,
    getPerfil,
    listPerfis,
    updatePerfil,
    deletePerfil,

    setUsuario,
    getUsuario,
    listUsuarios,
    updateUsuario,
    cadastrarUsuario,
    loginUsuario,

    setProduto,
    getProduto,
    listProdutos,
    updateProduto,
    deleteProduto,

    setCategoria,
    getCategoria,
    listCategorias,
    updateCategoria,
    deleteCategoria,

    setCarrinho,
    getCarrinho,
    listCarrinhos,
    updateCarrinho,
    deleteCarrinho,
    meuCarrinho,
    adicinarCarrinho

};
