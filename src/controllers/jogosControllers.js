import {pool}  from "../config/db.js";

export async function listarJogos (req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM jogos");
    res.json(rows);
  }catch (error) {
    res.status(500).json({ erro: "Erro ao listar jogos" });
  }
};

export async function buscarJogo (req, res) {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM jogos WHERE id = ?",
      [id]
    );
    if (!rows.length) {
      return res.status(404).json({ erro: "Jogo não encontrado" });
    }
    res.json(rows[0]);
  }catch (error) {
    res.status(500).json({ erro: "Erro ao buscar jogo" });
  }
};

export async function criarJogo (req, res) {
  try {
    const { nome, genero } = req.body;
    const [result] = await pool.query(
      "INSERT INTO jogos (nome, genero) VALUES (?, ?)",
      [nome, genero]
    );
    res.status(201).json({ id: result.insertId });
  }catch (error) {
    res.status(500).json({ erro: "Erro ao criar jogo" });
  }
};

export async function atualizarJogo (req, res) {
  try {
    const { id } = req.params;
    const { nome, genero } = req.body;

    await pool.query(
      "UPDATE jogos SET nome = ?, genero = ? WHERE id = ?",
      [nome, genero, id]
    );
    res.json({ mensagem: "Jogo atualizado" });
  }catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar jogo" });
  }
};

export async function deletarJogo (req, res) {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM jogos WHERE id = ?", [id]);
    res.json({ mensagem: "Jogo deletado" });
  }catch (error) {
    res.status(500).json({ erro: "Erro ao deletar jogo" });
  }
};