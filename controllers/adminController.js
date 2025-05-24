const { administrador_acao, usuario, reserva } = require('../models');

// ✅ Registrar ação administrativa
exports.registrarAcaoAdmin = async (req, res) => {
  try {
    const { id_admin, id_reserva, acao } = req.body;

    if (!['aprovou', 'cancelou'].includes(acao)) {
      return res.status(400).json({ mensagem: 'Ação inválida.' });
    }

    const novaAcao = await administrador_acao.create({
      id_admin,
      id_reserva,
      acao
    });

    res.status(201).json({ mensagem: 'Ação registrada com sucesso.', acao: novaAcao });
  } catch (erro) {
    console.error('Erro ao registrar ação do admin:', erro);
    res.status(500).json({ erro: 'Erro ao registrar ação administrativa.' });
  }
};

// ✅ Listar histórico de ações dos administradores
exports.listarAcoesAdmin = async (req, res) => {
  try {
    const acoes = await administrador_acao.findAll({
      include: [
        { model: usuario, as: 'admin', attributes: ['id_usuario', 'nome', 'email'] },
        { model: reserva, attributes: ['id_reserva', 'data_reserva', 'horario_inicio', 'horario_fim', 'status_reserva'] }
      ],
      order: [['data_acao', 'DESC']]
    });

    res.status(200).json(acoes);
  } catch (erro) {
    console.error('Erro ao listar ações administrativas:', erro);
    res.status(500).json({ erro: 'Erro ao buscar ações dos administradores.' });
  }
};
