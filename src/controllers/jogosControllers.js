import { pool } from "../config/db.js";

export async function criarJogo(req, res) {
  try {
    const { nome, genero } = req.body;

    if (!nome || !genero) {
      return res.status(400).json({ erro: "Dados incompletos" });
    }

    const [result] = await pool.query(
      "INSERT INTO jogos (nome, genero) VALUES (?, ?)",
      [nome, genero]
    );

    res.status(201).json({
      mensagem: "Jogo criado com sucesso!",
      id: result.insertId
    });

  } catch (error) {
    console.error("ERRO:", error);
    res.status(500).json({ erro: "Erro ao criar jogo" });
  }
}
export async function listarJogos(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM jogos");

    res.status(200).json(rows);

  } catch (error) {
    console.error("ERRO:", error);
    res.status(500).json({ erro: "Erro ao listar jogos" });
  }
}
export async function buscarJogo(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM jogos WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Jogo não encontrado" });
    }

    res.status(200).json(rows[0]);

  } catch (error) {
    console.error("ERRO:", error);
    res.status(500).json({ erro: "Erro ao buscar jogo" });
  }
}

export async function atualizarJogo(req, res) {
  try {
    const { id } = req.params;
    const { nome, genero } = req.body;

    const [result] = await pool.query(
      "UPDATE jogos SET nome = ?, genero = ? WHERE id = ?",
      [nome, genero, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Jogo não encontrado" });
    }

    res.status(200).json({
      msg: "Jogo atualizado com sucesso"
    });

  } catch (error) {
    console.error("ERRO:", error);
    res.status(500).json({ erro: "Erro ao atualizar jogo" });
  }
}

export async function deletarJogo(req, res) {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM jogos WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Jogo não encontrado" });
    }

    res.status(200).json({
      msg: "Jogo deletado com sucesso!"
    });

  } catch (error) {
    console.error("ERRO:", error);
    res.status(500).json({ erro: "Erro ao deletar jogo" });
  }
}