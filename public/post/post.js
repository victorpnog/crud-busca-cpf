// Função para limpar e formatar apenas números onde necessário
const apenasNumeros = (valor) => valor.replace(/\D/g, '');

function enviarDados() {
    // Captura e transforma tudo em MAIÚSCULO antes de enviar
    const obj = {
        nome: document.getElementById('nome').value.toUpperCase(),
        sobrenome: document.getElementById('sobrenome').value.toUpperCase(),
        email: document.getElementById('email').value.toUpperCase(),
        idade: apenasNumeros(document.getElementById('idade').value).substring(0, 2),
        telefone: document.getElementById('telefone').value,
        cpf: apenasNumeros(document.getElementById('cpf').value),
        rg: document.getElementById('rg').value.replace(/\D/g, ''),
        rua: document.getElementById('rua').value.toUpperCase(),
        bairro: document.getElementById('bairro').value.toUpperCase(),
        cidade: document.getElementById('cidade').value.toUpperCase(),
        estado: apenasNumeros(document.getElementById('estado').value.replace(/[0-9]/g, '')).toUpperCase().substring(0, 2)
    };

    fetch('/pessoas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })
        .then(res => {
            if (res.ok) {
                alert('CADASTRO REALIZADO COM SUCESSO!');

                // LIMPAR TODOS OS CAMPOS PARA UM NOVO CADASTRO
                const inputs = document.querySelectorAll('input');
                inputs.forEach(input => input.value = '');

                // FOCA NO PRIMEIRO CAMPO NOVAMENTE
                document.getElementById('nome').focus();
            } else {
                alert('ERRO AO SALVAR OS DADOS.');
            }
        });
}

// --- MÁSCARAS E VALIDAÇÕES EM TEMPO REAL ---

function maskTel(i) {
    let v = i.value.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d)/g, "($1)$2"); // Padrão (11)99999-9999
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    i.value = v.substring(0, 14);
}

function maskEstado(i) {
    // Remove números e aceita apenas 2 letras
    i.value = i.value.replace(/[0-9]/g, '').toUpperCase().substring(0, 2);
}

function maskIdade(i) {
    // Limita a 2 dígitos
    if (i.value.length > 2) i.value = i.value.slice(0, 2);
}

function maskCPF(i) {
    let v = i.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    i.value = v;
}

function maskRG(i) {
    let v = i.value.replace(/\D/g, ''); // Remove tudo que não é número

    // Formatação: 00.000.000-0
    v = v.replace(/(\d{2})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1})$/, "$1-$2");

    i.value = v.substring(0, 12); // Garante o limite de caracteres da máscara
}