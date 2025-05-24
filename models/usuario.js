const db = require('../config/db'); // Importa o módulo de conexão com o banco de dados
const bcrypt = require('bcrypt');   // Biblioteca para criptografar senhas

const Usuario = {
  // Cria um novo usuário no banco de dados
  async create({ nome, email, senha, tipo_usuario }) {
    const hash = await bcrypt.hash(senha, 10); // Criptografa a senha antes de salvar
    const query = `
      INSERT INTO usuario (nome, email, senha, tipo_usuario)
      VALUES ($1, $2, $3, $4)
      RETURNING *`; // Retorna todos os dados do novo usuário
    const values = [nome, email, hash, tipo_usuario];
    const result = await db.query(query, values);
    return result.rows[0]; // Retorna o usuário criado
  },

  // Busca um usuário no banco a partir do e-mail (usado no login)
  async findByEmail(email) {
    const result = await db.query(
      `SELECT * FROM usuario WHERE email = $1`,
      [email]
    );
    return result.rows[0]; // Retorna o usuário encontrado (ou undefined)
  },

  // Busca um usuário pelo ID (usado para perfil ou autenticação)
  async findById(id) {
    const result = await db.query(
      `SELECT * FROM usuario WHERE id_usuario = $1`,
      [id]
    );
    return result.rows[0]; // Retorna o usuário correspondente ao ID
  },

  // Lista todos os usuários (acesso geralmente permitido ao administrador)
  async findAll() {
    const result = await db.query(
      `SELECT id_usuario, nome, email, tipo_usuario FROM usuario`
    );
    return result.rows; // Retorna um array com todos os usuários
  }
};

module.exports = Usuario; // Exporta o módulo para uso em controllers ou services
