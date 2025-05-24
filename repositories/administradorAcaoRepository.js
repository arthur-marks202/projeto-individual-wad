// repositories/administradorAcaoRepository.js

const db = require('../config/db');

const AdministradorAcaoRepository = {
  // Cria um novo registro de ação feita por um administrador
  async criar({ id_admin, id_reserva, acao }) {
    const result = await db.query(
      `INSERT INTO administrador_acao (id_admin, id_reserva, acao)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [id_admin, id_reserva, acao]
    );
    return result.rows[0];
  },

  // Lista todas as ações administrativas realizadas, com dados de usuário e reserva
  async listarTodasComJoin() {
    const result = await db.query(
      `SELECT a.*, u.nome AS admin_nome, r.data_reserva, r.horario_inicio, r.horario_fim, r.status_reserva
       FROM administrador_acao a
       JOIN usuario u ON a.id_admin = u.id_usuario
       JOIN reserva r ON a.id_reserva = r.id_reserva
       ORDER BY a.data_acao DESC`
    );
    return result.rows;
  }
};

module.exports = AdministradorAcaoRepository;
