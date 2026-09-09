/*QUESTÃO-03: Desenvolva um servidor Node.js que simule uma API de consulta acadêmica. O 
servidor deve escutar na porta 3000 e possuir duas rotas principais: ao acessar a raiz (/), o aluno deve 
receber uma resposta em formato HTML com o título "Portal de APIs Acadêmicas". Ao acessar a rota 
/instituicao, o servidor deve retornar um objeto JSON contendo as informações: { "nome": "Faculdade 
Tecnológica de São Paulo", "cidade": "São Paulo", "status": "online" }. Certifique-se de configurar 
corretamente o Content-Type para cada tipo de resposta (HTML e JSON).
*/

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, 'public');
const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.json': 'application/json; charset=utf-8'
}

const routes = {
    '/' : 'index.html',
    '/instituicao' : 'instituicao.html'
}

function readFile(response, file) {
    fs.readFile(file, function(err, data){
        if (err) {
            response.writeHead(404, {'Conten-Type': 'text/html; charset=utf-8'});
            return fs.createReadStream(
                path.join(publicDir, 'erro404.html')
            ).pipe(response);
        }

        var extension = path.extname(file).toLowerCase();
        var contentType = contentTypes[extension] || 'aplication/octet-stream';

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
console.log(`Servidor iniciado em: http://localhost:3000/`);