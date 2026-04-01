import express from "express";
import {
    listarUsuarios,
    atualizarUsuario,
    buscarPorId,
    criarUsuario,
    loginDoUsuario,
    
    deletarusuarios
} from "../controllers/usuarioController.js";

const route = express.Router();

route.post("/login", loginDoUsuario);
route.get("/", listarUsuarios);
route.put("/:id", atualizarUsuario);
route.get("/:id", buscarPorId);
route.post("/", criarUsuario);


route.delete("/:id", deletarusuarios);

export default route;