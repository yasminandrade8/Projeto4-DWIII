/*QUESTÃO-02: Para monitorar o uso de um laboratório na FATEC, precisamos de um . 
Inicialize um projeto Node.js e configure o arquivo package.json para que o script principal seja 
executado através do comando npm start. O desafio consiste em criar um código que verifique a 
existência de um arquivo chamado log.txt. Caso o arquivo exista, o programa deve ler o conteúdo e 
adicionar ao final (append) uma nova linha com o texto "Novo acesso registrado em: " seguido da data 
e hora atual do sistema. Caso o arquivo não exista, o script deve criá-lo automaticamente com a 
primeira entrada de log.
*/

const fs = require('fs');
const arquivo = 'log.txt';

const dataAtual = new Date();
const mensagem = `Novo acesso registrado em: ${dataAtual}\n`;

try {
    fs.appendFileSync(arquivo, mensagem);
    console.log("Novo acesso registrado!")
} catch (erro) {
    fs.writeFileSync(arquivo, mensagem);
    console.log("Arquivo criado!");
}