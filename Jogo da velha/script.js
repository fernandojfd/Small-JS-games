const currentPlayer = document.querySelector(".currentPlayer");                  // Pegando a referencia do currentPlayer //

let selected;                                                                    // Declarando a variavel selected //
let player = "X";                                                                // Declarando a variavel 'player' começando com o valor "x" //

let positions = [                                                                
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],                                                                   // Declarando a variavel position que vai armazenar as posições possiveis //
    [1, 2, 3],                                                                   // para ter um ganhador //
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function init() {                                                               // Funciton incicial que a variavel selected vai iniciar vazio //
    selected = [];

    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;                      // currentPlayer vai armazenar o player inicial "x" //

    document.querySelectorAll(".game button").forEach((item) => {               // pegando o documento e fazendo um quaryselectorAll em todos os botões dentro //
        item.innerHTML = "";                                                    // da div .game. fazendo um forEach//
        item.addEventListener("click", newMove);                                // para cada botão quando for inicializado começar com o innerHTML vazio //
    });  // evento click de cada botão //
}

init(); // iniciar init quando abrir o arquivo //

function newMove(e) {                                                           // funcition newMove que vai receber o evento referente ao botão //
    const index = e.target.getAttribute("data-i");                              // pegando o atributo data-i declarado no html. clicando ele retorna o numero do botão //
    e.target.innerHTML = player;                                                // passando para o innerHTML a informação do player //
    e.target.removeEventListener("click", newMove);                             // removendo o evento de click do botão para não ter bdlclick //
    selected[index] = player;                                                   

    setTimeout(() => {
        check(); // funtion check //
    }, [100]);
      // trocando player //
    player = player === "X" ? "O" : "X";                                        // se tiver o "X"vai ser "O" se não vai ser "X"            
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;                      // a cada movimento troca o player //
}

function check() {
    let playerLastMove = player === "X" ? "O" : "X";                            // Identificar o ultimo player que jogou //

    const items = selected                                                      // const para mapiar os items selecionados gerando um novo data-1 //
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

    for (pos of positions) {                                                   // for para verificar se ja tem um possivel jogados //
        if (pos.every((item) => items.includes(item))) {                       
            alert("O JOGADOR '" + playerLastMove + "' GANHOU!");               // alerte para o ganhador quando bater //
            init();                                                            // inicializando o game e dando o ruturn//
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {                         // verificando se deu empate se tiver 9 items selecionado //
        alert("EMPATE!");
        init();
        return;
    }
}  
