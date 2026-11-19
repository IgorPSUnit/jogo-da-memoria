import {emojis, tabuleiro} from "./data/dados.js";
import exibirTabuleiro from './funcoes/funcoesExibicoes.js'
import {retornaOpcaoJogador, embaralhaArrayEmojis, revelarCarta, jogoDaMemoria}  from "./funcoes/funcoesLogicas.js";
console.clear();
exibirTabuleiro(tabuleiro);
let tabuleiroEmojis = embaralhaArrayEmojis(emojis);
//Gabarito da rodada(Retire o comentario da linha abaixo para ver as respostas da rodada)
//exibirTabuleiro(tabuleiroEmojis);
jogoDaMemoria(tabuleiro,tabuleiroEmojis);


