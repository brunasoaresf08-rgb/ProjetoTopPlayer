import * as usuarioModel from "../models/usuarioModel.js";
import crypto from "crypto";

export async function listar(req, res) {
    const usuario = await usuarioModel.listarUsuarios();
    res.status(200).json(usuario);

}

export async function buscarPorId(req, res) {
    const { id } = req.params;
    const usuario = await usuarioModel.buscarUsuarioPorId(id);
  

    if (!usuario) {
        res.status(404).json({ msg: "Usuário não encontrado" });
    }

      res.status(200).json(usuario); 

}

export async function criar(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ msg: "Nome, email e senha são obrigatórios" });

    }

    const senha_hash = crypto.createHash("sha256").update(senha).digest("hex");
    const id = await usuarioModel.criarUsuario({ nome, email, senha_hash });

    return res.status(201).json({ msg: "Usuário criado com sucesso" });
}

export async function login(req, res) {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ msg: "Email e senha são obrigatórios" });
    }

    const usuario = await usuarioModel.buscarUsuarioPorEmail(email);

    if (!usuario) {
        return res.status(404).json({ msg: "Credenciais não encontrado" });

    }
    const senha_hash = crypto.createHash("sha256").update(senha).digest("hex");

    if (senha_hash !== usuario.senha_hash) {
        return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const token = crypto.randomBytes(24).toString("hex");

    return res.status(200).json({msg: "Login realizado com sucesso", token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    });

}

export async function atualizarusuarios(req, res) {
    const {id } = req.params;
    const { nome, email, senha } = req.body;

    if ( !nome || !email || !senha) {
        return res.status(400).json({ msg: "Nome, email e senha são obrigatórios" });
    }

    const usuario = await usuarioModel.buscarUsuarioPorId(id);

    if (!usuario) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const senha_hash = crypto.createHash("sha256").update(senha).digest("hex");
    const atualizado = await usuarioModel.atualizarusuarios(id, { nome, email, senha_hash });

    if (!atualizado) {
        return res.status(500).json({ msg: "Falha ao atualizar usuário" });
    }

    return res.status(200).json({ msg: "Usuário atualizado com sucesso" });
}

export async function deletarusuarios(req, res) {
    const {id} = req.params;

    const usuario = await usuarioModel.buscarUsuarioPorId(id);

    if (!usuario) {
        return res.status(404).json ({ msg : "Usuário não encontrado"});
    }

    const deletado = await usuarioModel.deletarusuarios(id);

    if (!deletado) {
        return res.status(500).json({ msg: "Falha ao deletar usuário" });
    }

    return res.status(200).json({ msg :"Usuário deletado com sucesso!"});
}