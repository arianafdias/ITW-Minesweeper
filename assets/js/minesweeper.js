/* Constantes / Variaveis  ------------------------------------------------- */
let cronometro;
let timerStarted;

class Cell {

    constructor(x, y, isMine, element) {
        this.x = x;
        this.y = y;
        this.element = element;
        this.isMine = isMine;
        this.revealed = false;
        this.flagged = false;
    }
    reveal() {
        this.revealed = true;
        this.element.innerHTML = this.isMine ? "💣" : this.getNeighborMines();
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

                if ( horizontal === 0 && vertical === 0 || (neighborX < 0 || neighborY < 0 || neighborX >= board.height || neighborY >= board.width)) {
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

window.onload = function () {
    var gridContainer = document.getElementsByClassName('grid-container')[0];
    let boardWidth = Cookie.get("Width");
    let boardHeight = Cookie.get("Height");
    let mines = Cookie.get("Mines");

    if (boardWidth != null && boardHeight != null && Cookie.get("Mines") != null) {
        gridContainer.style.gridTemplateColumns = "repeat(" + boardWidth + ", 1fr)";
        board.height = boardHeight;
        board.width = boardWidth;
    }
    else { //No cado do user nunca ter mudado a dimensão
        gridContainer.style.gridTemplateColumns = "repeat(9, 1fr)";
        board.height = 9;
        board.width = 9;
    }

    //timer
    timerStarted = false;
    //Colocar Minas
    let minePositions = randomInts(mines, board.width * board.height);

    //Create 2D array of cells
    for (let height = 0; height < board.height; height++) {
        board.grid[height] = [];
        for (let width = 0; width < board.width; width++) {
            let element = document.createElement('div');
            let cell = new Cell( height, width, minePositions.has(width + height * board.width), element);
            cell.element.className = 'grid-item';
            cell.element.id = height + '-' + width;
            cell.element.addEventListener('click', () => { onMineClick(cell) });
            //cell.element.addEventListener('contextmenu',()=>{onMineClick(cell)});
            gridContainer.appendChild(element);
            board.grid[height][width] = cell;

            //Dar cor ao tabuleiro
            changeColour();

        }
    }
    //Reveal all mines
    minePositions.forEach(position => {
        let cell = board.grid[Math.floor(position / board.width)][position % board.width];
        cell.reveal();

    });

    function onMineClick(cell) {
        if (!cell.flagged && !cell.revealed) {
            cell.reveal();
            if (cell.isMine) {
                gameOver();
            }
            else {
                if (board.firstClick) {
                    board.firstClick = false;
                    //           startTimer();
                }
                //       checkForWin();
            }
        }

    }
    /* ------------------------------------------------------------------------- */
    /* Gerar Posições das Minas  ------  */

    function randomInts(quantity, max) {
        const set = new Set()
        while (set.size < quantity) {
            set.add(Math.floor(Math.random() * max) + 1)
        }
        return set
    }



    function changeColour() {
        var color = Cookie.get("color");
        var gridContainer = document.getElementsByClassName('grid-container')[0];
        var allGridItems = document.getElementsByClassName("grid-item");
        colorPicker.value = color;


        //Change all grid items border color
        for (var i = 0; i < allGridItems.length; i++) {
            allGridItems[i].style.borderColor = color;
        }
        var darkerColor = mudarBrightness(color, -55);

        gridContainer.style.backgroundColor = darkerColor;
        var css = '.grid-item:hover{ background-color:' + darkerColor; +'; color: black;}';
        var style = document.createElement('style');

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.getElementsByTagName('head')[0].appendChild(style);

    }

}

function onClick() {
    if (!timerStarted) {
        // start your interval
        timerStarted = true;
        cronometro = setInterval(timer, 1000)
    }
}
function timer() {
    let tempo_antigo = parseInt(document.getElementById("timer").innerText)
    let novo_tempo = tempo_antigo + 1;
    let newTempo = novo_tempo.toString();
    document.getElementById("timer").innerHTML = newTempo;
}



