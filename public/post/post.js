function enviarDados() {
    const dados = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        email: document.getElementById('email').value,
        idade: document.getElementById('idade').value,
        telefone: document.getElementById('telefone').value,
        rua: document.getElementById('rua').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    };

    fetch('/pessoas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(() => {
            alert("Cadastro realizado!");
            document.getElementById('formPost').reset();
        });
}