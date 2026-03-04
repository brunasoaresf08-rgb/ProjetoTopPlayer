import * as usuarioModel from "../models/usuarioModel.js";
import crypto from "crypto";

export async function listar(req, res) {
    const usuarios = await usuarioModel.listarUsuarios();
    res.json(usuarios);
}

export async function buscarPorId(req, res) {
    const usuario = await usuarioModel.buscarPorId(req.params.id);

    if(!usuario){
        return res.status(404).json({msg: "Usuário não encontrado."})
    }
    res.json(usuario);
}

export async function criar(req, res) {
    const {nome, email, senha} = req.body;
    if(!nome || !email || !senha) {
        return res.status(400).json({
            msg: "Nome, email e senha são obrigatórios."
        })
    }
    const senha_hash = crypto.createHash("sha256").update(senha)
    .digest("hex");

    const id = await usuarioModel.criarUsuario({
        nome, email, senha_hash
    })
    return res.status(201).json({msg: "Usuário criado com sucesso!", id})
}

export async function deletar(req, res) {
    const {id} = req.params;
    if(!id) {
        return res.status(400).json({msg: "Informe o ID."})
    }
    const usuario = await usuarioModel.buscarPorId(id);
    if(!usuario) {
        return res.status(404).json({msg: "Usuário não encontrado."})
    }
    await usuarioModel.deletarUsuario(id);
    return res.status(200).json({msg: "Usuário deletado com sucesso!"})
}

export async function login(req, res) {
    const {email, senha} = req.body;
    if(!email || !senha) {
        return res.status(400).json({
            msg: "Email e senha são obrigatórios."
        })
    }
    const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
    if(!usuario){
        return res.status(400).json({msg:
            "Credeniais invalidas."
        })
    }
    const senha_hash = crypto.createHash("sha256").update(senha)
    .digest("hex");
    if(senha_hash !== usuario.senha_hash) {
        return res.status(400).json({msg:
            "Credenciais Invalidas."
        })
    }
    const token = crypto.randomBytes(24).toString("hex");
    return res.status(200).json({
        msg: "Login realizado com sucesso!",
        token,
        usuario:{
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    })
}