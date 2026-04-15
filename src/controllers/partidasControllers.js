import { pool } from "../config/db.js";

export async function criarPartida(req, res) {
  try {
    const { jogo_id, player_id, pontos } = req.body;

    if (!jogo_id || !player_id || pontos == null) {
      return res.status(400).json({ erro: "Dados incompletos" });
    }

    const [result] = await pool.query(
      `INSERT INTO partidas (jogo_id, player_id, pontos, data_partida)
       VALUES (?, ?, ?, NOW())`,
      [jogo_id, player_id, pontos]
    );

    res.status(201).json({
      mensagem: "Partida criada com sucesso!",
      id: result.insertId
    });

  } catch (error) {
    console.error("ERRO:", error);
    res.status(500).json({ erro: "Erro ao criar partida" });
  }
}

export async function listarPartidas(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM partidas");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar partidas" });
  }
}

export async function buscarPartidaPorId(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM partidas WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Partida não encontrada" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar partida" });
  }
}

export const atualizarPartida = async (req, res) => {
  try {
    const { id } = req.params;
    const { pontos } = req.body;

    const [result] = await pool.query(
      "UPDATE partidas SET pontos = ? WHERE id = ?",
      [pontos, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Partida não encontrada" });
    }

    return res.status(200).json({ mensagem: "Partida atualizada com sucesso!" });

  } catch (err) {
    console.error("ERRO UPDATE PARTIDA:", err); // 🔥 IMPORTANTE
    return res.status(500).json({ erro: err.message });
  }
};

export async function deletarPartida(req, res) {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM partidas WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Partida não encontrada" });
    }

    res.status(200).json({
      msg: "Partida deletada com sucesso!"
    });

  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar partida" });
  }
}