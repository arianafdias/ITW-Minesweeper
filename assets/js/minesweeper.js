/* Constantes / Variaveis  ------------------------------------------------- */
let cronometro;
let timerStarted;


class Cell{

    constructor(x, y, mine){
        this.x = x;
        this.y = y;
        this.mine = mine;
        this.revealed = false;
        this.flagged = false;
    }
        
}

var game = {
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
    let dimension = Cookie.get("Width") * Cookie.get("Height");
    let mines = Cookie.get("Mines");
    
    //No cado do user nunca ter mudado a dimensão
   
    if(Cookie.get("Width")!=null && Cookie.get("Height")!=null && Cookie.get("Mines")!=null)
        gridContainer.style.gridTemplateColumns = "repeat(" + Cookie.get("Width") + ", 1fr)";
    else{ gridContainer.style.gridTemplateColumns = "repeat(9, 1fr)";
    dimension=81;}

    //timer
    timerStarted = false;
    //Colocar Minas
    let minePositions = randomInts(mines, dimension); 
    let minePositionsArray = Array.from(minePositions);
    //Create grid-item divs
    for (var i = 0; i < dimension; i++) {
        var gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridContainer.appendChild(gridItem);
    }
    changeColour();
    //Create mines
}
    



/* ------------------------------------------------------------------------- */
/* Gerar Posições das Minas  ------  */

function randomInts(quantity, max){
    const set = new Set()
    while(set.size < quantity) {
      set.add(Math.floor(Math.random() * max) + 1)
    }
    return set
  }



function changeColour()
{var color = Cookie.get("color");

    var allGridItems = document.getElementsByClassName("grid-item");
    colorPicker.value = color;

  
    //Change all grid items border color
    for (var i = 0; i < allGridItems.length; i++) {
        allGridItems[i].style.borderColor = color;
    }
    var darkerColor=mudarBrightness(color, -55);

    gridContainer[0].style.backgroundColor=darkerColor;
    var css = '.grid-item:hover{ background-color:'+darkerColor;+'; color: black;}';
var style = document.createElement('style');

if (style.styleSheet) {
style.styleSheet.cssText = css;
} else {
style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);

}

onclick(){
    if(!timerStarted) {
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