function deletarDados() {
    const cpfBusca = document.getElementById("cpf").value;

    if (!cpfBusca) {
        alert("Digite um CPF para deletar!");
        return;
    }

    // 1. Busca qual pessoa tem esse CPF
    fetch(`/pessoas?cpf=${cpfBusca}`)
        .then(response => {
            if (!response.ok) throw new Error('Falha na comunicação com o servidor ao buscar.');
            return response.json();
        })
        .then(data => {
            // Se retornou um array vazio, o CPF não existe no banco
            if (data.length === 0) {
                alert('CPF não encontrado no banco de dados!');
                return;
            }

            // Pega o ID do primeiro resultado encontrado
            const idDaPessoa = data[0].id;

            // 2. Faz o DELETE usando o ID correto
            fetch(`/pessoas/${idDaPessoa}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) throw new Error('Falha ao tentar excluir no banco de dados.');
                    return response.json();
                })
                .then(() => {
                    alert('Registro deletado com sucesso!');
                    document.getElementById('cpf').value = ''; // Limpa o campo
                })
                .catch(error => {
                    console.error('Erro no DELETE:', error);
                    alert('Erro ao tentar deletar o registro.');
                });
        })
        .catch(error => {
            console.error('Erro na Busca (GET):', error);
            alert('Erro ao buscar o CPF.');
        });
}