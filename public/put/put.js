let idEncontrado = null;
let dadosOriginais = {};

function buscarParaEditar() {
    const cpfLimpo = document.getElementById('cpfBusca').value.replace(/\D/g, '');
    if (!cpfLimpo) return alert("DIGITE UM CPF!");

    fetch('/pessoas')
        .then(res => res.json())
        .then(data => {
            const p = data.find(item => item.cpf === cpfLimpo);
            if (p) {
                idEncontrado = p.id;
                dadosOriginais = p; // Armazena CPF e RG originais

                document.getElementById('nome').value = p.nome;
                document.getElementById('sobrenome').value = p.sobrenome;
                document.getElementById('email').value = p.email;
                document.getElementById('idade').value = p.idade;
                document.getElementById('telefone').value = p.telefone;
                document.getElementById('rua').value = p.rua;
                document.getElementById('bairro').value = p.bairro;
                document.getElementById('cidade').value = p.cidade;
                document.getElementById('estado').value = p.estado;

                alert('DADOS CARREGADOS COM SUCESSO!');
            } else {
                alert('REGISTRO NÃO ENCONTRADO.');
            }
        });
}

function atualizarDados() {
    if (!idEncontrado) return alert("BUSQUE UM REGISTRO PRIMEIRO!");

    const objAtualizado = {
        // Mantém os originais que não aparecem na tela
        cpf: dadosOriginais.cpf,
        rg: dadosOriginais.rg,
        // Novos dados em MAIÚSCULO
        nome: document.getElementById('nome').value.toUpperCase(),
        sobrenome: document.getElementById('sobrenome').value.toUpperCase(),
        email: document.getElementById('email').value.toUpperCase(),
        idade: document.getElementById('idade').value.substring(0, 2),
        telefone: document.getElementById('telefone').value,
        rua: document.getElementById('rua').value.toUpperCase(),
        bairro: document.getElementById('bairro').value.toUpperCase(),
        cidade: document.getElementById('cidade').value.toUpperCase(),
        estado: document.getElementById('estado').value.toUpperCase().substring(0, 2)
    };

    fetch(`/pessoas/${idEncontrado}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objAtualizado)
    })
        .then(res => {
            if (res.ok) {
                alert('REGISTRO ATUALIZADO COM SUCESSO!');
                location.href = '../get/';
            }
        });
}

// --- REAPROVEITANDO MÁSCARAS DO POST ---

function maskTel(i) {
    let v = i.value.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d)/g, "($1)$2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    i.value = v.substring(0, 14);
}

function maskEstado(i) {
    i.value = i.value.replace(/[0-9]/g, '').toUpperCase().substring(0, 2);
}

function maskIdade(i) {
    if (i.value.length > 2) i.value = i.value.slice(0, 2);
}

function maskCPF(i) {
    let v = i.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    i.value = v;
}