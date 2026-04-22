import express from "express";
import {
  criarPartida,
  listarPartidas,
  atualizarPartida,
  deletarPartida
} from "../controllers/partidasController.js";

const router = express.Router();

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
 * /partidas:
 *   post:
 *     summary: Criar partida
 *     tags: [Partidas]
 */
router.post("/", criarPartida);

/**
 * @swagger
 * /partidas/{id}:
 *   put:
 *     summary: Atualizar partida
 *     tags: [Partidas]
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