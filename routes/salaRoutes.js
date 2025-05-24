const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salaController');

// Lista todas as salas disponíveis
router.get('/salas', salaController.listarSalas);

// Busca uma sala específica pelo ID
router.get('/salas/:id', salaController.buscarSalaPorId);

module.exports = router; // Exporta o router para uso no server.js

