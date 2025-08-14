const chaveApi = '661fe5b03b384faabfb172938251308'; 

const botaoBuscar = document.getElementById('botao-buscar');
const inputCidade = document.getElementById('cidade');

const resultadoClima = document.getElementById('resultado-clima');
const mensagemErro = document.getElementById('mensagem-erro');

const nomeCidade = document.getElementById('nome-cidade');
const horaLocal = document.getElementById('hora-local');
const iconeClima = document.getElementById('icone-clima');
const temperatura = document.getElementById('temperatura');
const condicao = document.getElementById('condicao');
const sensacao = document.getElementById('sensacao');
const umidade = document.getElementById('umidade');
const vento = document.getElementById('vento');
const pressao = document.getElementById('pressao');
const visibilidade = document.getElementById('visibilidade');
const indiceUv = document.getElementById('indice-uv');

function buscarClima(cidade) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${chaveApi}&q=${cidade}&aqi=no&lang=pt`;

    fetch(url)
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error('Cidade não encontrada');
            }
            return resposta.json();
        })
        .then(dados => {
            mostrarClima(dados);
        })
        .catch(erro => {
            mostrarErro(erro.message);
        });
}

function mostrarClima(dados) {
    nomeCidade.innerText = `${dados.location.name} - ${dados.location.country}`;
    horaLocal.innerText = `Hora Local: ${dados.location.localtime}`;
    iconeClima.src = dados.current.condition.icon;
    iconeClima.alt = dados.current.condition.text;
    temperatura.innerText = `${dados.current.temp_c}°C`;
    condicao.innerText = dados.current.condition.text;
    sensacao.innerText = `${dados.current.feelslike_c}°C`;
    umidade.innerText = `${dados.current.humidity}%`;
    vento.innerText = `${dados.current.wind_kph} km/h`;
    pressao.innerText = `${dados.current.pressure_mb} mb`;
    visibilidade.innerText = `${dados.current.vis_km} km`;
    indiceUv.innerText = dados.current.uv;

    resultadoClima.classList.remove('esconder');
    mensagemErro.classList.add('esconder');
}

function mostrarErro(mensagem) {
    mensagemErro.innerHTML = `<p>${mensagem}</p>`;
    mensagemErro.classList.remove('esconder');
    resultadoClima.classList.add('esconder');
}

botaoBuscar.addEventListener('click', () => {
    const cidadeDigitada = inputCidade.value.trim();
    if (cidadeDigitada === '') {
        mostrarErro('Digite o nome da cidade.');
        return;
    }
    buscarClima(cidadeDigitada);
});

inputCidade.addEventListener('keyup', (evento) => {
    if (evento.key === 'Enter') {
        botaoBuscar.click();
    }
});
