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

  
   

/* Constantes / Variaveis  ------------------------------------------------- */


let cronometro;
let clickTimer; //Timer para destinguir click de double click
let timerStarted;


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
}


window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    var colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem('color') != null) {
        colorPicker.value = localStorage.getItem('color');
    }
    document.getElementById("btnReset").addEventListener('click', () => resetBoard());
    changeColour();
    BuildBoard();
    

}

/**
 * Build the board with the cells and add event listeners to each cell -------------------------
*/



function BuildBoard() {
    var gridContainer = document.getElementsByClassName('grid-container')[0];
    let boardWidth = localStorage.getItem("Width");
    let boardHeight = localStorage.getItem("Height");
    let mines = localStorage.getItem("Mines");
    let cntMines = document.getElementById("minesLeft");

    if (boardWidth != null && boardHeight != null && mines != null) {
        gridContainer.style.gridTemplateColumns = "repeat(" + boardWidth + ", 1fr)";
        board.height = boardHeight;
        board.width = boardWidth;
        board.mines = mines;
        board.minesLeft = mines;
    }
    else { //No cado do user nunca ter mudado a dimensão
        gridContainer.style.gridTemplateColumns = "repeat(9, 1fr)";
        board.height = 9;
        board.width = 9;
        board.mines = 10;
        board.minesLeft = 10;
    }

    cntMines.innerHTML=board.mines;

    //timer
    timerStarted = false;

    //Create 2D array of cells
    for (let height = 0; height < board.height; height++) {
        board.grid[height] = [];
        for (let width = 0; width < board.width; width++) {
            let element = document.createElement('div');
            let cell = new Cell(height, width, element, board , gameOver , gameWon);
            cell.element.className = 'grid-item';
            cell.element.id = height + '-' + width;
            cell.element.addEventListener('click', (e) => {
                //Se o botão esquerdo for clicado esperar um bocadinho para ver se o click é double click
                if (e.detail === 1) {
                    clickTimer = setTimeout(() => {
                        cell.reveal();
                        cntMines.innerHTML = board.minesLeft; //Atualiza o contador de minas
                    }, 119)
                }
                if (board.firstClick === true) {
                    cronometro = setInterval(timer,1000);
                }
            });
            cell.element.addEventListener('contextmenu', (e) => { e.preventDefault(); cell.flag(); cntMines.innerHTML = board.minesLeft.toString();}); //Atualiza o contador de minas });
            cell.element.addEventListener('dblclick', () => { clearTimeout(clickTimer); cell.mark() });
            gridContainer.appendChild(element);
            board.grid[height][width] = cell;
        }
        //Dar cor ao tabuleiro


    }
    
    changeColour();
    
}

/**
 * Function to change the color of the page -------------------------
*/
function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    if (localStorage.getItem('color') != null) 
        colorPicker.value = localStorage.getItem('color');
    var navbar = document.getElementsByClassName("navbar");
    var colorPickerValue = document.getElementById("colorPicker").value;
    var gridContainer = document.getElementsByClassName("grid-container");
    var allGridItems = document.getElementsByClassName("grid-item");
    let btnRestart = document.getElementById("btnReset");
    var footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    navbar[0].style.backgroundColor = colorPickerValue;
    btnRestart.style.backgroundColor = colorPickerValue;
    //Change all grid items border color
    for (var i = 0; i < allGridItems.length; i++) {
        allGridItems[i].style.borderColor = colorPickerValue;
    }
    var darkerColor = mudarBrightness(colorPickerValue, -55);
    gridContainer[0].style.backgroundColor = darkerColor
    var css = '.grid-item:hover{ background-color:' + darkerColor; +'; color: black;}';
    var style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
}

//Para o efeito do hover
function mudarBrightness(cor, percent) {
    let hex = cor;

    // tirar o # se existir
    hex = hex.replace(/^\s*#|\s*$/g, "");

    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);

    const calculatedPercent = (100 + percent) / 100;

    r = Math.round(Math.min(255, Math.max(0, r * calculatedPercent)));
    g = Math.round(Math.min(255, Math.max(0, g * calculatedPercent)));
    b = Math.round(Math.min(255, Math.max(0, b * calculatedPercent)));

    return `#${r.toString(16).toUpperCase()}${g.toString(16).toUpperCase()}${b
        .toString(16)
        .toUpperCase()}`;
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

let explosionSound  = new Audio('../assets/audio/explosion.mp3');
let clapSound = new Audio('../assets/audio/clapclapclapclapclapclapclap.mp3');
function gameOver(){
    
    explosionSound.play();
    board.gameOver = true;
    board.gameWon = false;
    for (let height = 0; height < board.height; height++) {
        for (let width = 0; width < board.width; width++) {
            board.grid[height][width].reveal();
        }
    }
    
 
   // delay(1).then(() =>{alert("Perdeste! :( ");})
    
}

function resetBoard(){
    board.gameOver = false;
    board.gameWon = false;
    for (let height = 0; height < board.height; height++) {
        for (let width = 0; width < board.width; width++) {
            board.grid[height][width].restart();
        }
    }
    document.getElementById("timer").innerHTML = 0;
    board.firstClick=true;
    
}

function gameWon(){
    board.gameWon = true;
    board.gameOver = true;
    window.confetti();
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
    
    delay(3000).then(() =>{ window.location.href = "scoreindivid.html";    })
   
    
};




