// Carregar ao iniciar
window.onload = carregarDados;

function carregarDados() {
    document.getElementById('buscaCpf').value = '';
    fetch('/pessoas')
        .then(res => res.json())
        .then(data => renderizarTabela(data));
}

function renderizarTabela(dados) {
    const tb = document.getElementById('tabela');
    tb.innerHTML = dados.map(p => `
        <tr>
            <td>${p.nome} ${p.sobrenome}</td>
            <td>${p.email}</td>
            <td>${p.idade}</td>
            <td>${p.telefone}</td>
            <td>${p.cpf}</td>
            <td>${p.rg}</td>
            <td>${p.rua}, ${p.bairro}</td>
            <td>${p.cidade}/${p.estado}</td>
        </tr>
    `).join('');
}

function filtrarPorCpf() {
    const cpfBusca = document.getElementById('buscaCpf').value.replace(/\D/g, '');
    if (!cpfBusca) return carregarDados();

    fetch('/pessoas')
        .then(res => res.json())
        .then(data => {
            const filtrado = data.filter(p => p.cpf.includes(cpfBusca));
            renderizarTabela(filtrado);
            if (filtrado.length === 0) alert("NENHUM REGISTRO ENCONTRADO.");
        });
}

// Reaproveitando a máscara para o campo de busca
function maskCPF(i) {
    let v = i.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    i.value = v;
}