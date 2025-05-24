const { Pool } = require('pg'); // Importa o módulo pg para trabalhar com PostgreSQL
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const isSSL = process.env.DB_SSL === 'true'; // Verifica se a conexão deve ser feita com SSL

const pool = new Pool({ // Cria uma nova instância do Pool para gerenciar conexões com o banco de dados
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: isSSL ? { rejectUnauthorized: false } : false,
});

module.exports = { // Exporta o pool para ser utilizado em outros módulos
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
};