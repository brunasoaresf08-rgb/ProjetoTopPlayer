import { pool } from "../config/db.js";

export async function listarUsuarios() {
    const [rows] = await pool.query(
        "SELECT id, nome, email, criado_em FROM usuarios"
    );
    return rows;
}

export async function buscarUsuarioPorId(id) {
    const [rows] = await pool.query(
        "SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?",
        [id]
    );
    return rows[0];
}

export async function buscarUsuarioPorEmail(email) {
    const [rows] = await pool.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
    );
    return rows[0];
}

export async function criarUsuario({ nome, email, senha_hash }) {
    const [result] = await pool.query(
        "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)",
        [nome, email, senha_hash]
    );
    return result.insertId;
}

export async function atualizarUsuario(id, { nome, email, senha_hash }) {
    const [result] = await pool.query(
        "UPDATE usuarios SET nome = ?, email = ?, senha_hash = ? WHERE id = ?",
        [nome, email, senha_hash, id]
    );
    return result.affectedRows > 0;
}

export async function deletarUsuario(id) {
    const [result] = await pool.query(
        "DELETE FROM usuarios WHERE id = ?",
        [id]
    );
    return result.affectedRows > 0;
}