import express from "express";
import {
  criarPlayer,
  listarPlayers,
  buscarPlayer,
  atualizarPlayer,
  deletarPlayer
} from "../controllers/playersControllers.js";

const router = express.Router();

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Listar players
 *     tags: [Players]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nickname, plataforma]
 *             properties:
 *               nickname:
 *                 type: string
 *               plataforma:
 *                 type: string
 */
router.post("/", criarPlayer);

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Atualizar player
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               plataforma:
 *                 type: string
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