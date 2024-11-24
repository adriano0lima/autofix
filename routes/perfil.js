const express = require('express');

const router = express.Router();
const index = require('../index');



//Rota get -> listPerfil
router.get("/perfil", async (req, res) => {
    const perfil = await index.listPerfis();
    if(perfil){
        res.json(perfil);
    }else{
        res.status(404).json({message: "Perfil não encontrado"});
    }

});


//Rota get -> getPerfil
router.get('/perfil/:id', async (req, res) => {
    const dados = req.params;
    const perfil = await index.getPerfil(dados.id);
    if(perfil){
        res.json(perfil);
    }else{
        res.status(404).json({message: "Perfil não encontrado"});
    }

});



//Rota post -> setPerfil
router.post("/perfil", async (req, res) => {
    let dados = req.body;

    try {
        const novoPerfil = await index.setPerfil(dados.nome);
        return res.json({
            mensagem: "Perfil cadastrado com sucesso",
            novoPerfil
        });
    } catch (e) {
        return res.json({
            mensagem: `Erro: \n${e}\nPerfil não cadastrado`
        });
    }
});





//Rota put -> updatePerfil
router.put("/perfil", async (req, res) => {
    let dados = req.body;

    try {
        const perfil = await index.updatePerfil(dados);
        return res.json({
            mensagem: "Perfil Editado com sucesso",
            perfil
        });
    } catch (e) {
        return res.json({
            mensagem: `Erro: ${e}
            Perfil não Editado`
        });
    }
});

//Rota delete -> deletePerfil
router.delete('/perfil/:id', async (req, res) => {
    const dados = req.params;
    try {
        const perfil = await index.deletePerfil(dados.id);
        
        if (perfil) {
            res.json({ message: "Perfil Excluido com sucesso" });
        } else {
            res.status(404).json({ message: "Perfil não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar perfil:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }

});

module.exports = router;
