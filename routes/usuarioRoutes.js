// routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Exibe formulário de cadastro
router.get('/cadastro', (req, res) => {
  res.render('cadastro', {
    mensagemErro: null,
    mensagemSucesso: null
  });
});



// Processa formulário de cadastro
router.post('/usuarios', usuarioController.cadastrarUsuario);

// Login do usuário
router.post('/login', usuarioController.login);

// Lista todos os usuários (admin)
router.get('/usuarios', usuarioController.listarUsuarios);

// Busca usuário por ID (perfil)
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorId);

module.exports = router;
