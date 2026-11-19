function exibirTabuleiro(tabuleiroZerado){
    console.log("🧠  Jogo da Memoria  🧠 \n");
    console.log("Tabuleiro:");
    for (let i = 0; i < 4; i++) {
        let linha = " [ ";
        for (let j = 0; j < 4; j++) {
            if(j == 3){
                linha += tabuleiroZerado[i][j] + " ] "
            }else{
                linha += tabuleiroZerado[i][j] + " ] [ "
            };
        }
        console.log(linha);
    }
}


//Tabuleiro Dinamico para um jogo personalizado.
const matriz =[];
function exibeTabuleiroDinamico (numeroColunas, numeroLinhas){
    console.log("Tabuleiro:\n");
    for (let i = 0; i < numeroLinhas; i++) {
        matriz[i] = [];
        for (let j = 0; j < numeroColunas; j++) {
            switch (i){
                case 0:
                    matriz[i][j] = i+j+1;
                    break;
                case 1:
                    matriz[i][j] = i+j+4;
                    break;
                case 2:
                    matriz[i][j] = i+j+7;
                    break;
                case 3:
                    matriz[i][j] = i+j+10;
                    break;
                default:
                    break;
            }
        }
        console.log(matriz[i]);
    }
}



export default exibirTabuleiro ;