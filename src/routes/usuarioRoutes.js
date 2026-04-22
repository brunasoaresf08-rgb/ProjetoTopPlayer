import express from "express";
import {
  criarUsuario,
  loginUsuario,
  atualizarUsuario,
  deletarUsuario,
  listarUsuarios,
  buscarUsuarioPorId
} from "../controllers/usuarioController.js";

const router = express.Router();


router.get("/", listarUsuarios);
router.get("/:id", buscarUsuarioPorId);
router.post("/", criarUsuario);
router.post("/login", loginUsuario);
router.put("/:id", atualizarUsuario);
router.delete("/:id", deletarUsuario);

export default router;