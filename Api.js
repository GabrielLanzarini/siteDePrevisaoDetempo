var regiaoBotoes = document.querySelectorAll('.botaoRegiao');



regiaoBotoes.forEach((e)=>{
    e.addEventListener('click', ()=>{

        let botaoAtivado = document.querySelector('.botaoAtivado');
        botaoAtivado.classList.remove('botaoAtivado')     

        regiao = e.textContent;
        e.classList.add('botaoAtivado')
        getApi();
    })
})

var regiao = 'Sul'
var respostaApi = null;
var contadorArrayDadosAPI = 0;

document.addEventListener('onload', getApi())

function getApi(){
    fetch(`http://apiadvisor.climatempo.com.br/api/v1/forecast/region/${regiao}?token=23879b7cddaa5804008b6fd8f9a7f413`)
    .then(response =>{
        return response.json();
    })
    .then(data =>{
        respostaApi = data;
        console.log(data);
    })
    .then(()=>{organizarTela(),teste()})
    
    .catch((error) => {console.log(error);})
}



function organizarTela(){
    let textoDescricao = respostaApi.data[contadorArrayDadosAPI].text;
    let data = respostaApi.data[contadorArrayDadosAPI].date_br;
    let imagem = respostaApi.data[contadorArrayDadosAPI].image;

    document.getElementById('dataPrevisao').textContent = 'Previsão do dia '+ data;
    document.getElementById('descricaoPrevisao').textContent = textoDescricao;
    document.getElementById('imgPrevisao').src = imagem;
}

var botaoDia = document.querySelectorAll('.botaoDia')


function teste(){
    botaoDia.forEach((e,i) => {
        e.textContent = respostaApi.data[i].date_br;
        e.addEventListener('click', () => {
            let botaoAtivado = document.querySelector('.botaoDiaAtivado');
            botaoAtivado.classList.remove('botaoDiaAtivado')    
            contadorArrayDadosAPI = i; 
            organizarTela();
    
            e.classList.add('botaoDiaAtivado')
        })
    })
}