function deletarDados() {
    const cpfInput = document.getElementById('cpfExcluir').value;
    const cpfLimpo = cpfInput.replace(/\D/g, ''); // Limpa para comparar com o banco

    if (cpfLimpo.length < 11) {
        return alert("POR FAVOR, DIGITE UM CPF COMPLETO.");
    }

    fetch('/pessoas')
        .then(res => res.json())
        .then(data => {
            const pessoa = data.find(item => item.cpf === cpfLimpo);

            if (pessoa) {
                const confirmar = confirm(`TEM CERTEZA QUE DESEJA EXCLUIR O REGISTRO DE: ${pessoa.nome} ${pessoa.sobrenome}?`);

                if (confirmar) {
                    fetch(`/pessoas/${pessoa.id}`, {
                        method: 'DELETE'
                    })
                        .then(res => {
                            if (res.ok) {
                                alert('REGISTRO EXCLUÍDO COM SUCESSO!');
                                document.getElementById('cpfExcluir').value = '';
                            }
                        });
                }
            } else {
                alert('CPF NÃO ENCONTRADO NO SISTEMA.');
            }
        });
}

// Máscara de CPF padrão para manter a identidade visual
function maskCPF(i) {
    let v = i.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    i.value = v;
}