const Usuario = require('../repositories/usuarioRepository');
const bcrypt = require('bcrypt');

// POST /usuarios (cadastro)
exports.cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, tipo_usuario } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha || !tipo_usuario) {
      return res.render('cadastro', {
        mensagemErro: 'Todos os campos são obrigatórios.',
        mensagemSucesso: null
      });
    }

    // Verifica se o e-mail já está em uso
    const existente = await Usuario.buscarPorEmail(email);
    if (existente) {
      return res.render('cadastro', {
        mensagemErro: 'E-mail já cadastrado.',
        mensagemSucesso: null
      });
    }

    // Cria o novo usuário (com senha criptografada)
    await Usuario.criar({ nome, email, senha, tipo_usuario });

    // Retorna para a própria página com confirmação (ou redireciona para login se preferir)
    return res.render('cadastro', {
      mensagemErro: null,
      mensagemSucesso: 'Cadastro realizado com sucesso!'
    });

    // Se quiser redirecionar diretamente para login, troque a linha acima por:
    // return res.redirect('/?sucesso=1');
  } catch (erro) {
    console.error('Erro ao cadastrar usuário:', erro);
    return res.render('cadastro', {
      mensagemErro: 'Erro interno ao cadastrar.',
      mensagemSucesso: null
    });
  }
};

// POST /login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.buscarPorEmail(email);

    if (!usuario) {
      return res.render('login', {
        mensagemErro: 'Usuário não encontrado.',
        mensagemSucesso: null
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.render('login', {
        mensagemErro: 'Senha inválida.',
        mensagemSucesso: null
      });
    }

    // Armazena dados essenciais na sessão
    req.session.usuario = {
      id: usuario.id_usuario,
      nome: usuario.nome,
      tipo: usuario.tipo_usuario
    };

    res.redirect('/home');
  } catch (erro) {
    console.error('Erro no login:', erro);
    res.status(500).render('login', {
      mensagemErro: 'Erro interno no login.',
      mensagemSucesso: null
    });
  }
};

// GET /usuarios
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.listarTodos();
    res.json(usuarios);
  } catch (erro) {
    console.error('Erro ao listar usuários:', erro);
    res.status(500).send('Erro ao listar usuários.');
  }
};

// GET /usuarios/:id
exports.buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.buscarPorId(id);
    if (!usuario) return res.status(404).send('Usuário não encontrado');
    res.json(usuario);
  } catch (erro) {
    console.error('Erro ao buscar usuário por ID:', erro);
    res.status(500).send('Erro ao buscar usuário.');
  }
};
