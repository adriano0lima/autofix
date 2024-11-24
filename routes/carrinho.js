const express = require('express');

const router = express.Router();
const index = require('../index');

//Rota post -> setCarrinho
router.post("/carrinho", async (req, res) => {
    let dados = req.body;

    try {
        const novoCarrinho = await index.adicinarCarrinho(dados.quantidade, dados.idProduto, dados.idUsuario);
        if (novoCarrinho != null) {
            return res.json({
                mensagem: "Produto adicionado ao carrinho",
                novoCarrinho
            });
        }
        else {
            return res.json({
                mensagem: `Produto não adicionado`
            });
        }
    } catch (e) {
        return res.json({
            mensagem: `Erro: ${e}
            Produto não adicionado`
        });
    }
});

//Rota put -> updateCarrinho
router.put("/carrinho", async (req, res) => {
    let dados = req.body;

    try {
        const carrinho = await index.updateCarrinho(dados);
        return res.json({
            mensagem: "Carrinho Editado com sucesso",
            carrinho
        });
    } catch (e) {
        return res.json({
            mensagem: `Erro: ${e}
            Carrinho não Editado`
        });
    }
});


//Rota put -> meuCarrinho
router.put("/carrinho/meucarrinho", async (req, res) => {
    let dados = req.body;

        const carrinho = await index.meuCarrinho(dados.id);
        if(carrinho){
            res.json(carrinho);
        }else{
            res.status(404).json({message: "Carrinho não encontrado"});
        }
});

//Rota delete -> deleteCarrinho
router.delete('/carrinho/:id', async (req, res) => {
    const dados = req.params;
    try {
        const carrinho = await index.deleteCarrinho(dados.id);

        if (carrinho) {
            res.json({ message: "Produto removido com sucesso" });
        } else {
            res.status(404).json({ message: "Produto não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar carrinho:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }

});

module.exports = router
