import read from 'readline-sync';
import { emojis } from '../data/dados.js';
import exibirTabuleiro from './funcoesExibicoes.js';

function retornaOpcaoJogador(cartasEncontradas, opcaoAnterior = null){
    
    while(true){
        const opcaoEscolhida = Number(read.question('Escolha uma carta (1 a 16)').trim());
        if(!(opcaoEscolhida >= 1 && opcaoEscolhida <= 16)){
            console.log('Opção inválida! Escolha um número de 1 a 16.');
            continue;
        }
        if(opcaoAnterior !== null && opcaoEscolhida === opcaoAnterior){
            console.log("Opcão inválida! Você já escolheu esta carta nesta Rodada!");
            continue;
        }
        if(cartasEncontradas.includes(opcaoEscolhida)){
            console.log("Carta já encontrada no tabuleiro!");
            continue;
        }
        return opcaoEscolhida;
    }
}

function duplicaEmojis(emojis){
    let contador = 0;
    const emojisDuplicados=emojis;
    while(contador <= 7){
        emojisDuplicados.push(emojis[contador]);
        contador++;
    }
    return emojisDuplicados;
}

function embaralhaArrayEmojis(emojis){
    const arrayEmojisDuplicados = duplicaEmojis(emojis);
    const arrayEmojisEmbaralhados = [];

    for(let i=0; i < 4; i++){
        arrayEmojisEmbaralhados[i] = [];
        for (let j=0; j <  4; j++){
            const indiceAleatorio = Math.floor(Math.random() * arrayEmojisDuplicados.length);
        const emojiAleatorio = arrayEmojisDuplicados.splice(indiceAleatorio,1)[0];
        arrayEmojisEmbaralhados[i][j]= emojiAleatorio;
        }
        
    }
    return arrayEmojisEmbaralhados;
}

export function revelarCarta(opcaoJogador, tabuleiroVisivel, tabuleiroComEmojis) {
  const indice = opcaoJogador - 1;
  const linha = Math.floor(indice / 4);
  const coluna = indice % 4;
  tabuleiroVisivel[linha][coluna] = tabuleiroComEmojis[linha][coluna];
}

function esconderCarta(opcao1Jogador, opcao2Jogador,tabuleiroVisivel, tabuleiroInicial){
    const indice1 = opcao1Jogador - 1;
    const indice2 = opcao2Jogador - 1;
    const linhaJogada1 = Math.floor(indice1 / 4);
    const colunaJogada1 = indice1 % 4;
    const linhaJogada2 = Math.floor(indice2 / 4);
    const colunaJogada2 = indice2 % 4;
    tabuleiroVisivel[linhaJogada1][colunaJogada1] = tabuleiroInicial[linhaJogada1][colunaJogada1];
    tabuleiroVisivel[linhaJogada2][colunaJogada2] = tabuleiroInicial[linhaJogada2][colunaJogada2];

}

function verificaJogada(opcao1Jogador, opcao2Jogador,tabuleiroVisivel){
    const indice1 = opcao1Jogador - 1;
    const indice2 = opcao2Jogador - 1;
    const linhaJogada1 = Math.floor(indice1 / 4);
    const colunaJogada1 = indice1 % 4;
    const linhaJogada2 = Math.floor(indice2 / 4);
    const colunaJogada2 = indice2 % 4;
    if(tabuleiroVisivel[linhaJogada1][colunaJogada1] === tabuleiroVisivel[linhaJogada2][colunaJogada2]){
        return true;
    }else{
        return false;
    }
}



function jogoDaMemoria(tabuleiroVisivel, tabuleiroEmojis){
    let opcao1Jogador = 0;
    let opcao2Jogador = 0;
    let cartasReveladas = 0;
    const cartasEncontradas = [];
    let chances = 5;
    while (chances > 0 && cartasReveladas < 16){
        const tabuleiroJogadaAnterior = tabuleiroVisivel.map(function(linha) {
            return linha.slice();
        });
        opcao1Jogador = retornaOpcaoJogador(cartasEncontradas);
        revelarCarta(opcao1Jogador,tabuleiroVisivel, tabuleiroEmojis);
        console.clear();
        exibirTabuleiro(tabuleiroVisivel);
        opcao2Jogador = retornaOpcaoJogador(cartasEncontradas,opcao1Jogador);
        revelarCarta(opcao2Jogador,tabuleiroVisivel, tabuleiroEmojis);
        console.clear();
        exibirTabuleiro(tabuleiroVisivel);
        if(verificaJogada(opcao1Jogador, opcao2Jogador,tabuleiroVisivel)){
            console.log("\n🎉  Acertou esta rodada!  🎉Você encontrou um par!");
            cartasEncontradas.push(opcao1Jogador,opcao2Jogador);
            cartasReveladas+=2;
            if(cartasReveladas === 16){
                console.log("\n🎊🏆  Parabéns! Você encontrou todos os pares!!! 🎊")
                console.log("🥇  Você venceu!");
            }
        }else{
            chances--;
            console.log(`\n❌  Não combinam!  😕 Você tem ${chances} chances`);
            read.question('Pressione Enter para continuar...');
            esconderCarta(opcao1Jogador, opcao2Jogador,tabuleiroVisivel, tabuleiroJogadaAnterior);
            console.clear();
            exibirTabuleiro(tabuleiroVisivel);
            if(chances === 0){
                console.log("\n❌  Você esgotou suas chances! 😢 Jogo encerrado!  🎮");
            }
        }
    }
}


export {retornaOpcaoJogador, embaralhaArrayEmojis, jogoDaMemoria};