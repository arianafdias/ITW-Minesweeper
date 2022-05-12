/* Constantes / Variaveis  ------------------------------------------------- */


let cronometro;
let clickTimer; //Timer para destinguir click de double click
let timerStarted;

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

class Cell {

    constructor(x, y, element) {
        this.x = x;
        this.y = y;
        this.element = element;
        this.isMine = false;
        this.revealed = false;
        this.flagged = false;
        this.marked = false;
    }
    /**
     * Reveals the cell and its neighbors if it is not a mine and if it has no neighbors that are mines
     * @returns {void}
    */
    reveal() {
        this.revealed = true;
        if (this.isMine) {
            this.element.innerHTML = "💣";
            explosionSound.play();
            //gameOver();
        } else {
            let neighborMines = this.getNeighborMines();
            if (neighborMines === 0) {
                this.element.style.opacity = 0.6;
                this.getNeighbors().forEach(neighbor => {
                    if (!neighbor.revealed) {
                        neighbor.reveal();
                        neighbor.element.style.opacity = 0.6;
                    }
                });
            }
            else {
                this.element.innerHTML = neighborMines;
                this.element.style.opacity = 0.6;
            }
        }
    }
    /**
     * Flags the cell and changes the mine counter if it is not revealed
     * @returns {void}
    */
    flag() {
        if (!this.revealed) {
            this.flagged = !this.flagged;
            board.minesLeft = this.flagged ? board.minesLeft + 1 : board.minesLeft - 1;
            this.element.innerHTML = this.flagged ? "🚩" : "";
        }
    }
    /** //TODO - Implementar Imagem da Flag
     * Marks the cell if it is not revealed
     * @returns {void}
    */
    mark() {
        if (!this.revealed) {
            this.marked = !this.marked;
            this.element.innerHTML = this.marked ? "<img src=\"https://www.thedome.org/wp-content/uploads/2019/06/300x300-Placeholder-Image.jpg\" width=\"25px\" height=\"25px\">" : "";
        }
    }
    /**
    Gets the number of mines in the neighbors of the cell
    * @returns {number}
    */
    getNeighborMines() {
        let neighbors = this.getNeighbors();
        let count = 0;
        neighbors.forEach(neighbor => {
            if (neighbor.isMine) {
                count++;
            }
        });
        return count;
    }
    /**
     * Gets the neighbors of the cell that becomes (0,0)

     * (-1,-1) (-1,0) (-1,1)
     * (0,-1) (0,0) (0,-1)
     * (1,-1) (1,0) (1,1)
        * @returns {Array}
    */
    getNeighbors() {
        let neighbors = [];
        for (let horizontal = -1; horizontal < 2; horizontal++) {
            for (let vertical = -1; vertical < 2; vertical++) {

                let neighborX = this.x + horizontal;
                let neighborY = this.y + vertical;

                if (horizontal === 0 && vertical === 0 || (neighborX < 0 || neighborY < 0 || neighborX >= board.height || neighborY >= board.width)) {
                    continue;
                }
                neighbors.push(board.grid[neighborX][neighborY]);
            }
        }
        return neighbors;
    }
}
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

//var explosionSound = new Audio('../audio/explosion.mp3');
var explosionSound  = new Audio('../assets/audio/explosion.mp3');

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
            let cell = new Cell(height, width, element);
            cell.element.className = 'grid-item';
            cell.element.id = height + '-' + width;
            cell.element.addEventListener('click', (e) => {
                //Se o botão esquerdo for clicado esperar um bocadinho para ver se o click é double click
                if (e.detail === 1) {
                    clickTimer = setTimeout(() => {
                        onCellClick(cell);
                    }, 119)
                }
            });
            cell.element.addEventListener('contextmenu', (e) => { e.preventDefault(); onRightClick(cell) });
            cell.element.addEventListener('dblclick', () => { clearTimeout(clickTimer); cell.mark() });
            gridContainer.appendChild(element);
            this.board.grid[height][width] = cell;
        }
        //Dar cor ao tabuleiro
    }
    changeColour();
}

/**
 * Trigger on cell right click
 * @param {Cell} cell The cell that was right clicked 
*/
function onRightClick(cell) {
    cell.flag();
    if (!cell.isFlagged) {
        this.board.minesLeft--;
    } else this.board.minesLeft++;
}

/**
 * Trigger on cell left click
 * @param {Cell} cell The cell that was clicked
    */

function onCellClick(cell) {
    //Handle First Click
    if (board.firstClick) {
        board.firstClick = false;
        //startTimer();
        //Create bomb numbers
        let minePositions = randomInts(board.mines, board.width * board.height, [cell.x * cell.y + cell.y]);
        //Populate cells with bombs (except the clicked cell)
        board.grid.forEach(row => {
            row.forEach(cell => {
                if (minePositions.includes(cell.x * cell.y + cell.y)) {
                    cell.isMine = true;
                }
            }
            );
        });
    }

    cell.reveal();
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

/**
 * Function to change the color of the page -------------------------
*/

function changeColour() {
    var color = Cookie.get("color");
    var gridContainer = document.getElementsByClassName('grid-container')[0];
    var allGridItems = document.getElementsByClassName("grid-item");
    colorPicker.value = color;

    board.grid.forEach(row => {
        row.forEach(cell => { cell.element.style.borderColor = color; }
        );
    });
    //Change all grid items border color

    var darkerColor = mudarBrightness(color, -55);

    gridContainer.style.backgroundColor = darkerColor;
    var css = '.grid-item:hover{ background-color:' + darkerColor; +'; color: black;}';
    var style = document.createElement('style');

    if (style.styleSheet)
        style.styleSheet.cssText = css;
    else
        style.appendChild(document.createTextNode(css));

    document.getElementsByTagName('head')[0].appendChild(style);

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
    board.gameOver = True
    alert("Perdeu!, Tente outra vez!")
    window.location.href = "scoreindivid.html";
    

}