import request from "supertest";
import app from "../app.js";
import { pool } from "../config/db.js";

let jogoId;
let playerId;

beforeAll(async () => {
  const [jogo] = await pool.query(
    "INSERT INTO jogos (nome, genero) VALUES (?, ?)",
    ["Jogo Ranking", "acao"]
  );
  jogoId = jogo.insertId;

  const [player] = await pool.query(
    "INSERT INTO players (nickname) VALUES (?)",
    ["Player Ranking"]
  );
  playerId = player.insertId;

  await pool.query(
    "INSERT INTO partidas (player_id, jogo_id, pontos) VALUES (?, ?, ?)",
    [playerId, jogoId, 100]
  );
});

test("GET /rankings/geral deve retornar ranking", async () => {
  const res = await request(app).get("/rankings/geral");

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test("GET /rankings/jogo/:jogo_id deve retornar ranking por jogo", async () => {
  const res = await request(app).get(`/rankings/jogo/${jogoId}`);

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});