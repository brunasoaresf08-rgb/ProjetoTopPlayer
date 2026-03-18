import { conexao } from "../config/db.js";

export async function listarPlayers() {
    const [resultado] = await conexao.query(
        "SELECT id, nickname, plataforma, criado_em FROM players"
    );
    return resultado;
}

export async function BuscarPlayerPorId(id) {
    const [resultado] = await conexao.query(
        "SELECT id, nickname, plataforma, criado_em FROM players WHERE id = ?", [id]
    );
    return resultado[0];
}

export async function criarPlayer({ nickname, plataforma }) {
    const [resultado] = await conexao.query(
        "INSERT INTO players (nickname, plataforma) VALUES (?, ?)", [nickname,plataforma]
    );
    return resultado.insertId;
}

export async function atualizarPlayer(id, { nickname, plataforma }) {
    const [resultado] = await conexao.query(
        "UPDATE players SET nickname = ?, plataforma = ? WHERE id = ?", [nickname, plataforma, id]
    );
    return resultado.affectedRows > 0;
}

export async function deletarPlayer(id) {
    const [resultado] = await conexao.query(
        "DELETE FROM players WHERE id = ?", [id]
    );
    return resultado.affectedRows > 0;
}