/*QUESTÃO-01: Você foi designado para criar um sistema de configuração para um projeto da FATEC. 
O primeiro passo é preparar o ambiente: inicialize um novo projeto Node.js em uma pasta exclusiva 
utilizando o comando npm init. Em seguida, crie manualmente um arquivo chamado config.json 
contendo as chaves "campus", "curso" e "semestre". Desenvolva um script index.js que utilize o 
módulo nativo fs para ler esse arquivo de forma assíncrona e, após a leitura bem-sucedida, exiba no 
console a mensagem: "Configuração carregada para o curso [CURSO] no campus [CAMPUS]".
*/

import fs from 'fs';

async function lerArquivo() {
    try {
        const dados = await fs.promises.readFile('./config.json', 'utf-8');
        const config = JSON.parse(dados);

        console.log(`Configuração carregada para o curso ${config.curso} no campus ${config.campus}`)
    } catch (erro) {
        console.error("Erro ao ler o arquivo: ", erro);
    }
}

lerArquivo();
