// 1. Seleção dos elementos (Boa prática: deixar no topo do arquivo)
const botaoTema = document.getElementById('botaoTema');

// 2. Ouvir o evento de quando o usuário sair do campo de CEP
document.getElementById('cep').addEventListener('blur', (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;

    if (!(cepInformado.length === 8)) {
        return;
    }

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            } else {
                alert('CEP não encontrado');
            }
        })
        .catch(error => console.error('Erro ao consultar o CEP:', error));
});

// 3. Lógica do Botão de Tema 
botaoTema.addEventListener('click', () => {
    const ehDark = document.body.classList.contains('dark');

    if (ehDark) {
        document.body.classList.remove('dark');
        localStorage.setItem('tema', 'light');
        botaoTema.textContent = '☾'; // Mostra lua para indicar que pode escurecer
    } else {
        document.body.classList.add('dark');
        localStorage.setItem('tema', 'dark');
        botaoTema.textContent = '☀︎︎'; // Mostra sol para indicar que pode clarear
    }
});

const formulario = document.querySelector('form');

// Função para salvar os dados do form no localStorage
function salvarDadosFormulario() {
    const dados = {
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        numero: document.getElementById('numero').value
    };
    // Convertemos o objeto para String JSON para poder salvar no localStorage
    localStorage.setItem('dadosCadastro', JSON.stringify(dados));
    alert('Dados cadastrados e salvos com sucesso!');
}

// 4. Verificar o tema salvo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const temaSalvo = localStorage.getItem('tema');

    if (temaSalvo === 'dark') {
        document.body.classList.add('dark');
        botaoTema.textContent = '☀︎︎';
    } else {
        document.body.classList.remove('dark');
        botaoTema.textContent = '☾';
    }

    const dadosSalvos = localStorage.getItem('dadosCadastro');

    if (dadosSalvos) {
        // Converte a string JSON de volta para um objeto Javascript
        const dados = JSON.parse(dadosSalvos);
        
    // 2. O uso do operador || (OU):
    //    Funciona como uma proteção (Valor Padrão / Fallback).
    //    Diz ao navegador: "Se o dado da esquerda existir, use-o. 
    //    OU, se ele estiver vazio/undefined, coloque um texto vazio ('')".
    //    Isso evita que apareça a palavra "undefined" escrita dentro dos inputs.

        // Preenche os campos do HTML com os dados guardados
        document.getElementById('cep').value = dados.cep || '';
        document.getElementById('logradouro').value = dados.logradouro || '';
        document.getElementById('bairro').value = dados.bairro || '';
        document.getElementById('cidade').value = dados.cidade || '';
        document.getElementById('estado').value = dados.estado || '';
        document.getElementById('numero').value = dados.numero || '';
    }
});

// 3. Escuta o evento de SUBMIT (quando clica em Cadastrar)
formulario.addEventListener('submit', (evento) => {
    // impede a página de recarregar antes de salvarmos os dados
    evento.preventDefault(); 
    
    // Chama a função para salvar no localStorage
    salvarDadosFormulario();
});