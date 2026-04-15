import express from "express";
import {
  getRankingGeral,
  getRankingPorJogo
} from "../controllers/rankingController.js";

const router = express.Router();

router.get("/rankings/geral", getRankingGeral);
router.get("/rankings/jogo/:jogo_id", getRankingPorJogo);

export default router;