import Cell from './Cell';

window.onload = function () {
   
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML = `<a onclick="logout()" href="index.html">Logout</a>`;
    var colorPicker = document.getElementById("colorPicker");
    if (Cookie.get("color") != null) {
        colorPicker.value = Cookie.get("color");
    }
    BuildBoard();
    changeColour(); 

}

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

var explosionSound  = new Audio('../assets/audio/explosion.mp3');


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
        this.board.height = boardHeight;
        this.board.width = boardWidth;
        this.board.mines = mines;
    }
    else { //No cado do user nunca ter mudado a dimensão
        gridContainer.style.gridTemplateColumns = "repeat(9, 1fr)";
        this.board.height = 9;
        this.board.width = 9;
        this.board.mines = 10;
    }

    //timer
    timerStarted = false;

    //Create 2D array of cells
    for (let height = 0; height < this.board.height; height++) {
        this.board.grid[height] = [];
        for (let width = 0; width < this.board.width; width++) {
            let element = document.createElement('div');
            let cell = new Cell(height, width, element,board);
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
            this.board.grid[height][width] = cell;
        }
        //Dar cor ao tabuleiro
    }
    changeColour();
}

/**
 * Function to generate <quantity> integers from 0 to <max> (except <blacklist>) without repetition -------------------------
 * @param {number} quantity The number of integers to generate
 * @param {number} max The maximum value of the integers
 * @param {number[]} blacklist The integers that should not be generated (e.g. the position of the clicked cell)) 
*/

function randomInts(quantity, max, blacklist = []) {
    const set = new Set()
    while (set.size < quantity) {
        number = Math.floor(Math.random() * max) + 1
        if (!blacklist.includes(number))
            set.add(number)
    }
    return Array.from(set);
}

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
//Negativo fica mais esquro



