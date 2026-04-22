import express from "express";
import {
  getRankingGeral,
  getRankingPorJogo
} from "../controllers/rankingControllers.js";

const router = express.Router();

/**
 * @swagger
 * /rankings/geral:
 *   get:
 *     summary: Ranking geral dos jogadores
 *     tags: [Ranking]
 *     responses:
 *       200:
 *         description: Ranking geral
 */
router.get("/geral", getRankingGeral);

/**
 * @swagger
 * /rankings/jogo/{jogo_id}:
 *   get:
 *     summary: Ranking por jogo
 *     tags: [Ranking]
 */
router.get("/jogo/:jogo_id", getRankingPorJogo);

export default router;