/*QUESTÃO-04: Como parte de uma atividade de infraestrutura na FATEC, você deve criar um roteador 
institucional em Node.js utilizando o módulo http. O servidor deve ser capaz de distinguir requisições 
para três destinos: /fatec, respondendo com o texto "Bem-vindo à Faculdade de Tecnologia"; /fecap, 
respondendo com "Bem-vindo a FATEC Diadema"; e qualquer outra rota acessada deve retornar um 
erro 404 personalizado com a mensagem "Recurso não encontrado no servidor". O foco aqui é a 
lógica de tratamento da URL da requisição (req.url) e o envio dos códigos de status HTTP corretos.
*/

const http = require('http');
const url = require('url');

const routes = {
    '/fatec': 'Bem-vindo à Faculdade de Tecnologia',
    '/fecap': 'Bem-vindo a FATEC Diadema'
};

const server = http.createServer((request, response) => {
    const pathname = url.parse(request.url).pathname;

    if (routes[pathname]) {
        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end(routes[pathname]);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Recurso não encontrado no servidor');
    }
});

server.listen(3000, () => {
    console.log('Servidor iniciado em: http://localhost:3000/');
});