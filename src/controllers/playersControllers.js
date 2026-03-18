import * as playersModel from "../models/playersModels.js";


export async function listarPlayers(req, res) {
    const players = await playersModel.listarPlayers();
    res.status(200).json(players);
}


export async function BuscarPlayerPorId(req, res) {
    const { id } = req.params;
    const player = await playersModel.BuscarPlayerPorId(id);

    if (!player) {
        res.status(404).json({ msg: "Player não encontrado" });
    }
    
    res.status(200).json(player);
}



export async function criarPlayer(req, res) {
    const { nickname, plataforma } = req.body;

    if (!nickname || !plataforma) {
        return res.status(400).json({ msg: "Nickname e plataforma são obrigatórios" });
    }

    try {
        const novoId = await playersModel.criarPlayer({ nickname, plataforma });
        return res.status(201).json({
            msg: "Player cadastrado com sucesso",
            id: novoId,
        });
    } catch (erro) {
        console.error("Erro ao cadastrar player:", erro);
        return res.status(500).json({ msg: "Erro interno ao cadastrar o player" });
    }
}


export async function atualizarPlayer(req, res) {
    const { id } = req.params;
    const { nickname, plataforma } = req.body;

    if (!nickname || !plataforma) {
        return res.status(400).json({ msg: "Nickname e plataforma são obrigatórios" });
    }

    const player = await playersModel.BuscarPlayerPorId(id);

    if (!player) {
        return res.status(404).json({ msg: "Player não encontrado" });
    }

    const atualizado = await playersModel.atualizarPlayer(id, { nickname, plataforma });

    if (!atualizado) {
        return res.status(500).json({ msg: "Não foi possível atualizar o player" });
    }

    return res.status(200).json({ msg: "Player atualizado com sucesso" });
}

export async function deletarPlayer(req, res) {
    const { id } = req.params;

    const player = await playersModel.BuscarPlayerPorId(id);

    if (!player) {
        return res.status(404).json({ msg: "Player não encontrado" });
    }

    const deletado = await playersModel.deletarPlayer(id);

    if (!deletado) {
        return res.status(500).json({ msg: "Não foi possível deletar o player" });
    }

    return res.status(200).json({ msg: "Player deletado com sucesso" });
}