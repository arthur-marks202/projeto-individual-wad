const express = require('express');
const router = express.Router();

const reservaController = require('../controllers/reservaController');
const Sala = require('../repositories/salaRepository');
const Reserva = require('../repositories/reservaRepository');

// ✅ Exibe a tela para reservar salas
router.get('/reservar', async (req, res) => {
  try {
    const salas = await Sala.listarTodas();
    res.render('reservar', { salas, mensagemErro: null });
  } catch (erro) {
    console.error('Erro ao carregar salas:', erro);
    res.status(500).send('Erro ao carregar salas.');
  }
});

// ✅ Processa uma tentativa de reserva (verifica conflito e redireciona)
router.post('/reservar/confirmar', async (req, res) => {
  try {
    const { id_sala, data_reserva, horario_inicio, horario_fim } = req.body;
    const id_usuario = req.session.usuario.id;

    // Verifica se já existe uma reserva aprovada com conflito
    const conflito = await Reserva.verificarConflito(id_sala, data_reserva, horario_inicio, horario_fim);
    if (conflito) {
      const salas = await Sala.listarTodas();
      return res.render('reservar', {
        salas,
        mensagemErro: 'Horário indisponível para esta sala.'
      });
    }

    // Cria a nova reserva com status "pendente"
    await Reserva.criar({
      id_usuario,
      id_sala,
      data_reserva,
      horario_inicio,
      horario_fim,
      status_reserva: 'pendente'
    });

    res.redirect(`/reservas/${id_usuario}/minhas`);
  } catch (erro) {
    console.error('Erro ao confirmar reserva:', erro);
    res.status(500).send('Erro ao processar a reserva.');
  }
});

// ✅ Lista todas as reservas feitas por um usuário
router.get('/reservas/:id_usuario/minhas', reservaController.listarReservasPorUsuario);

// ✅ Lista todas as reservas do sistema (admin)
router.get('/reservas', reservaController.listarTodasReservas);

// ✅ Cria nova reserva (API genérica, se for mantida)
router.post('/reservas', reservaController.criarReserva);

// ✅ Cancela uma reserva
router.put('/reservas/:id/cancelar', reservaController.cancelarReserva);

// ✅ Aprova uma reserva (admin)
router.put('/reservas/:id/aprovar', reservaController.aprovarReserva);

module.exports = router;
