import Cell from './Cell.js';

let explosionSound  = new Audio('../assets/audio/explosion.mp3');
let clapSound = new Audio('../assets/audio/clapclapclapclapclapclapclap.mp3');

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  let board1 = {
    grid: [],
    mines: 0,
    width: 0,
    height: 0,
    minesLeft: 0,
    gameOver: false,
    gameWon: false,
    firstClick: true,
    gridContainer : document.getElementById("gridContainer1"),
    isPlaying:true, //para controlar quem está a jogar
    player1: true,
    cntMines : document.getElementById("minasPlayer1"),
    nJogadas: document.getElementById("jogadasPlayer1"),
}

let board2 = {
    grid: [],
    mines: 0,
    width: 0,
    height: 0,
    minesLeft: 0,
    gameOver: false,
    gameWon: false,
    firstClick: true,
    isPlaying:false,
    player1: false,
    gridContainer : document.getElementById("gridContainer2"),
    cntMines : document.getElementById("minasPlayer2"),
    nJogadas: document.getElementById("jogadasPlayer2"),
}

let clickTimer;

window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    let colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem('color') != null) {
        colorPicker.value = localStorage.getItem('color');
    }
   
    BuildBoards();
    changeColour();
 
}



function BuildBoards(){
  
    let boardWidth = localStorage.getItem("Width");
    let boardHeight = localStorage.getItem("Height");
    let mines = localStorage.getItem("Mines");
    //let cntMines = document.getElementById("minesLeft");

    if (boardWidth != null && boardHeight != null && mines != null) {
        board1.gridContainer.style.gridTemplateColumns = "repeat(" + boardWidth + ", 1fr)";
        board2.gridContainer.style.gridTemplateColumns = "repeat(" + boardWidth + ", 1fr)";
        board1.height = board2.height= boardHeight;
        board1.width = board2.width = boardWidth;
        board1.mines = board2.mines = mines;
    }
    else { //No cado do user nunca ter mudado a dimensão
        board1.gridContainer.style.gridTemplateColumns = "repeat(9, 1fr)";
        board2.gridContainer.style.gridTemplateColumns = "repeat(9, 1fr)";
        board1.height = board2.height = 9;
        board1.width = board2.width = 9;
        board1.mines = board2.mines = 10;
    }

    buildBoard(board1,board2);
    buildBoard(board2,board1);

    board2.gridContainer.style.opacity = 0.25;
}

function buildBoard(board,otherBoard){
    board.cntMines.innerHTML=board.mines;
    for (let height = 0; height < board.height; height++) {
        board.grid[height] = [];
        for (let width = 0; width < board.width; width++) {
            let element = document.createElement('div'); //Função anónima para passar func com argumento se não a func executa enquanto a página carrega
            let cell = new Cell(height, width, element, board , function() { gameOver(board,otherBoard) } ,function() { gameWon(board,otherBoard) });
            cell.element.className = 'grid-item';
            cell.element.id = height + '-' + width;
            cell.element.addEventListener('click', (e) => {
                //Se o botão esquerdo for clicado esperar um bocadinho para ver se o click é double click
                if (board.isPlaying && !cell.revealed)
                          { 
                            //cell.gameWin(); //Para testar o scoreboard
                            cell.reveal();
                            board.isPlaying = false;
                            otherBoard.isPlaying = true;
                            board.gridContainer.style.opacity = 0.25;
                            otherBoard.gridContainer.style.opacity = 1;
                            board.nJogadas.innerHTML = parseInt(board.nJogadas.innerHTML) + 1;}
                       
            });
            cell.element.addEventListener('contextmenu', (e) => { e.preventDefault(); cell.flag();
                board.cntMines.innerHTML = board.mines - board.minesLeft;
                }); //Atualiza o contador de minas });
            cell.element.addEventListener('dblclick', () => { clearTimeout(clickTimer); cell.mark() });
            board.gridContainer.appendChild(element);
            board.grid[height][width] = cell;
        }
        //Dar cor ao tabuleiro


    }
}

let loadingPage=false;
function gameOver(board,otherBoard){
   
    explosionSound.play();
    board.gameOver = true;
    board.gameWon = false;
    otherBoard.gameOver=true;
    otherBoard.gameWon=true;
    otherBoard.grid[0][0].gameWin(); //Avisa ao player que o outro já ganhou
    for (let height = 0; height < board.height; height++) {
        for (let width = 0; width < board.width; width++) {
            board.grid[height][width].reveal();
        }
    }
    loadingPage=true;  //para poder cancelar com o botão de restart se o pusermos
    delay(2500).then(() =>{if(loadingPage==true) window.location.href = "score.html"})
}

function gameWon(board){
    board.gameWon = true;
    board.gameOver = true;
    window.confetti();
    let originx = board.player1? 0:1; //controlar se os conffetis vão para o lado esquerdo ou direito
    setInterval(function(){
        confetti({
            particleCount: 242,
            startVelocity: 30,
            spread: 360,
            origin: {
              x: originx,
              // since they fall down, start a bit higher than random
              y: Math.random() - 0.2
            }
          });
        window.confetti();
    }, 500);
    clapSound.play();

    if (localStorage.getItem("Difficulty") != null && localStorage.getItem("Difficulty") != "Custom") {
        let allScores = JSON.parse(localStorage.getItem("scoresMultiplayer"));

        if (allScores == null) allScores = [];
        
        //Para o tempo ficar em MM:SS p.ex. 00:07 
        

        let newScore = {
            name: localStorage.getItem("username"),
            difficulty: localStorage.getItem("Difficulty"),
            nPlays: board.nJogadas.innerHTML,
            boardStats: board.height + "x" + board.width + "x" + board.mines,
        }
        allScores.push(newScore);
        localStorage.setItem("scoresMultiplayer", JSON.stringify(allScores));
    }

    loadingPage=true; //para poder cancelar com o botão de restart se o pusermos
    delay(3000).then(() =>{ if(loadingPage==true) window.location.href = "score.html";  })
   
    
};



function calcScore(){

    // nº minas encontradas * - (newTempo - tempoantigo)?
}

function addScore(){
    //meter o tempo no localstorage
    localStorage.setItem("Time",newTempo.value)
}
