import request from 'supertest';
import app from '../app.js';


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


describe('Testes da API de Usuários', () => {
    let usuarioId;
    let emailTeste; // Variável para guardar o email dinâmico

    test('POST /usuarios deve criar um novo usuário', async () => {
        emailTeste = `teste_${Date.now()}@exemplo.com`; // Geramos o email aqui
       
        const novoUsuario = {
            nome: "Fulano de Tal",
            email: emailTeste,
            senha: "senha123"
        };

        const response = await request(app)
            .post('/usuarios')
            .send(novoUsuario);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
       
        usuarioId = response.body.id; // Salva o ID para os próximos testes
    });

    test('PUT /usuarios/:id deve atualizar um usuário existente', async () => {
        // Importante: vamos atualizar apenas o nome para não perder o rastro do email no login
        const dadosAtualizados = {
            nome: "Fulano Atualizado",
            email: emailTeste , // Mantemos o mesmo email para o teste de login funcionar
             senha: "senha123"
        };

        const response = await request(app)
            .put(`/usuarios/${usuarioId}`)
            .send(dadosAtualizados);

        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toBe("Usuário atualizado com sucesso");
    });

    test('POST /usuarios/login deve autenticar com sucesso', async () => {
        const credenciais = {
            email: emailTeste, // Usa o mesmo email criado no primeiro teste
            senha: "senha123"
        };

        const response = await request(app)
            .post('/usuarios/login')
            .send(credenciais);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });



    test('DELETE /usuarios/:id deve remover o usuário após um tempo', async () => {
        // Agora usamos o ID que foi guardado lá no primeiro teste

        console.log("Aguardando 3 segundos antes de deletar...");
        await sleep(3000); // Espera 3000ms (3 segundos)
       
        const response = await request(app).delete(`/usuarios/${usuarioId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toBe("Usuário deletado com sucesso!");
    });

    test('DELETE /usuarios/:id deve retornar 404 para ID inexistente', async () => {
        const response = await request(app).delete('/usuarios/999999');
        expect(response.statusCode).toBe(404);
    });
});
