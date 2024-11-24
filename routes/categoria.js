const express = require('express');

const router = express.Router();
const index = require('../index');



//Rota get -> listCategorias
router.get("/categoria", async (req, res) => {
    const categoria = await index.listCategorias();
    if(categoria){
        res.json(categoria);
    }else{
        res.status(404).json({message: "Categoria não encontrada"});
    }

});


//Rota get -> getCategoria
router.get('/categoria/:id', async (req, res) => {
    const dados = req.params;
    const categoria = await index.getCategoria(dados.id);
    if(categoria){
        res.json(categoria);
    }else{
        res.status(404).json({message: "Categoria não encontrado"});
    }

});



//Rota post -> setcategoria
router.post("/categoria", async (req, res) => {
    let dados = req.body;

    try {
        const novoCategoria = await index.setCategoria(dados.nome);
        return res.json({
            mensagem: "Categoria cadastrado com sucesso",
            novoCategoria
        });
    } catch (e) {
        return res.json({
            mensagem: `Erro: \n${e}\nCategoria não cadastrado`
        });
    }
});





//Rota put -> updateCategoria
router.put("/categoria", async (req, res) => {
    let dados = req.body;

    try {
        const categoria = await index.updateCategoria(dados);
        return res.json({
            mensagem: "Categoria Editado com sucesso",
            categoria
        });
    } catch (e) {
        return res.json({
            mensagem: `Erro: ${e}
            Categoria não Editado`
        });
    }
});

//Rota delete -> deleteCategoria
router.delete('/categoria/:id', async (req, res) => {
    const dados = req.params;
    try {
        const categoria = await index.deleteCategoria(dados.id);
        
        if (categoria) {
            res.json({ message: "Categoria Excluido com sucesso" });
        } else {
            res.status(404).json({ message: "Categoria não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar Categoria:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }

});

module.exports = router;
