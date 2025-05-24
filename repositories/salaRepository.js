// repositories/salaRepository.js

const db = require('../config/db');

const SalaRepository = {
  // Lista todas as salas cadastradas no sistema
  async listarTodas() {
    const result = await db.query(
      `SELECT * FROM sala ORDER BY nome ASC`
    );
    return result.rows;
  },

  // Busca uma sala pelo ID (usado para exibir detalhes ou confirmar reserva)
  async buscarPorId(id_sala) {
    const result = await db.query(
      `SELECT * FROM sala WHERE id_sala = $1`,
      [id_sala]
    );
    return result.rows[0];
  }
};

module.exports = SalaRepository;

