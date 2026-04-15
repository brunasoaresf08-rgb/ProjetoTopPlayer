import request from 'supertest';
import app from '../app.js';


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


describe('Testes da API de Players', () => {
    let playerID; 

    test('POST /players deve criar um novo player', async () => {
        const novoPlayer = {
            nickname: "xitado",
            plataforma: "PC"
        };

        const response = await request(app)
            .post('/players')
            .send(novoPlayer);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
       
        playerID = response.body.id; 
    });

    test('PUT /players/:id deve atualizar um player existente', async () => {
      
        const dadosAtualizados = {
            nickname: "novoNickname",
            plataforma: "PC"    
        };

        const response = await request(app)
            .put(`/players/${playerID}`)
            .send(dadosAtualizados);

        expect(response.statusCode).toBe(200);
        expect(response.body.mensagem).toBe("Player atualizado com sucesso");
    });

     test('POST /players deve criar um player', async () => {
    const response = await request(app)
      .post('/players')
      .send({
        nickname: "Teste",
        plataforma: "PC"
      });

    expect(response.statusCode).toBe(201);
    playerId = response.body.id;
  });

  test('PUT /players/:id deve atualizar', async () => {
    const response = await request(app)
      .put(`/players/${playerId}`)
      .send({
        nickname: "Atualizado",
        plataforma: "Console"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.mensagem).toBe("Player atualizado com sucesso");
  });

  test('DELETE /players/:id deve deletar', async () => {
    const response = await request(app)
      .delete(`/players/${playerId}`);

    expect(response.statusCode).toBe(200);
  });
});

