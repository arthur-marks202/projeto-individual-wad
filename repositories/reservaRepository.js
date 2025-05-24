const db = require('../config/db');

const ReservaRepository = {
  // Cria uma nova reserva com status inicial (normalmente 'pendente')
  async criar({ id_usuario, id_sala, data_reserva, horario_inicio, horario_fim, status_reserva = 'pendente' }) {
    const result = await db.query(
      `INSERT INTO reserva (id_usuario, id_sala, data_reserva, horario_inicio, horario_fim, status_reserva)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id_usuario, id_sala, data_reserva, horario_inicio, horario_fim, status_reserva]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  },

  // Lista todas as reservas feitas por um determinado usuário
  async listarPorUsuario(id_usuario) {
    const result = await db.query(
      `SELECT r.*, s.nome AS sala_nome, s.capacidade, s.localizacao
       FROM reserva r
       JOIN sala s ON r.id_sala = s.id_sala
       WHERE r.id_usuario = $1
       ORDER BY r.data_reserva DESC, r.horario_inicio ASC`,
      [id_usuario]
    );
    return result.rows;
  },

  // Lista todas as reservas do sistema (usado por administradores)
  async listarTodasComJoin() {
    const result = await db.query(
      `SELECT r.*, u.nome AS usuario_nome, u.email, s.nome AS sala_nome, s.capacidade, s.localizacao
       FROM reserva r
       JOIN usuario u ON r.id_usuario = u.id_usuario
       JOIN sala s ON r.id_sala = s.id_sala
       ORDER BY r.data_reserva DESC, r.horario_inicio ASC`
    );
    return result.rows;
  },

  // Altera o status de uma reserva (ex: aprovada, cancelada)
  async atualizarStatus(id_reserva, status) {
    const result = await db.query(
      `UPDATE reserva
       SET status_reserva = $1
       WHERE id_reserva = $2
       RETURNING *`,
      [status, id_reserva]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  },

  // Verifica se existe conflito de horário com outra reserva aprovada
  async verificarConflito(id_sala, data_reserva, inicio, fim) {
    // Proteção contra horários inválidos
    if (inicio >= fim) {
      return true; // Considera como conflito, impedindo reserva
    }

    const result = await db.query(
      `SELECT * FROM reserva
       WHERE id_sala = $1
         AND data_reserva = $2
         AND status_reserva = 'aprovada'
         AND ((horario_inicio, horario_fim) OVERLAPS ($3::time, $4::time))`,
      [id_sala, data_reserva, inicio, fim]
    );
    return result.rows.length > 0;
  }
};

module.exports = ReservaRepository;
