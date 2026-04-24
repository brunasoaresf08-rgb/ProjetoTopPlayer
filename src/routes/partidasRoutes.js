import { Router } from "express";
import {
    listarPartidas,
    buscarPartidaPorId,
    criarPartida,
    atualizarPartida,
    deletarPartida
} from "../controllers/partidasControllers.js";

const router = Router();

/**
 * @swagger
 * /partidas:
 *   get:
 *     summary: Listar partidas
 *     tags: [Partidas]
 */
router.get("/", listarPartidas);

/**
 * @swagger
 * /partidas/{id}:
 *   get:
 *     summary: Buscar partida por ID
 *     tags: [Partidas]
 */
router.get("/:id", buscarPartidaPorId);

/**
 * @swagger
 * /partidas:
 *   post:
 *     summary: Criar partida
 *     tags: [Partidas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [jogo_id, player_id, pontos]
 *             properties:
 *               jogo_id:
 *                 type: integer
 *               player_id:
 *                 type: integer
 *               pontos:
 *                 type: integer
 */
router.post("/", criarPartida);

/**
 * @swagger
 * /partidas/{id}:
 *   put:
 *     summary: Atualizar partida
 *     tags: [Partidas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pontos:
 *                 type: integer
 */
router.put("/:id", atualizarPartida);

/**
 * @swagger
 * /partidas/{id}:
 *   delete:
 *     summary: Deletar partida
 *     tags: [Partidas]
 */
router.delete("/:id", deletarPartida);

export default router;