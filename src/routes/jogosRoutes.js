import express from "express";
import {
  criarJogo,
  listarJogos,
  buscarJogoPorId,
  atualizarJogo,
  deletarJogo
} from "../controllers/jogosController.js";

const router = express.Router();

/**
 * @swagger
 * /jogos:
 *   get:
 *     summary: Listar todos os jogos
 *     tags: [Jogos]
 *     responses:
 *       200:
 *         description: Lista de jogos
 */
router.get("/", listarJogos);

/**
 * @swagger
 * /jogos/{id}:
 *   get:
 *     summary: Buscar jogo por ID
 *     tags: [Jogos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jogo encontrado
 */
router.get("/:id", buscarJogoPorId);

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
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Jogo criado
 */
router.post("/", criarJogo);

/**
 * @swagger
 * /jogos/{id}:
 *   put:
 *     summary: Atualizar jogo
 *     tags: [Jogos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jogo atualizado
 */
router.put("/:id", atualizarJogo);

/**
 * @swagger
 * /jogos/{id}:
 *   delete:
 *     summary: Deletar jogo
 *     tags: [Jogos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jogo deletado
 */
router.delete("/:id", deletarJogo);

export default router;