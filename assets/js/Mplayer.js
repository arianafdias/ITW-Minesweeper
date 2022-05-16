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
    playable:true, //para controlar quem está a jogar
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
    playable:false,
}


window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    var colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem('color') != null) {
        colorPicker.value = localStorage.getItem('color');
    }
    changeColour();

}



function BuildBoards(){
    var gridContainer1 = document.getElementById("gridContainer1");
    var gridContainer2 = document.getElementById("gridContainer2");
    let boardWidth = localStorage.getItem("Width");
    let boardHeight = localStorage.getItem("Height");
    let mines = localStorage.getItem("Mines");
    //let cntMines = document.getElementById("minesLeft");

    buildABoard(board1,gridContainer1);
    buildABoard(board2,gridContainer2);
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
