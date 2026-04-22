import {
  buscarRankingGeral,
  buscarRankingPorJogo
} from "../models/rankingModel.js";

// GET /rankings/geral
export async function getRankingGeral(req, res) {
  try {
    const { limite } = req.query;

    const ranking = await buscarRankingGeral(limite);

    res.status(200).json(ranking);
  } catch (error) {
    console.error("Erro no ranking geral:", error);
    res.status(500).json({ erro: "Erro ao buscar ranking geral" });
  }
}

// GET /rankings/jogo/:jogo_id
export async function getRankingPorJogo(req, res) {
  try {
    const { jogo_id } = req.params;
    const { limite } = req.query;

    const ranking = await buscarRankingPorJogo(jogo_id, limite);

    res.status(200).json(ranking);
  } catch (error) {
    console.error("Erro no ranking por jogo:", error);
    res.status(500).json({ erro: "Erro ao buscar ranking por jogo" });
  }
}