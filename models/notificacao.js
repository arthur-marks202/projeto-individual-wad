const db = require('../config/db'); // Importa o módulo de conexão com o banco

const Notificacao = {
  // Cria uma nova notificação no banco
  async create({ id_usuario, tipo_notificacao, mensagem, id_reserva = null }) {
    const query = `
      INSERT INTO notificacao (id_usuario, tipo_notificacao, mensagem, id_reserva)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const values = [id_usuario, tipo_notificacao, mensagem, id_reserva];
    const result = await db.query(query, values);
    return result.rows[0]; // Retorna a notificação recém-criada
  },

  // Lista todas as notificações de um determinado usuário
  async findByUsuario(id_usuario) {
    const query = `
      SELECT * FROM notificacao
      WHERE id_usuario = $1
      ORDER BY data_envio DESC`;
    const result = await db.query(query, [id_usuario]);
    return result.rows; // Retorna as notificações em ordem cronológica decrescente
  },

  // Marca uma notificação como visualizada
  async marcarComoVisualizada(id_notificacao) {
    const query = `
      UPDATE notificacao
      SET visualizada = TRUE
      WHERE id_notificacao = $1
      RETURNING *`;
    const result = await db.query(query, [id_notificacao]);
    return result.rows[0]; // Retorna a notificação atualizada
  },

  // Busca uma notificação por ID
  async findById(id) {
    const result = await db.query(
      `SELECT * FROM notificacao WHERE id_notificacao = $1`,
      [id]
    );
    return result.rows[0]; // Retorna a notificação (ou undefined)
  }
};

module.exports = Notificacao; // Exporta o módulo para uso nos controllers
