import express from "express";
import {
  criarJogo,
  listarJogos,
  buscarJogoId,
  atualizarJogo,
  deletarJogo
} from "../controllers/jogosControllers.js"; 

const router = express.Router();

/**
 * @swagger
 * /jogos:
 *   get:
 *     summary: Listar jogos
 *     tags: [Jogos]
 */
router.get("/", listarJogos);

/**
 * @swagger
 * /jogos/{id}:
 *   get:
 *     summary: Buscar jogo por ID
 *     tags: [Jogos]
 */

router.get("/:id", buscarJogoId);

/**
 * @swagger
 * /jogos:
 *   post:
 *     summary: Criar jogo
 *     tags: [Jogos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, genero]
 *             properties:
 *               nome:
 *                 type: string
 *               genero:
 *                 type: string
 */
router.post("/", criarJogo);

/**
 * @swagger
 * /jogos/{id}:
 *   put:
 *     summary: Atualizar jogo
 *     tags: [Jogos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               genero:
 *                 type: string
 */
router.put("/:id", atualizarJogo);

/**
 * @swagger
 * /jogos/{id}:
 *   delete:
 *     summary: Deletar jogo
 *     tags: [Jogos]
 */
router.delete("/:id", deletarJogo);

export default router;