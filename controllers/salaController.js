const { sala } = require('../models');

// ✅ Listar todas as salas
exports.listarSalas = async (req, res) => {
  try {
    const salas = await sala.findAll();
    res.status(200).json(salas);
  } catch (erro) {
    console.error('Erro ao listar salas:', erro);
    res.status(500).json({ erro: 'Erro ao buscar salas.' });
  }
};

// ✅ Buscar uma sala por ID
exports.buscarSalaPorId = async (req, res) => {
  try {
    const salaEncontrada = await sala.findByPk(req.params.id);

    if (!salaEncontrada) {
      return res.status(404).json({ mensagem: 'Sala não encontrada.' });
    }

    res.status(200).json(salaEncontrada);
  } catch (erro) {
    console.error('Erro ao buscar sala:', erro);
    res.status(500).json({ erro: 'Erro ao buscar sala.' });
  }
};
