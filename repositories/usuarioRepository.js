// repositories/usuarioRepository.js

const db = require('../config/db');
const bcrypt = require('bcrypt');

const UsuarioRepository = {
  // Cria um novo usuário com senha criptografada
  async criar({ nome, email, senha, tipo_usuario }) {
    const senhaHash = await bcrypt.hash(senha, 10);
    const result = await db.query(
      `INSERT INTO usuario (nome, email, senha, tipo_usuario)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nome, email, senhaHash, tipo_usuario]
    );
    return result.rows[0];
  },

  // Busca um usuário pelo e-mail (para login ou verificação de duplicidade)
  async buscarPorEmail(email) {
    const result = await db.query(
      `SELECT * FROM usuario WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  },

  // Busca um usuário pelo ID
  async buscarPorId(id) {
    const result = await db.query(
      `SELECT * FROM usuario WHERE id_usuario = $1`,
      [id]
    );
    return result.rows[0];
  },

  // Lista todos os usuários (usado por admins)
  async listarTodos() {
    const result = await db.query(
      `SELECT id_usuario, nome, email, tipo_usuario FROM usuario`
    );
    return result.rows;
  }
};

module.exports = UsuarioRepository;
