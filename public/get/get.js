fetch('/pessoas')
    .then(response => response.json())
    .then(data => {
        const tabela = document.getElementById('tabela-corpo');
        data.forEach((objeto) => {
            const linha = `<tr>
            <td>${objeto.nome} ${objeto.sobrenome}</td>
            <td>${objeto.cpf}</td>
            <td>${objeto.idade}</td>
            <td>${objeto.cidade}-${objeto.estado}</td>
        </tr>`;
            tabela.innerHTML += linha;
        });
    });