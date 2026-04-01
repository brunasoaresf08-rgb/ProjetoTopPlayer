import express from "express";
import {
  listarJogos,
  buscarJogo,
  criarJogo,
  atualizarJogo,
  deletarJogo
} from "../controllers/jogosControllers.js"; 

const router = express.Router();

router.get("/", listarJogos);
router.get("/:id", buscarJogo);
router.post("/", criarJogo);
router.put("/:id", atualizarJogo);
router.delete("/:id", deletarJogo);

export default router;