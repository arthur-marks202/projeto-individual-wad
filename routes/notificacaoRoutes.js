const express = require('express');
const router = express.Router();
const notificacaoController = require('../controllers/notificacaoController');

// GET - Listar notificações do usuário
router.get('/notificacoes/:id_usuario', notificacaoController.listarNotificacoesPorUsuario);

// PUT - Marcar como visualizada
router.put('/notificacoes/:id/visualizar', notificacaoController.marcarComoVisualizada);

module.exports = router;
