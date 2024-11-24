const express = require('express');

const router = express.Router();
const index = require('../index');



//Rota get -> listproduto
router.get("/produto", async (req, res) => {
    const produto = await index.listProdutos();
    if(produto){
        res.json(produto);
    }else{
        res.status(404).json({message: "produto não encontrado"});
    }

});


//Rota get -> getproduto
router.get('/produto/:id', async (req, res) => {
    const dados = req.params;
    const produto = await index.getProduto(dados.id);
    if(produto){
        res.json(produto);
    }else{
        res.status(404).json({message: "produto não encontrado"});
    }

});



//Rota post -> setproduto
router.post("/produto", async (req, res) => {
    let dados = req.body;
    if (!dados.nome || !dados.preco || !dados.idCategoria) {
        return res.status(400).json({ mensagem: "Dados incompletos" });
    }

    try {
        const novoproduto = await index.setProduto(dados.nome, dados.preco, dados.idCategoria);
        return res.json({
            mensagem: "produto cadastrado com sucesso",
            novoproduto
        });
    } catch (e) {
        return res.status(500).json({
            mensagem: `Erro: ${e}
            produto não cadastrado`
        });
    }
});





//Rota put -> updateproduto
router.put("/produto", async (req, res) => {
    let dados = req.body;

    try {
        const produto = await index.updateProduto(dados);
        return res.json({
            mensagem: "produto Editado com sucesso",
            produto
        });
    } catch (e) {
        return res.json({
            mensagem: `Erro: ${e}
            produto não Editado`
        });
    }
});

//Rota delete -> deleteproduto
router.delete('/produto/:id', async (req, res) => {
    const dados = req.params;
    try {
        const produto = await index.deleteProduto(dados.id);
        
        if (produto) {
            res.json({ message: "produto Excluido com sucesso" });
        } else {
            res.status(404).json({ message: "produto não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }

});

module.exports = router;
