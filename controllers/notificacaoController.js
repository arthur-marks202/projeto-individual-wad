const { notificacao } = require('../models');

// ✅ 1. Função para enviar uma nova notificação
exports.enviarNotificacao = async (id_usuario, tipo, mensagem, id_reserva = null) => {
  try {
    await notificacao.create({
      id_usuario,
      tipo_notificacao: tipo,
      mensagem,
      id_reserva
    });
  } catch (erro) {
    console.error('Erro ao enviar notificação:', erro);
  }
};

// ✅ 2. Listar notificações por usuário
exports.listarNotificacoesPorUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const notificacoes = await notificacao.findByUsuario(id_usuario);

    res.status(200).json(notificacoes);
  } catch (erro) {
    console.error('Erro ao listar notificações:', erro);
    res.status(500).json({ erro: 'Erro ao buscar notificações do usuário.' });
  }
};

// ✅ 3. Marcar notificação como visualizada
exports.marcarComoVisualizada = async (req, res) => {
  try {
    const id_notificacao = req.params.id;
    const resultado = await notificacao.marcarComoVisualizada(id_notificacao);

    if (!resultado) {
      return res.status(404).json({ mensagem: 'Notificação não encontrada.' });
    }

    res.status(200).json({ mensagem: 'Notificação marcada como visualizada.' });
  } catch (erro) {
    console.error('Erro ao marcar notificação como visualizada:', erro);
    res.status(500).json({ erro: 'Erro ao atualizar notificação.' });
  }
};
