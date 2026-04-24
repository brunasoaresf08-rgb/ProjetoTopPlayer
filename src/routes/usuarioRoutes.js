import express from "express";
import {
  criarUsuario,
  loginUsuario,
  atualizarUsuario,
  deletarUsuario,
  listarUsuarios,
  buscarUsuarioPorId
} from "../controllers/usuarioController.js";

const router = express.Router();


/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get("/", listarUsuarios);


/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     tags: [Usuarios]
 */
router.get("/:id", buscarUsuarioPorId);


/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Criar usuário
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 */
router.post("/", criarUsuario);


/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Usuarios]
 */
router.post("/login", loginUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualizar usuário
 *     tags: [Usuarios]
 */
router.put("/:id", atualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deletar usuário
 *     tags: [Usuarios]
 */
router.delete("/:id", deletarUsuario);

export default router;