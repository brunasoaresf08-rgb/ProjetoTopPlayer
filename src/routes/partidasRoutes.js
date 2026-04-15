import express from "express";
import {
  criarPartida,
  listarPartidas,
  buscarPartidaPorId,
  atualizarPartida,
  deletarPartida
} from "../controllers/partidasControllers.js";

const router = express.Router();

router.post("/", criarPartida);
router.get("/", listarPartidas);
router.get("/:id", buscarPartidaPorId);
router.put("/:id", atualizarPartida);
router.delete("/:id", deletarPartida);

export default router;