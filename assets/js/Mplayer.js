import Cell from './Cell.js';

let board1 = {
    grid: [],
    mines: 0,
    width: 0,
    height: 0,
    minesLeft: 0,
    gameOver: false,
    gameWon: false,
    firstClick: true,
    isPlaying:true, //para controlar quem está a jogar
    player1: true,
    gridContainer : document.getElementById("gridContainer1"),
    //c ntMines : document.getElementById("minesLeft1")
    // tempo: document.getElementById("tempo1")
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
    cntMines : document.getElementById("minesLeft2")
   // tempo: document.getElementById("tempo2")
}


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
    let gridContainer1 = document.getElementById("gridContainer1");
    let gridContainer2 = document.getElementById("gridContainer2");
    let boardWidth = localStorage.getItem("Width");
    let boardHeight = localStorage.getItem("Height");
    let mines = localStorage.getItem("Mines");
    //let cntMines = document.getElementById("minesLeft");

    if (boardWidth != null && boardHeight != null && mines != null) {
        gridContainer1.style.gridTemplateColumns = "repeat(" + boardWidth + ", 1fr)";
        gridContainer2.style.gridTemplateColumns = "repeat(" + boardWidth + ", 1fr)";
        board1.height = board2.height= boardHeight;
        board1.width = board2.width = boardWidth;
        board1.mines = board2.mines = mines;
    }
    else { //No cado do user nunca ter mudado a dimensão
        gridContainer1.style.gridTemplateColumns = "repeat(9, 1fr)";
        gridContainer2.style.gridTemplateColumns = "repeat(9, 1fr)";
        board1.height = board2.height = 9;
        board1.width = board2.width = 9;
        board1.mines = board2.mines = 10;
    }


    buildBoard(board1,gridContainer1,board2);
    buildBoard(board2,gridContainer2,board1);

    gridContainer2.style.opacity = 0.5;
}

function buildBoard(board,gridContainer,otherBoard){
 

    for (let height = 0; height < board.height; height++) {
        board.grid[height] = [];
        for (let width = 0; width < board.width; width++) {
            let element = document.createElement('div'); //Função anónima para passar func com argumento se não a func executa enquanto a página carrega
            let cell = new Cell(height, width, element, board , function() { gameOver(board) } ,function() { gameWon(board) });
            cell.element.className = 'grid-item';
            cell.element.id = height + '-' + width;
            cell.element.addEventListener('click', (e) => {
                //Se o botão esquerdo for clicado esperar um bocadinho para ver se o click é double click
                if (board.isPlaying)
                    if (e.detail === 1) {
                        clickTimer = setTimeout(() => {
                            cell.reveal();
                            board.isPlaying = false;
                            otherBoard.isPlaying = true;
                            board.gridContainer.style.opacity = 0.5;
                            otherBoard.gridContainer.style.opacity = 1;
                            let minesToShow = board.mines - board.minesLeft;
                            cntMines.innerText = minesToShow.toString(); //Atualiza o contador de minas
                        }, 119)
                    }
            });
            cell.element.addEventListener('contextmenu', (e) => { e.preventDefault(); cell.flag();
                let minesToShow = board.mines - board.minesLeft;
                cntMines.innerText = minesToShow.toString();}); //Atualiza o contador de minas });
            cell.element.addEventListener('dblclick', () => { clearTimeout(clickTimer); cell.mark() });
           /* cell.element.style.fontSize="xx-small";
            cell.element.style.width="3em";
            cell.element.style.height="3em";
            cell.element.style.padding="0.5em";*/
            gridContainer.appendChild(element);
            board.grid[height][width] = cell;
        }
        //Dar cor ao tabuleiro


    }
}

//Negativo fica mais esquro
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

function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    if (localStorage.getItem('color') != null) 
        colorPicker.value = localStorage.getItem('color');
    let navbar = document.getElementsByClassName("navbar");
    let colorPickerValue = document.getElementById("colorPicker").value;
    let gridContainer1 = document.getElementById("gridContainer1");
    let gridContainer2 = document.getElementById("gridContainer2");
    let allGridItems = document.getElementsByClassName("grid-item");

    let footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    navbar[0].style.backgroundColor = colorPickerValue;

    //Change all grid items border color
    for (let i = 0; i < allGridItems.length; i++) 
        allGridItems[i].style.borderColor = colorPickerValue;
    
    let darkerColor = mudarBrightness(colorPickerValue, -55);
    gridContainer1.style.backgroundColor = darkerColor;
    gridContainer2.style.backgroundColor = darkerColor;
    let css = '.grid-item:hover{ background-color:' + darkerColor; +'; color: black;}';
    let style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
}

function gameOver(board){
    let explosionSound  = new Audio('../assets/audio/explosion.mp3');

    explosionSound.play();
    board.gameOver = true;
    board.gameWon = false;
    for (let height = 0; height < board.height; height++) {
        for (let width = 0; width < board.width; width++) {
            board.grid[height][width].reveal();
        }
    }
    cronometro = clearInterval(cronometro);
   delay(1).then(() =>{alert("Perdeste! :( ");})
    
}

function gameWon(board){
    board.gameWon = true;
    board.gameOver = true;
    window.confetti();
    let originx = board.player1? 0:1; //controlar se os conffetis vão para o lado esquerdo ou direito
    setInterval(function(){
        confetti({
            particleCount: 100,
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

    delay(3000).then(() =>{ window.location.href = "scoreindivid.html";    })
   
    
};
