/*QUESTÃO-04: Como parte de uma atividade de infraestrutura na FATEC, você deve criar um roteador 
institucional em Node.js utilizando o módulo http. O servidor deve ser capaz de distinguir requisições 
para três destinos: /fatec, respondendo com o texto "Bem-vindo à Faculdade de Tecnologia"; /fecap, 
respondendo com "Bem-vindo a FATEC Diadema"; e qualquer outra rota acessada deve retornar um 
erro 404 personalizado com a mensagem "Recurso não encontrado no servidor". O foco aqui é a 
lógica de tratamento da URL da requisição (req.url) e o envio dos códigos de status HTTP corretos.
*/

const http = require('http');
const url = require('url');
const path = require('url');
const fs = require('fs');

const publicDir = path.join(__dirname, 'public');
const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8'
};

const routes = {
    '/': 'index.html',
    '/fatec': 'fatec.html',
    '/fecap': 'fecap.html'
}

function readFile(response, file) {
    fs.readFile(file, function(err, data){
        if (err) {
            response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
            return fs.createReadStream(
                path.join(publicDir, 'erro404.html')
            ).pipe(response);
        }

        var extension = path.extname(file).toLowerCase();
        var contentType = contentTypes[extension] || 'application/octet-stream';

        response.writeHead(200, {'Content-Type': contentType});
        response.end(data);
    })
}

var callback = function(request, response) {
    var pathname = decodeURIComponent(url.parse(request.url).pathname);

    if (routes[pathname]) {
        return readFile(response, path.join(publicDir, routes[pathname]));
    }

    var file = path.join(publicDir, pathname);

    if (!file.startsWith(publicDir)) {
        return readFile((response, path.join(publicDir, 'erro404.html')));
    }

    readFile(response, file);
}

var server = http.createServer(callback);
server.listen(3000);
console.log(`Servidor iniciado em: http://localhost:3000/`)