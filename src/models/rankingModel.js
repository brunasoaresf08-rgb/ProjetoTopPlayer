import { pool } from "../config/db.js";

export async function rankingGeral(limite = 10) {
  const [rows] = await pool.query(`
    SELECT 
      players.id AS player_id,
      players.nickname,
      SUM(partidas.pontos) AS total_pontos
    FROM partidas
    JOIN players ON players.id = partidas.player_id
    GROUP BY players.id
    ORDER BY total_pontos DESC
    LIMIT ?
  `, [Number(limite)]);

  return rows;
}

export async function rankingPorJogo(jogo_id, limite = 10) {
  const [rows] = await pool.query(`
    SELECT 
      players.id AS player_id,
      players.nickname,
      SUM(partidas.pontos) AS total_pontos
    FROM partidas
    JOIN players ON players.id = partidas.player_id
    WHERE partidas.jogo_id = ?
    GROUP BY players.id
    ORDER BY total_pontos DESC
    LIMIT ?
  `, [jogo_id, Number(limite)]);

  return rows;
}