import { pool } from "../config/db.js";

// Ranking geral
export async function buscarRankingGeral(limite = 10) {
  const [rows] = await pool.query(`
    SELECT 
      players.id,
      players.nickname,
      COALESCE(SUM(partidas.pontos), 0) AS total_pontos
    FROM players
    LEFT JOIN partidas ON players.id = partidas.player_id
    GROUP BY players.id
    ORDER BY total_pontos DESC
    LIMIT ?
  `, [Number(limite)]);

  return rows;
}

// Ranking por jogo
export async function buscarRankingPorJogo(jogo_id, limite = 10) {
  const [rows] = await pool.query(`
    SELECT 
      players.id,
      players.nickname,
      COALESCE(SUM(partidas.pontos), 0) AS total_pontos
    FROM partidas
    JOIN players ON players.id = partidas.player_id
    WHERE partidas.jogo_id = ?
    GROUP BY players.id
    ORDER BY total_pontos DESC
    LIMIT ?
  `, [jogo_id, Number(limite)]);

  return rows;
}