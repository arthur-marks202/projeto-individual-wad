const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

// GET /admin → mostra o painel administrativo com reservas pendentes
router.get('/admin', reservaController.listarTodasReservas);

module.exports = router;