const Reserva = require('../repositories/reservaRepository');
const Sala = require('../repositories/salaRepository');
const AdminAcao = require('../repositories/administradorAcaoRepository');

// POST /reservas (caso ainda seja usado por outra parte)
exports.criarReserva = async (req, res) => {
  try {
    const { id_sala, data_reserva, horario_inicio, horario_fim } = req.body;
    const id_usuario = req.session.usuario.id;

    const conflito = await Reserva.verificarConflito(id_sala, data_reserva, horario_inicio, horario_fim);
    if (conflito) {
      const salas = await Sala.listarTodas();
      return res.render('reservar', {
        salas,
        mensagemErro: 'Horário indisponível para esta sala.'
      });
    }

    await Reserva.criar({ id_usuario, id_sala, data_reserva, horario_inicio, horario_fim });
    res.redirect(`/reservas/${id_usuario}/minhas`);
  } catch (erro) {
    console.error('Erro ao criar reserva:', erro);
    res.status(500).send('Erro ao criar reserva.');
  }
};

// GET /reservas/:id_usuario/minhas
exports.listarReservasPorUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const reservas = await Reserva.listarPorUsuario(id_usuario);
    res.render('minhasReservas', {
      reservas,
      usuario: req.session.usuario // Passando usuário da sessão
    });
  } catch (erro) {
    console.error('Erro ao listar reservas:', erro);
    res.status(500).send('Erro ao buscar reservas do usuário.');
  }
};

// GET /reservas (admin)
exports.listarTodasReservas = async (req, res) => {
  try {
    const reservasPendentes = await Reserva.listarTodasComJoin();
    res.render('adminDashboard_new', {
      reservasPendentes,
      mensagemSucesso: null
    });
  } catch (erro) {
    console.error('Erro ao listar reservas:', erro);
    res.status(500).send('Erro ao listar todas as reservas.');
  }
};


// Aprovar reserva
exports.aprovarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const id_admin = req.session.usuario.id;

    await Reserva.atualizarStatus(id, 'aprovada');
    await AdminAcao.criar({ id_admin, id_reserva: id, acao: 'aprovou' });

    // Recarrega a tela com nova lista
    const reservasPendentes = await Reserva.listarTodasComJoin();
    res.render('adminDashboard_new', {
      reservasPendentes,
      mensagemSucesso: 'Reserva aprovada com sucesso!'
    });
  } catch (erro) {
    console.error('Erro ao aprovar reserva:', erro);
    res.status(500).send('Erro ao aprovar reserva.');
  }
};

// Cancelar reserva
exports.cancelarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    await Reserva.atualizarStatus(id, 'cancelada');

    const reservasPendentes = await Reserva.listarTodasComJoin();
    res.render('adminDashboard_new', {
      reservasPendentes,
      mensagemSucesso: 'Reserva cancelada com sucesso!'
    });
  } catch (erro) {
    console.error('Erro ao cancelar reserva:', erro);
    res.status(500).send('Erro ao cancelar reserva.');
  }
};
