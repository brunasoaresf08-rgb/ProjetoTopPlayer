import {Router} from "express";
import * as usuariosController from "../controllers/usuarioController.js";

const router = Router();

router.post("/login", usuariosController.login);
router.get("/", usuariosController.listar);
router.get("/:id", usuariosController.buscarPorId);
router.post("/", usuariosController.criar);
router.delete("/:id", usuariosController.deletar);

export default router;