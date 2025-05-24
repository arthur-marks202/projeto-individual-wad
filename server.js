require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./config/db');
const app = express();

// Configuração do view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares globais
app.use(express.json()); // Suporte a JSON
app.use(express.urlencoded({ extended: true })); // Suporte a formulários

// Configuração de sessão (antes das rotas)
app.use(session({
  secret: 'checkin-room-seguro',
  resave: false,
  saveUninitialized: false
}));

// Conexão com o banco de dados
db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    // ✅ Correções nos nomes dos arquivos de rotas
    const userRoutes = require('./routes/usuarioRoutes');
    const reservaRoutes = require('./routes/reservaRoutes');
    const notificacaoRoutes = require('./routes/notificacaoRoutes');
    const adminRoutes = require('./routes/adminRoutes');
    const salaRoutes = require('./routes/salaRoutes');

    // Registro das rotas
    app.use('/', userRoutes);
    app.use('/', reservaRoutes);
    app.use('/', notificacaoRoutes);
    app.use('/', adminRoutes);
    app.use('/', salaRoutes);

    app.get('/', (req, res) => {
  const sucesso = req.query.sucesso;
  const mensagemSucesso = sucesso === '1' ? 'Cadastro realizado com sucesso!' : null;
  res.render('login', { mensagemErro: null, mensagemSucesso });
});


    // Rota de home (pós-login)
    app.get('/home', (req, res) => {
  res.render('home', { usuario: req.session.usuario });
});

    // Middleware para página não encontrada (404)
    app.use((req, res, next) => {
      res.status(404).send('Página não encontrada');
    });

    // Middleware para erro interno do servidor (500)
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Erro no servidor');
    });

    // Inicializa o servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escutando em http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
