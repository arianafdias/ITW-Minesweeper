let EASY_BOARD_HEIGHT = 9;
let EASY_BOARD_WIDTH = 9;
let EASY_BOARD_MINES = 10;
let EASY_BOARD_DENISTY = '15.63%';


let MEDIUM_BOARD_HEIGHT = 16;
let MEDIUM_BOARD_WIDTH = 16;
let MEDIUM_BOARD_MINES = 40;
let MEDIUM_BOARD_DENISTY = '15.63%';

let HARD_BOARD_HEIGHT = 30;
let HARD_BOARD_WIDTH = 16;
let HARD_BOARD_MINES = 99;
let HARD_BOARD_DENISTY = '20.63%';

let CUSTOM_BOARD_HEIGHT = 30;
let CUSTOM_BOARD_WIDTH = 24;
let CUSTOM_BOARD_MINES = 125;
let CUSTOM_BOARD_DENISTY = '26.04%';
let CUSTOM_BOARD_MINESMAX = CUSTOM_BOARD_HEIGHT * CUSTOM_BOARD_WIDTH - 1;

window.onload = function () {
  
    let slider1 = document.getElementById("slider1");
    let slider2 = document.getElementById("slider2");
    let slider3 = document.getElementById("slider3");
    let lbl1 = document.getElementById("lbl1");
    let lbl2 = document.getElementById("lbl2");
    let lbl3 = document.getElementById("lbl3");
    let dificultySelector = document.getElementById("select-css");
    let mineDensity = document.getElementById("mineDensity");
    dificultySelector.onchange = function(){ changeDificulty(dificultySelector.value);}
        
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    let colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem("color") != null) {
        colorPicker.value = localStorage.getItem("color");
    }
    changeColour();
    if(localStorage.getItem("Difficulty") != null){
        dificulty=localStorage.getItem("Difficulty");
        changeDificulty(dificulty);
        dificultySelector.value = dificulty;

  }
    slider1.oninput = function () {
        lbl1.innerHTML = this.value;
        mineDensity.innerHTML = ((slider3.value * 100 / (this.value * slider2.value)).toFixed(2)).toString() + "%";
    }
    slider1.onchange = function () {
        localStorage.setItem("Height",this.value);
    }

    slider2.oninput = function () {
        lbl2.innerHTML = this.value;
        mineDensity.innerHTML = ((slider3.value * 100 / (slider1.value * this.value)).toFixed(2)).toString() + "%";
    }
    slider2.onchange = function () {
        localStorage.setItem("Width",this.value);
    }

    slider3.oninput = function () {
        lbl3.innerHTML = this.value;
        density=(this.value * 100 / (slider1.value * slider2.value)).toFixed(2);
        while(density>100){ //While density>100 change the other 2 sliders to make the density lower
            if(parseInt(slider1.value)+1<=slider1.max)
           { 
               slider1.value++;
               lbl1.innerHTML=  parseInt(lbl1.innerHTML)+1;
               localStorage.setItem("Height",slider1.value);

        }
        if(parseInt(slider2.value)+1<=slider2.max)
              {
            slider2.value++;
            lbl2.innerHTML++;
            localStorage.setItem("Width",slider2.value);
        }
            density=(this.value * 100 / (slider1.value * slider2.value)).toFixed(2);
        }
        mineDensity.innerHTML = density.toString() + "%";
    }
    slider3.onchange = function () {
        localStorage.setItem("Mines", this.value);
    }

}

