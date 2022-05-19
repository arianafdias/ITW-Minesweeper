import Cell from './Cell.js';
/* ------------------------------------------------------------------------- */
/**
    Class to represent a cell in the board --------------------------------------
    @param {number} x The x position is the Column of the cell
    @param {number} y The y position is the Row of the cell
    @param {boolean} isMine Whether the cell is a mine or not
    @param {HTMLElement} element The element that represents the cell
    @param {boolean} isFlagged Whether the cell is flagged or not
    @param {boolean} isRevealed Whether the cell is revealed or not
    @param {boolean} isMine Whether the cell is a mine or not
 */

  
   

/* Constantes / letiaveis  ------------------------------------------------- */


let cronometro;
let clickTimer; //Timer para destinguir click de double click
let timerStarted;
let explosionSound  = new Audio('../assets/audio/explosion.mp3');
let clapSound = new Audio('../assets/audio/clapclapclapclapclapclapclap.mp3');
let loadingPage=false;


/* ------------------------------------------------------------------------- 
    Object that represents the board --------------------------------------
*/
let board = {
    grid: [],
    mines: 0,
    width: 0,
    height: 0,
    minesLeft: 0,
    gameOver: false,
    gameWon: false,
    firstClick: true,
    isPlaying: true,
    //cntMines : document.getElementById("minesLeft")
    //tempo: document.getElementById("tempo")
}


window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    let colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem('color') != null) {
        colorPicker.value = localStorage.getItem('color');
    }
    document.getElementById("btnReset").addEventListener('click', () => resetBoard());
    
    BuildBoard();
    changeColour();
    document.onkeydown = checkKey;
    

}

/**
 * Build the board with the cells and add event listeners to each cell -------------------------
*/



function BuildBoard() {
    let gridContainer = document.getElementsByClassName('grid-container')[0];
    let boardWidth = localStorage.getItem("Width");
    let boardHeight = localStorage.getItem("Height");
    let mines = localStorage.getItem("Mines");
    let cntMines = document.getElementById("minesLeft");

    if (boardWidth != null && boardHeight != null && mines != null) {
        gridContainer.style.gridTemplateColumns = "repeat(" + boardWidth + ", 1fr)";
        board.height = boardHeight;
        board.width = boardWidth;
        board.mines = mines;
    }
    else { //No cado do user nunca ter mudado a dimensão
        gridContainer.style.gridTemplateColumns = "repeat(9, 1fr)";
        board.height = 9;
        board.width = 9;
        board.mines = 10;
    }

    cntMines.innerText=board.mines;

    //timer
    timerStarted = false;
    let count = 1
    //Create 2D array of cells
    for (let height = 0; height < board.height; height++) {
        board.grid[height] = [];
        for (let width = 0; width < board.width; width++) {
            let element = document.createElement('div');
            let cell = new Cell(height, width, element, board , gameOver , gameWon);
            cell.element.className = 'grid-item';
            cell.element.id = height + '-' + width;
            cell.element.setAttribute('tabindex',count);
            cell.element.dataset.line = height;
            cell.element.dataset.column = width;
            count++;
            cell.element.addEventListener('click', (e) => {
                //Se o botão esquerdo for clicado esperar um bocadinho para ver se o click é double click
                if (e.detail === 1) {
                    clickTimer = setTimeout(() => {
                        cell.reveal();
                        let minesToShow = board.mines - board.minesLeft;
                        cntMines.innerText = minesToShow.toString(); //Atualiza o contador de minas
                    }, 200)
                }
                if (board.firstClick === true) {
                    cronometro = setInterval(timer,1000);
                }
            });
            cell.element.addEventListener('contextmenu', (e) => { e.preventDefault();
                if (cell.flagged === true){
                    cell.question();
                }else{
                    cell.flag();
                    let minesToShow = board.mines - board.minesLeft;
                    cntMines.innerText = minesToShow.toString();
                }}); //Atualiza o contador de minas });
            gridContainer.appendChild(element);
            board.grid[height][width] = cell;
        }
        //Dar cor ao tabuleiro
    }
    changeColour();
    
}




/**
 * Timer Stuff -------------------------
*/

function timer() {
    let tempo_antigo = parseInt(document.getElementById("timer").innerText)
    let novo_tempo = tempo_antigo + 1;
    let newTempo = novo_tempo.toString();
    document.getElementById("timer").innerHTML = newTempo;
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }


function gameOver(){
    
    explosionSound.play();
    board.gameOver = true;
    board.gameWon = false;
    for (let height = 0; height < board.height; height++) {
        for (let width = 0; width < board.width; width++) {
            board.grid[height][width].reveal();
        }
    }
    cronometro = clearInterval(cronometro);
    loadingPage=true;
   delay(2500).then(() =>{if(loadingPage==true) window.location.href = "scoreindivid.html"})
    
}

