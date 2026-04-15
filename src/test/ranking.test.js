// import request from "supertest";
// import app from "../app.js";
// import { pool } from "../config/db.js";

// let jogoId;

// beforeAll(async () => {
//   await pool.query("SET FOREIGN_KEY_CHECKS = 0");
//   await pool.query("TRUNCATE TABLE jogos");
//   await pool.query("SET FOREIGN_KEY_CHECKS = 1");

//   const nomeJogo = `Jogo ${Date.now()}-${Math.random()}`;

//   const [result] = await pool.query(
//     "INSERT INTO jogos (nome, genero) VALUES (?, ?)",
//     [nomeJogo, "Sports"]
//   );

//   jogoId = result.insertId;
// });

// afterAll(async () => {
//   await pool.end();
// });

// test("GET /rankings/geral deve retornar ranking", async () => {
//   const response = await request(app).get("/rankings/geral");

//   expect(response.statusCode).toBe(200);
//   expect(Array.isArray(response.body)).toBe(true);
// });

// test("GET /rankings/jogo/:id deve retornar ranking por jogo", async () => {
//   const response = await request(app).get(`/rankings/jogo/${jogoId}`);

//   expect(response.statusCode).toBe(200);
// });