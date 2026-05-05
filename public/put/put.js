function buscarDados() {
    const cpf = document.getElementById('cpfBusca').value;

    // Busca direto pela Query String do CPF (como pede sua atividade)
    fetch(`/pessoas?cpf=${cpf}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const pessoa = data[0];
                // Preenche todos os campos na tela
                document.getElementById('id').value = pessoa.id || '';
                document.getElementById('cpfAtualizar').value = pessoa.cpf || '';
                document.getElementById('nomeAtualizar').value = pessoa.nome || '';
                document.getElementById('sobrenomeAtualizar').value = pessoa.sobrenome || '';
                document.getElementById('rgAtualizar').value = pessoa.rg || '';
                document.getElementById('idadeAtualizar').value = pessoa.idade || '';
                document.getElementById('emailAtualizar').value = pessoa.email || '';
                document.getElementById('telefoneAtualizar').value = pessoa.telefone || '';
                document.getElementById('ruaAtualizar').value = pessoa.rua || '';
                document.getElementById('bairroAtualizar').value = pessoa.bairro || '';
                document.getElementById('cidadeAtualizar').value = pessoa.cidade || '';
                document.getElementById('estadoAtualizar').value = pessoa.estado || '';
            } else {
                alert('Pessoa não encontrada! Verifique o CPF digitado.');
            }
        })
        .catch(error => console.error('Erro na busca:', error));
}

function atualizarDados() {
    const id = document.getElementById('id').value;

    // Trava de segurança caso o usuário clique em atualizar sem buscar antes
    if (!id) {
        alert("Por favor, busque um CPF válido primeiro antes de atualizar!");
        return;
    }

    const dadosAtualizados = {
        cpf: document.getElementById('cpfAtualizar').value,
        nome: document.getElementById('nomeAtualizar').value,
        sobrenome: document.getElementById('sobrenomeAtualizar').value,
        rg: document.getElementById('rgAtualizar').value,
        idade: document.getElementById('idadeAtualizar').value,
        email: document.getElementById('emailAtualizar').value,
        telefone: document.getElementById('telefoneAtualizar').value,
        rua: document.getElementById('ruaAtualizar').value,
        bairro: document.getElementById('bairroAtualizar').value,
        cidade: document.getElementById('cidadeAtualizar').value,
        estado: document.getElementById('estadoAtualizar').value
    };

    fetch(`/pessoas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAtualizados)
    })
        .then(response => response.json())
        .then(() => {
            alert('Dados atualizados com sucesso!');
            // Limpa os campos após a atualização (opcional)
            document.querySelector('form').reset();
        })
        .catch(error => {
            console.error('Erro ao atualizar:', error);
            alert('Ocorreu um erro ao atualizar os dados.');
        });
}