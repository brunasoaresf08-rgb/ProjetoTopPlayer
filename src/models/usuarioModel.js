import { pool } from "../config/db.js";

export async function listarUsuarios() {
    const [resultado] = await pool.query(
        "SELECT id, nome, senha_hash, email, criado_em FROM usuarios"
    );
    return resultado;
}

export async function buscarUsuarioPorId(id) {
    const [resultado] = await pool.query(
        "SELECT id, nome, senha_hash, email, criado_em FROM usuarios WHERE id = ?", [id]
    );
    return resultado[0];
} 

export async function criarUsuario({nome, email, senha_hash}) {
    const [resultado] = await pool.query(
        "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)", [nome, email, senha_hash]
    );
    return resultado.insertId;
}

export async function buscarUsuarioPorEmail(email) {
    const [resultado] = await pool.query(
        "SELECT id, nome, senha_hash, email, criado_em FROM usuarios WHERE email = ?", [email]
    );
    return resultado[0];
} 

export async function atualizarusuarios(id, {nome, email, senha_hash}) {
    const [resultado] = await pool.query (
        "UPDATE usuarios SET nome = ?, email = ?, senha_hash = ? WHERE id = ?", [nome, email, senha_hash, id]
    );

    return resultado.affectedRows > 0;
}

export async function deletarusuarios(id) {
    const [resultado] = await pool.query (

        "DELETE FROM usuarios WHERE id = ?", [id]
    );
    
    return resultado.affectedRows > 0;
    
}