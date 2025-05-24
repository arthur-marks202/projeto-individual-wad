const db = require('../config/db'); // Importa a conexão com o banco de dados

const Reserva = {
  // Cria uma nova reserva no banco de dados
  async create({ id_usuario, id_sala, data_reserva, horario_inicio, horario_fim, status_reserva = 'pendente' }) {
    const query = `
      INSERT INTO reserva (id_usuario, id_sala, data_reserva, horario_inicio, horario_fim, status_reserva)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;
    const values = [id_usuario, id_sala, data_reserva, horario_inicio, horario_fim, status_reserva];
    const result = await db.query(query, values);
    return result.rows[0]; // Retorna a reserva criada
  },

  // Busca todas as reservas de um usuário específico
  async findByUsuario(id_usuario) {
    const query = `
      SELECT r.*, s.nome AS sala_nome, s.capacidade, s.localizacao
      FROM reserva r
      JOIN sala s ON r.id_sala = s.id_sala
      WHERE r.id_usuario = $1
      ORDER BY r.data_reserva DESC, r.horario_inicio ASC`;
    const result = await db.query(query, [id_usuario]);
    return result.rows; // Retorna as reservas do usuário
  },

  // Lista todas as reservas do sistema (usado pelo admin)
  async findAllWithJoin() {
    const query = `
      SELECT r.*, u.nome AS usuario_nome, u.email, s.nome AS sala_nome, s.capacidade
      FROM reserva r
      JOIN usuario u ON r.id_usuario = u.id_usuario
      JOIN sala s ON r.id_sala = s.id_sala
      ORDER BY r.data_reserva DESC, r.horario_inicio ASC`;
    const result = await db.query(query);
    return result.rows; // Retorna todas as reservas com dados de usuário e sala
  },

  // Atualiza o status da reserva (usado para aprovar ou cancelar)
  async updateStatus(id_reserva, status) {
    const query = `
      UPDATE reserva
      SET status_reserva = $1
      WHERE id_reserva = $2
      RETURNING *`;
    const result = await db.query(query, [status, id_reserva]);
    return result.rows[0]; // Retorna a reserva atualizada
  },

  // Busca uma reserva por ID
  async findById(id_reserva) {
    const result = await db.query(
      `SELECT * FROM reserva WHERE id_reserva = $1`,
      [id_reserva]
    );
    return result.rows[0]; // Retorna a reserva (ou undefined)
  },

  // Verifica se já existe uma reserva aprovada com conflito de horário
  async hasConflitoHorario(id_sala, data_reserva, inicio, fim) {
    const query = `
      SELECT * FROM reserva
      WHERE id_sala = $1
        AND data_reserva = $2
        AND status_reserva = 'aprovada'
        AND (
          (horario_inicio, horario_fim) OVERLAPS ($3::time, $4::time)
        )`;
    const values = [id_sala, data_reserva, inicio, fim];
    const result = await db.query(query, values);
    return result.rows.length > 0; // Retorna true se houver conflito
  }
};

module.exports = Reserva; // Exporta o model para uso nos controllers
