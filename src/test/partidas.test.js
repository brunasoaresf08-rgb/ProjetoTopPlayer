import request from "supertest";
import app from "../app.js";
import { pool } from "../config/db.js";

let jogoId;
let playerId;
let partidaId;

beforeAll(async () => {
  // limpa banco pra não dar conflito
  await pool.query("SET FOREIGN_KEY_CHECKS = 0");
  await pool.query("TRUNCATE TABLE partidas");
  await pool.query("TRUNCATE TABLE jogos");
  await pool.query("TRUNCATE TABLE players");
  await pool.query("SET FOREIGN_KEY_CHECKS = 1");

  // cria jogo com nome único
  const nomeJogo = `Jogo ${Date.now()}-${Math.random()}`;
  const nomePlayer = `Player ${Date.now()}-${Math.random()}`;

  const [jogoResult] = await pool.query(
    "INSERT INTO jogos (nome, genero) VALUES (?, ?)",
    [nomeJogo, "Sports"]
  );

  const [playerResult] = await pool.query(
    "INSERT INTO players (nickname) VALUES (?)",
    [nomePlayer]
  );

  jogoId = jogoResult.insertId;
  playerId = playerResult.insertId;

  // cria partida via API
  const res = await request(app)
    .post("/partidas")
    .send({
      player_id: playerId,
      jogo_id: jogoId,
      pontos: 100
    });

  // DEBUG (se der erro você vai ver aqui)
  console.log("POST /partidas response:", res.body);

  // pega ID de forma segura (porque sua API pode variar)
  partidaId =
    res.body.id ||
    res.body.insertId ||
    res.body.partida_id;

  if (!partidaId) {
    throw new Error("❌ partidaId não foi retornado pela API. Verifique o POST /partidas");
  }
});

afterAll(async () => {
  await pool.end();
});

test("PUT /partidas/:id deve atualizar uma partida", async () => {
  const response = await request(app)
    .put(`/partidas/${partidaId}`)
    .send({ pontos: 2000 });

  console.log("PUT response:", response.body);

  expect(response.statusCode).toBe(200);
});

test("DELETE /partidas/:id deve remover a partida", async () => {
  const response = await request(app)
    .delete(`/partidas/${partidaId}`);

  console.log("DELETE response:", response.body);

  expect(response.statusCode).toBe(200);
});