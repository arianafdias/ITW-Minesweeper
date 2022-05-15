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

    export default class Cell {

        constructor(x, y, element,board,gameOver) {
            this.x = x;
            this.y = y;
            this.board=board;
            this.element = element;
            this.isMine = false;
            this.revealed = false;
            this.flagged = false;
            this.marked = false;
            this.gameOver = gameOver;
        }
        /**
         * Reveals the cell and its neighbors if it is not a mine and if it has no neighbors that are mines
         * @returns {void}
        */
        reveal() {
            if (this.board.firstClick) {
                this.board.firstClick = false;
                //startTimer();
                //Create bomb numbers
                let minePositions = randomInts(this.board.mines, this.board.width * this.board.height, [this.board.width * this.x + (this.y+1)]);
                //Populate cells with bombs (except the clicked cell)
                this.board.grid.forEach(row => {
                    row.forEach(cell => {
                        if (minePositions.includes(this.board.width * cell.x + (cell.y+1))) {
                            cell.isMine = true;
                        }
                    }
                    );
                });
            }
            this.revealed = true;
            if (this.isMine) {
                this.element.innerHTML = "💣";
                if(!this.board.gameOver)
                this.gameOver();
            } else {
                this.board.minesLeft--;
                let neighborMines = this.getNeighborMines();
                if (neighborMines === 0) {
                    this.element.style.opacity = 0.6;
                    this.getNeighbors().forEach(neighbor => {
                        if (!neighbor.revealed) {
                            neighbor.element.style.opacity = 0.6;
                            neighbor.reveal();
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
                this.board.minesLeft = this.flagged ? this.board.minesLeft + 1 : this.board.minesLeft - 1;
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
    
                    if (horizontal === 0 && vertical === 0 || (neighborX < 0 || neighborY < 0 || neighborX >= this.board.height || neighborY >= this.board.width)) {
                        continue;
                    }
                    neighbors.push(this.board.grid[neighborX][neighborY]);
                }
            }
            return neighbors;
        }
        restart() {
            this.isMine = false;
            this.revealed = false;
            this.flagged = false;
            this.marked = false;
            this.element.innerHTML = "";
            this.element.style.opacity = 1;
        }

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
        let number = Math.floor(Math.random() * max) + 1
        if (!blacklist.includes(number))
            set.add(number)
    }
    return Array.from(set);
}
    

function gameWon(){
    this.board.gameOver = true;
    this.board.gameWon = true;
    for (let height = 0; height < this.board.height; height++) {
        for (let width = 0; width < this.board.width; width++) {
            this.board.grid[height][width].reveal();
        }
    }
}