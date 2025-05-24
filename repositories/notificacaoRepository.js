const db = require('../config/db'); // Importa a conexão com o banco de dados

const NotificacaoRepository = {
  // Cria uma nova notificação no banco
  async criar({ id_usuario, tipo_notificacao, mensagem, id_reserva = null }) {
    const result = await db.query(
      `INSERT INTO notificacao (id_usuario, tipo_notificacao, mensagem, id_reserva)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id_usuario, tipo_notificacao, mensagem, id_reserva]
    );
    return result.rows[0]; // Retorna a notificação criada
  },

  // Lista todas as notificações de um determinado usuário
  async listarPorUsuario(id_usuario) {
    const result = await db.query(
      `SELECT * FROM notificacao
       WHERE id_usuario = $1
       ORDER BY data_envio DESC`,
      [id_usuario]
    );
    return result.rows; // Retorna a lista de notificações em ordem cronológica
  },

  // Atualiza o campo visualizada de uma notificação para true
  async marcarComoVisualizada(id_notificacao) {
    const result = await db.query(
      `UPDATE notificacao
       SET visualizada = TRUE
       WHERE id_notificacao = $1
       RETURNING *`,
      [id_notificacao]
    );
    return result.rows[0]; // Retorna a notificação atualizada
  },

  // Busca uma notificação pelo ID
  async buscarPorId(id) {
    const result = await db.query(
      `SELECT * FROM notificacao WHERE id_notificacao = $1`,
      [id]
    );
    return result.rows[0]; // Retorna a notificação (ou undefined)
  }
};

module.exports = NotificacaoRepository;
