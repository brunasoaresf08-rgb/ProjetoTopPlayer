import {pool} from "../config/db.js";

export async function listarPlayers (req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM players");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar players" });
  }
};

export async function buscarPlayer (req, res) {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM players WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Player não encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar player" });
  }
};

export async function criarPlayer (req, res){
  try {
    const { nickname, plataforma } = req.body;

    const [result] = await pool.query(
      "INSERT INTO players (nickname, plataforma) VALUES (?, ?)",
      [nickname, plataforma]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar player" });
  }
};

export async function atualizarPlayer (req, res) {
  try {
    const { id } = req.params;
    const { nickname, plataforma } = req.body;

    const [result] = await pool.query(
      "UPDATE players SET nickname = ?, plataforma = ? WHERE id = ?",
      [nickname, plataforma, id]
    );

    res.json({ mensagem: "Player atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar player" });
  }
};

export async function deletarPlayer (req, res) {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM players WHERE id = ?", [id]);

    res.json({ mensagem: "Player deletado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar player" });
  }
};