function resetBoard(){
    loadingPage=false;
    board.gameOver = false;
    board.gameWon = false;
    for (let height = 0; height < board.height; height++) {
        for (let width = 0; width < board.width; width++) {
            board.grid[height][width].restart();
        }
    }
    document.getElementById("timer").innerHTML = 0;
    document.getElementById("minesLeft").innerHTML = board.mines.toString();
    board.firstClick=true;
 
    
}/*
const allScores = 'allScores';
let scores = [];
function Score(username, difficulty,time,seconds,boardStats){
    this.username=username;
    this.difficulty = difficulty;
    this.tempo = time;
    this.segundos = seconds;
    this.stats = boardStats;

}
*/

function gameWon(){
    board.gameWon = true;
    board.gameOver = true;

    for (let height = 0; height < board.height; height++) {
        for (let width = 0; width < board.width; width++) {
            board.grid[height][width].reveal();
        }
    }

    let score = null;

    //Save Score
    /*
    if (localStorage.getItem("Difficulty") != null && localStorage.getItem("Difficulty") != "Custom") {
        let allScores = JSON.parse(localStorage.getItem("scoresIndividuais"));

        if (allScores == null) allScores = [];
        let timeInSeconds = document.getElementById("timer").innerText;
        //Para o tempo ficar em MM:SS p.ex. 00:07 
        let timeInMMSS = Math.floor(timeInSeconds / 60) + ":" + parseInt(timeInSeconds % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        alert("You won!\nYour time: " + timeInMMSS);

        let newScore = {
            name: localStorage.getItem("username"),
            difficulty: localStorage.getItem("Difficulty"),
            time: timeInMMSS.toString(),
            seconds: timeInSeconds.toString(),
            boardStats: board.height + "x" + board.width + "x" + board.mines,
        }
        allScores.push(newScore);
        console.log(allScores);
        localStorage.setItem("scoresIndividuais", JSON.stringify(allScores));
        //Order by time
        allScores.sort((a, b) => a.time < b.time ? -1 : 1);
        //Save only top 10
        allScores = allScores.slice(0, 10);
        localStorage.setItem("top10Individual", JSON.stringify(allScores));
    }*/


    cronometro = clearInterval(cronometro);
    
    setInterval(function(){
        confetti({
            particleCount: 100,
            startVelocity: 30,
            spread: 360,
            origin: {
              x: Math.random(),
              // since they fall down, start a bit higher than random
              y: Math.random() - 0.2
            }
          });
        window.confetti();
    }, 500);
    clapSound.play();
    loadingPage=true; //para poder cancelar com o botão direito
    delay(3000).then(() =>{ if(loadingPage==true) window.location.href = "scoreindivid.html";  })
   
    
};





function calcScore(){

    // nº minas encontradas * - (newTempo - tempoantigo)?
}

function addScore(){
    //meter o tempo no localstorage
    localStorage.setItem("Time",newTempo.value)
}




/* ---- segundo dispositivo ----    */

function checkKey(e) {
    console.log(e.keyCode)
    if ((e.keyCode > 40 || e.keyCode < 36) && e.keyCode !== 32){
        return;
    }
    e.preventDefault();

    e = e||window.event;

    let active_element = document.activeElement;
    //let position = active_element.dataset.cell;

    let line = active_element.dataset.line;
    console.log(line)
    let column = active_element.dataset.column;


    if (e.keyCode == '38'){
        console.log('up')
        let add = Number(line) - 1;
        let el = document.getElementById(add + '-'+column);
        if(el != null){
            el.focus()
        }
    }
    else if (e.keyCode == '40') {
        let add = Number(line) + 1;
        let el = document.getElementById(add + '-' + column);

        if (el != null) {
            el.focus()
        }
    }
    else if (e.keyCode == '37'){
        let add = Number(column) - 1;
        let el = document.getElementById(line + '-'+add);

        if(el != null){
            el.focus()
        }
    }
    else if (e.keyCode == '39'){
        let add = Number(column) + 1;
        let el = document.getElementById(line + '-'+add);

        if(el != null){
            el.focus()
        }

    }

    else if (e.keyCode == '70'){
        let cntMines = document.getElementById("minesLeft");
        let el =  document.getElementById(line+'-'+column)
        if (el.flagged === true){
            el.question();
        }else{
            cell.flag();
            let minesToShow = board.mines - board.minesLeft;
            cntMines.innerText = minesToShow.toString();
        }
    }
    if (e.keyCode =='32'){
        let cntMines = document.getElementById("minesLeft");
        let cell = document.getElementById(line+'-'+column)
        cell.reveal();
        let minesToShow = board.mines - board.minesLeft;
        cntMines.innerText = minesToShow.toString();
    }
}