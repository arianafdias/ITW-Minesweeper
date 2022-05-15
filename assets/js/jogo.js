window.onload = function () {
  
    var slider1 = document.getElementById("slider1");
    var slider2 = document.getElementById("slider2");
    var slider3 = document.getElementById("slider3");
    var lbl1 = document.getElementById("lbl1");
    var lbl2 = document.getElementById("lbl2");
    var lbl3 = document.getElementById("lbl3");
    var dificultySelector = document.getElementById("select-css");
    var mineDensity = document.getElementById("mineDensity");
    dificultySelector.onchange = function(){ changeDificulty(dificultySelector.value);}
        
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    var colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem("color") != null) {
        colorPicker.value = localStorage.getItem("color");
    }
    changeColour();
    if(localStorage.getItem("Dificulty") != null){
        dificulty=localStorage.getItem("Dificulty");
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
        localStorage.setItem("Height",this.value);
    }

    slider3.oninput = function () {
        lbl3.innerHTML = this.value;
        density=(this.value * 100 / (slider1.value * slider2.value)).toFixed(2);
        while(density>100){ //While density>100 change the other 2 sliders to make the density lower
            if(parseInt(slider1.value)+1<=slider1.max)
           { 
               slider1.value++;
               lbl1.innerHTML=  parseInt(lbl1.innerHTML)+1;

        }
        if(parseInt(slider2.value)+1<=slider2.max)
              {
            slider2.value++;
            lbl2.innerHTML++;
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
        case "Easy": //9x9 10 mines
            slider1.value = lbl1.innerHTML = slider2.value = lbl2.innerHTML = 9;
            slider3.value = lbl3.innerHTML = 10;
            slider1.style.display = slider2.style.display  = slider3.style.display = "none";
            localStorage.setItem("Height", 9);
            localStorage.setItem("Width", 9);
            localStorage.setItem("Mines", 10);
            localStorage.setItem("Dificulty", "Easy");
            mineDensity.innerHTML = '15.63%'
            break;
        case "Normal": //16x16 40 mines
            slider1.value = lbl1.innerHTML = slider2.value = lbl2.innerHTML = 16;
            slider3.value = lbl3.innerHTML = 40;
            slider1.style.display = slider2.style.display = slider3.style.display = "none";
            mineDensity.innerHTML = '15.63%'
            localStorage.setItem("Height", 16);
            localStorage.setItem("Width", 16);
            localStorage.setItem("Mines", 40);
            localStorage.setItem("Dificulty", "Normal");
            break;
        case "Hard": //30x16 99 mines
            slider1.value = lbl1.innerHTML = 30;
            slider2.value = lbl2.innerHTML = 16;
            slider3.value =  lbl3.innerHTML = 99;
            slider1.style.display =  slider2.style.display =  slider3.style.display = "none";
            mineDensity.innerHTML = '20.63%'
            localStorage.setItem("Height", 30);
            localStorage.setItem("Width", 16);
            localStorage.setItem("Mines", 99);
            localStorage.setItem("Dificulty", "Hard");
            break;
        case "Custom":
            slider1.style.display =   slider2.style.display =   slider3.style.display = "block";
            if(localStorage.getItem("Height") == null && localStorage.getItem("Width") == null && localStorage.getItem("Mines") == null){
                //Default Values
            slider1.value = lbl1.innerHTML = 30;
            slider2.value = lbl2.innerHTML = 24;
            slider3.max = (30) * (24) -1;
            slider3.value = 125 //26.04% mine density
            lbl3.innerHTML = Math.floor(29 * (23) * 0.25);
            mineDensity.innerHTML = "26.04%"
            localStorage.setItem("Height", 30);
            localStorage.setItem("Width", 24);
            localStorage.setItem("Mines", 125);
            localStorage.setItem("Dificulty", "Custom");
            break;
    } else{
        slider1.value = lbl1.innerHTML = localStorage.getItem("Height");
        slider2.value = lbl2.innerHTML = localStorage.getItem("Width");
        slider3.value = lbl3.innerHTML = localStorage.getItem("Mines");
        slider3.max = (30) * (24) -1;
        mineDensity.innerHTML = ((slider3.value * 100 / (slider1.value * slider2.value)).toFixed(2)).toString() + "%";
        localStorage.setItem("Dificulty", "Custom");
    }
}
}

function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    var navbar = document.getElementsByClassName("navbar");
    var colorPickerValue = document.getElementById("colorPicker").value;
    var element = document.getElementById("multicolor5");
    var element2 = document.getElementById("multicolor6");
    //Mudar a cor de um elemento pseudo-elemento (n sei pk está lento mas até ficou fixe)
    var css = 'input[type="range"]::-webkit-slider-thumb {-webkit-appearance: none;background-color:' + colorPickerValue + ';width: 30px;height: 30px;border-radius: 50%;border: 2px solid white;cursor: pointer;transition: .3s ease-in-out;}​';
    var style = document.createElement('style');
    var footer = document.getElementById("footer");
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


