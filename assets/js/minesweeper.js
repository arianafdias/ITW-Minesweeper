/* Constantes / Variaveis  ------------------------------------------------- */
let cronometro;
let clickTimer; //Timer para destinguir click de double click
let timerStarted;

class Cell {

    constructor(x, y, isMine, element) {
        this.x = x;
        this.y = y;
        this.element = element;
        this.isMine = isMine;
        this.revealed = false;
        this.flagged = false;
        this.marked = false;
    }

    reveal() {
        this.revealed = true;
        if (this.isMine) {
            this.element.innerHTML = "💣";  
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
        else{
        this.element.innerHTML = neighborMines;
        this.element.style.opacity = 0.6;
        }
        }
    }

    flag() {
        if (!this.revealed) {
            this.flagged = !this.flagged;
            board.minesLeft= this.flagged? board.minesLeft+1: board.minesLeft-1;
            this.element.innerHTML = this.flagged ? "🚩" : "";
        }
    }

    mark() {
        if (!this.revealed) {
            this.marked = !this.marked;
            this.element.innerHTML = this.marked ? "<img src=\"https://www.thedome.org/wp-content/uploads/2019/06/300x300-Placeholder-Image.jpg\" width=\"25px\" height=\"25px\">" : "";
        }
    }

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

//FUnction to tell the number of bombs around a Cell

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
            let cell = new Cell(height, width, false, element);
            cell.element.className = 'grid-item';
            cell.element.id = height + '-' + width;
            cell.element.addEventListener('click', (e) => {
               
                if (e.detail === 1) {
                    timer = setTimeout(() => {
                        onMineClick(cell);
                    }, 119)
                }
            });
            cell.element.addEventListener('contextmenu', (e) => {e.preventDefault(); onRightClick(cell) });
            cell.element.addEventListener('dblclick', () => {  clearTimeout(timer);   cell.mark() });
            gridContainer.appendChild(element);
            this.board.grid[height][width] = cell;
        }
        //Dar cor ao tabuleiro
    }
    changeColour();
}

function onRightClick(cell) {
    cell.flag();
    if (!cell.isFlagged) {
        this.board.minesLeft--;
    } else this.board.minesLeft++;
}

function onMineClick(cell) {
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

    if (!cell.flagged && !cell.revealed) {
        cell.reveal();
        if (cell.isMine) {
            gameOver();
        }
        else {
            if (this.board.firstClick) {
                //cronometro = startTimer();
                console.log('holo');
                this.board.firstClick = false;
            }
            //       checkForWin();
        }
    }
}

/* ------------------------------------------------------------------------- */
/* Gerar Posições das Minas  ------  */
function randomInts(quantity, max, blacklist = []) {
    const set = new Set()
    while (set.size < quantity) {
        number = Math.floor(Math.random() * max) + 1
        if (!blacklist.includes(number))
            set.add(number)
    }
    return Array.from(set);
}

function changeColour() {
    var color = Cookie.get("color");
    var gridContainer = document.getElementsByClassName('grid-container')[0];
    var allGridItems = document.getElementsByClassName("grid-item");
    colorPicker.value = color;


    //Change all grid items border color
    for (var i = 0; i < allGridItems.length; i++)
        allGridItems[i].style.borderColor = color;

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

function timer() {
    let tempo_antigo = parseInt(document.getElementById("timer").innerText)
    let novo_tempo = tempo_antigo + 1;
    let newTempo = novo_tempo.toString();
    document.getElementById("timer").innerHTML = newTempo;
}