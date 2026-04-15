import { rankingGeral, rankingPorJogo } from '../models/rankingModel.js';

export async function getRankingGeral(req, res) {
  try {
    const { limite } = req.query;

    const dados = await rankingGeral(limite);

    res.status(200).json(dados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro no ranking geral' });
  }
}

export async function getRankingPorJogo(req, res) {
  try {
    const { jogo_id } = req.params;
    const { limite } = req.query;

    const dados = await rankingPorJogo(jogo_id, limite);

    res.status(200).json(dados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro no ranking por jogo' });
  }
}