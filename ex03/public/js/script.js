fetch('/dados/dados.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(dados) {
        document.getElementById('dadosJSON').innerHTML =
        '<b>Nome:</b> ' + dados.nome + '<br>' +
        '<b>Cidade:</b> ' + dados.cidade + '<br>' +
        '<b>Status:</b> ' + dados.status + '<br>'
    });