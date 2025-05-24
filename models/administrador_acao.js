const db = require('../config/db'); // Importa a conexão com o banco de dados

const AdministradorAcao = {
  // Cria um novo registro de ação feita por um administrador
  async create({ id_admin, id_reserva, acao }) {
    const query = `
      INSERT INTO administrador_acao (id_admin, id_reserva, acao)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const values = [id_admin, id_reserva, acao];
    const result = await db.query(query, values);
    return result.rows[0]; // Retorna a ação registrada
  },

  // Lista todas as ações administrativas com dados agregados
  async findAllWithJoin() {
    const query = `
      SELECT a.*, u.nome AS admin_nome, r.data_reserva, r.horario_inicio, r.horario_fim, r.status_reserva
      FROM administrador_acao a
      JOIN usuario u ON a.id_admin = u.id_usuario
      JOIN reserva r ON a.id_reserva = r.id_reserva
      ORDER BY a.data_acao DESC`;
    const result = await db.query(query);
    return result.rows; // Retorna todas as ações realizadas por admins
  }
};

module.exports = AdministradorAcao; // Exporta o módulo para uso no adminController
