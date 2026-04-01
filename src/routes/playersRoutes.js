import express from "express";
import {
  listarPlayers,
  buscarPlayer,
  criarPlayer,
  atualizarPlayer,
  deletarPlayer
} from "../controllers/playersControllers.js";

const router = express.Router();


router.get("/", listarPlayers);
router.get("/:id", buscarPlayer);
router.post("/", criarPlayer);
router.put("/:id", atualizarPlayer);
router.delete("/:id", deletarPlayer);

export default router;