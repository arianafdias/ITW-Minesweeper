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
var board = {
    grid: [],
    mines: 0,
    width: 0,
    height: 0,
    minesLeft: 0,
    gameOver: false,
    gameWon: false,
    firstClick: true,
}


window.onload = BuildBoard;

/**
 * Build the board with the cells and add event listeners to each cell -------------------------
*/

function BuildBoard() {
    var gridContainer = document.getElementsByClassName('grid-container')[0];
    let boardWidth = Cookie.get("Width");
    let boardHeight = Cookie.get("Height");
    let mines = Cookie.get("Mines");

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

    //timer
    timerStarted = false;

    //Create 2D array of cells
    for (let height = 0; height < board.height; height++) {
        board.grid[height] = [];
        for (let width = 0; width < board.width; width++) {
            let element = document.createElement('div');
            let cell = new Cell(height, width, element, board);
            cell.element.className = 'grid-item';
            cell.element.id = height + '-' + width;
            cell.element.addEventListener('click', (e) => {
                //Se o botão esquerdo for clicado esperar um bocadinho para ver se o click é double click
                if (e.detail === 1) {
                    clickTimer = setTimeout(() => {
                        cell.reveal();
                    }, 119)
                }
            });
            cell.element.addEventListener('contextmenu', (e) => { e.preventDefault(); cell.flag() });
            cell.element.addEventListener('dblclick', () => { clearTimeout(clickTimer); cell.mark() });
            gridContainer.appendChild(element);
            board.grid[height][width] = cell;
        }
        //Dar cor ao tabuleiro
    }
    changeColour();
    /**
     * Reveal all cells
    for (let height = 0; height < board.height; height++) {
        for (let width = 0; width < board.width; width++) {
            board.grid[height][width].reveal();
        }
    }
    /**
}

/**
 * Function to generate <quantity> integers from 0 to <max> (except <blacklist>) without repetition -------------------------
 * @param {number} quantity The number of integers to generate
 * @param {number} max The maximum value of the integers
 * @param {number[]} blacklist The integers that should not be generated (e.g. the position of the clicked cell)) 
*/
}

/**
 * Function to change the color of the page -------------------------
*/
function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    if (Cookie.get("color") != null) 
        colorPicker.value = Cookie.get("color");
    var navbar = document.getElementsByClassName("navbar");
    var colorPickerValue = document.getElementById("colorPicker").value;
    var gridContainer = document.getElementsByClassName("grid-container");
    var allGridItems = document.getElementsByClassName("grid-item");
    navbar[0].style.backgroundColor = colorPickerValue;
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


function gameOver(){
    board.gameOver = True;
    alert("Perdeu!, Tente outra vez!");
    window.location.href = "scoreindivid.html";
    

}

function gameWon(){
    board.gameWon = True;
    alert("Parabéns!, Ganhou!");
    //calcScore()
    //addscore()
    window.location.href = "scoreindivid.html";    
};



