import express from "express";
import {
  criarPlayer,
  listarPlayers,
  buscarPlayer,
  atualizarPlayer,
  deletarPlayer
} from "../controllers/playersController.js";

const router = express.Router();

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Listar players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Lista de players
 */
router.get("/", listarPlayers);

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Buscar player por ID
 *     tags: [Players]
 */
router.get("/:id", buscarPlayer);

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Criar player
 *     tags: [Players]
 */
router.post("/", criarPlayer);

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Atualizar player
 *     tags: [Players]
 */
router.put("/:id", atualizarPlayer);

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Deletar player
 *     tags: [Players]
 */
router.delete("/:id", deletarPlayer);

export default router;