function changeDificulty(dificulty){
    switch (dificulty) {
        case "Fácil": //9x9 10 mines
            slider1.value = lbl1.innerHTML = slider2.value = lbl2.innerHTML = EASY_BOARD_HEIGHT;
            slider3.value = lbl3.innerHTML = EASY_BOARD_MINES;
            slider1.style.display = slider2.style.display  = slider3.style.display = "none";
            localStorage.setItem("Height", EASY_BOARD_HEIGHT);
            localStorage.setItem("Width", EASY_BOARD_WIDTH);
            localStorage.setItem("Mines", EASY_BOARD_MINES);
            localStorage.setItem("Difficulty", "Fácil");
            mineDensity.innerHTML = EASY_BOARD_DENISTY;
            break;
        case "Normal": //16x16 40 mines
            slider1.value = lbl1.innerHTML =    slider2.value = lbl2.innerHTML = MEDIUM_BOARD_HEIGHT;
            slider3.value = lbl3.innerHTML = MEDIUM_BOARD_MINES;
            slider1.style.display = slider2.style.display = slider3.style.display = "none";
            mineDensity.innerHTML = MEDIUM_BOARD_DENISTY;
            localStorage.setItem("Height", MEDIUM_BOARD_HEIGHT );
            localStorage.setItem("Width", MEDIUM_BOARD_WIDTH);
            localStorage.setItem("Mines", MEDIUM_BOARD_MINES);
            localStorage.setItem("Difficulty", "Normal");
            break;
        case "Difícil": //30x16 99 mines
            slider1.value = lbl1.innerHTML =HARD_BOARD_HEIGHT;
            slider2.value = lbl2.innerHTML = HARD_BOARD_WIDTH;
            slider3.value =  lbl3.innerHTML = HARD_BOARD_MINES;
            slider1.style.display =  slider2.style.display =  slider3.style.display = "none";
            mineDensity.innerHTML = HARD_BOARD_DENISTY;
            localStorage.setItem("Height", HARD_BOARD_HEIGHT);
            localStorage.setItem("Width", HARD_BOARD_WIDTH);
            localStorage.setItem("Mines", HARD_BOARD_MINES);
            localStorage.setItem("Difficulty", "Difícil");
            break;
        case "Custom":
            slider1.style.display =   slider2.style.display =   slider3.style.display = "block";
            if(localStorage.getItem("Height") == null && localStorage.getItem("Width") == null && localStorage.getItem("Mines") == null){
                //Default Values
            slider1.value = lbl1.innerHTML = CUSTOM_BOARD_HEIGHT;
            slider2.value = lbl2.innerHTML = CUSTOM_BOARD_WIDTH;
            slider3.max = CUSTOM_BOARD_MINESMAX;
            slider3.value = CUSTOM_BOARD_MINES //26.04% mine density
            lbl3.innerHTML = CUSTOM_BOARD_MINES;
            mineDensity.innerHTML = CUSTOM_BOARD_DENISTY
            localStorage.setItem("Height", CUSTOM_BOARD_HEIGHT);
            localStorage.setItem("Width", CUSTOM_BOARD_WIDTH);
            localStorage.setItem("Mines", CUSTOM_BOARD_MINESMAX);
            localStorage.setItem("Difficulty", "Custom");
            break;
    } else{
        slider1.value = lbl1.innerHTML = localStorage.getItem("Height");
        slider2.value = lbl2.innerHTML = localStorage.getItem("Width");
        slider3.value = lbl3.innerHTML = localStorage.getItem("Mines");
        slider3.max = CUSTOM_BOARD_MINESMAX;
        mineDensity.innerHTML = ((slider3.value * 100 / (slider1.value * slider2.value)).toFixed(2)).toString() + "%";
        localStorage.setItem("Difficulty", "Custom");
    }
}
}

function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    let navbar = document.getElementsByClassName("navbar");
    let colorPickerValue = document.getElementById("colorPicker").value;
    let element = document.getElementById("multicolor5");
    let element2 = document.getElementById("multicolor6");
    //Mudar a cor de um elemento pseudo-elemento (n sei pk está lento mas até ficou fixe)
    let css = 'input[type="range"]::-webkit-slider-thumb {-webkit-appearance: none;background-color:' + colorPickerValue + ';width: 30px;height: 30px;border-radius: 50%;border: 2px solid white;cursor: pointer;transition: .3s ease-in-out;}​';
    let style = document.createElement('style');
    let footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);

    navbar[0].style.backgroundColor = colorPickerValue;
    element.style.background = colorPickerValue;
    element2.style.background = colorPickerValue;

}

function openSinglePlayer(){
    //If login
    density=(slider3.value * 100 / (slider1.value * slider2.value)).toFixed(2);
    if(density>100){
        alert("Densidade demasiado alta para o tamanho escolhido");
        return;
    }
    if(localStorage.getItem("logged-in")==="true")
    
        window.location.href = "Splayer.html";
    
else{ alert("Tens que estar logado para jogar");
window.location.href = "login.html";
}
}


