let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto){
    let campo =document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate: 1.2});
}

function exibirMensagemInicial(){
    exibirTexto('h1','Jogo do Numero secreto');
    exibirTexto('p','Escolha um número de 1 a 10');
}

function gerarNumeroAleatorio() {

    //Gera o número aleatório e faz a verificação se o número já foi escolhido
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosDaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
        
    } else {

        //Este método adiciona o elemento ao final da lista
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }

}

function limparCampos() {
    chute = document.querySelector('input');
    chute.value = '';
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value; 
    console.log("O botão foi clicado");

    if (chute == numeroSecreto) {
        exibirTexto('h1','Acertou');
        let pTentativa = tentativas > 1?'tentativas':'tentativa';
        let mensagemTentativas = 'Você descobriu o número secreto com '+tentativas+' ' + pTentativa;
        exibirTexto('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {

        if(chute > numeroSecreto){
            exibirTexto('h1','tente novamente');
            exibirTexto('p','O número secreto é menor');
        } else {
            exibirTexto('h1','tente novamente');
            exibirTexto('p','O número secreto é maior');
        }
        tentativas++;
        limparCampos();
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampos();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
    
}

