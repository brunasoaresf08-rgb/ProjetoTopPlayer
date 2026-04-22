import request from "supertest";
import app from "../app.js";
import { pool } from "../config/db.js"; 

describe("Testes da API de Jogos", () => {
  let jogoId;

  beforeAll(async () => {
   
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jogos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        genero VARCHAR(255) NOT NULL
      )
    `);
  });

  test("POST /jogos deve criar um novo jogo", async () => {
    const novoJogo = {
      nome: "Fall Guys",
      genero: "Battle Royale"
    };

    const response = await request(app)
      .post("/jogos")
      .send(novoJogo);

    expect(response.statusCode).toBe(201);
    expect(response.body.mensagem).toBe("Jogo criado com sucesso!");

    jogoId = response.body.id;
  });

  test("GET /jogos deve listar jogos", async () => {
    const response = await request(app).get("/jogos");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

test("GET /jogos/:id deve retornar um jogo", async () => {
  const response = await request(app).get(`/jogos/${jogoId}`);

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("id");

  expect(Number(response.body.id)).toBe(Number(jogoId));
});

  test("PUT /jogos/:id deve atualizar um jogo", async () => {
    const dadosAtualizados = {
      nome: "Free Fire",
      genero: "Battle Royale"
    };

    const response = await request(app)
      .put(`/jogos/${jogoId}`)
      .send(dadosAtualizados);

    expect(response.statusCode).toBe(200);
  });

  test("DELETE /jogos/:id deve remover o jogo", async () => {
    const response = await request(app).delete(`/jogos/${jogoId}`);

    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {

    await pool.end();
  });
  
});