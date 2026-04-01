import request from 'supertest';
import app from '../app.js';

describe('Testes da API de Jogos', () => {
  let jogoId;

  test('POST /jogos deve criar um novo jogo', async () => {
    const novoJogo = {
      nome: "Free Fire"
    };

    const response = await request(app)
      .post('/jogos')
      .send(novoJogo);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');

    jogoId = response.body.id;
  });

  test('GET /jogos deve listar jogos', async () => {
    const response = await request(app)
      .get('/jogos');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /jogos/:id deve retornar um jogo', async () => {
    const response = await request(app)
      .get(`/jogos/${jogoId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  test('PUT /jogos/:id deve atualizar um jogo', async () => {
    const dadosAtualizados = {
      nome: "Free Fire Atualizado"
    };

    const response = await request(app)
      .put(`/jogos/${jogoId}`)
      .send(dadosAtualizados);

    expect(response.statusCode).toBe(200);
    expect(response.body.mensagem).toBe("Jogo atualizado com sucesso");
  });

  test('DELETE /jogos/:id deve remover o jogo', async () => {
    const response = await request(app)
      .delete(`/jogos/${jogoId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.mensagem).toBe("Jogo deletado com sucesso");
  });
});