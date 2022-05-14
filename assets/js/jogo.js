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
    if (Cookie.get("color") != null) {
        colorPicker.value = Cookie.get("color");
    }
    changeColour();
    if(Cookie.get("Dificulty") != null){
        dificulty=Cookie.get("Dificulty");
        changeDificulty(dificulty);
        dificultySelector.value = dificulty;

  }
    slider1.oninput = function () {
        lbl1.innerHTML = this.value;
        mineDensity.innerHTML = ((slider3.value * 100 / (this.value * slider2.value)).toFixed(2)).toString() + "%";
    }
    slider1.onchange = function () {
        Cookie.set("Height", this.value, 4242);
    }

    slider2.oninput = function () {
        lbl2.innerHTML = this.value;
        mineDensity.innerHTML = ((slider3.value * 100 / (slider1.value * this.value)).toFixed(2)).toString() + "%";
    }
    slider2.onchange = function () {
        Cookie.set("Width", this.value, 4242);
    }

    slider3.oninput = function () {
        lbl3.innerHTML = this.value;

        mineDensity.innerHTML = ((this.value * 100 / (slider1.value * slider2.value)).toFixed(2)).toString() + "%";
    }
    slider3.onchange = function () {
        Cookie.set("Mines", this.value, 4242);
    }

}

function changeDificulty(dificulty){
    switch (dificulty) {
        case "Easy": //9x9 10 mines
            slider1.value = lbl1.innerHTML = slider2.value = lbl2.innerHTML = 9;
            slider3.value = lbl3.innerHTML = 10;
            slider1.style.display = slider2.style.display  = slider3.style.display = "none";
            Cookie.set("Height", 9);
            Cookie.set("Width", 9);
            Cookie.set("Mines", 10);
            Cookie.set("Dificulty", "Easy");
            mineDensity.innerHTML = '15.63%'
            break;
        case "Normal": //16x16 40 mines
            slider1.value = lbl1.innerHTML = slider2.value = lbl2.innerHTML = 16;
            slider3.value = lbl3.innerHTML = 40;
            slider1.style.display = slider2.style.display = slider3.style.display = "none";
            mineDensity.innerHTML = '15.63%'
            Cookie.set("Height", 16);
            Cookie.set("Width", 16);
            Cookie.set("Mines", 40);
            Cookie.set("Dificulty", "Normal");
            break;
        case "Hard": //30x16 99 mines
            slider1.value = lbl1.innerHTML = 30;
            slider2.value = lbl2.innerHTML = 16;
            slider3.value =  lbl3.innerHTML = 99;
            slider1.style.display =  slider2.style.display =  slider3.style.display = "none";
            mineDensity.innerHTML = '20.63%'
            Cookie.set("Height", 30);
            Cookie.set("Width", 16);
            Cookie.set("Mines", 99);
            Cookie.set("Dificulty", "Hard");
            break;
        case "Custom":
            slider1.style.display =   slider2.style.display =   slider3.style.display = "block";
            if(Cookie.get("Height") == null && Cookie.get("Width") == null && Cookie.get("Mines") == null){
                //Default Values
            slider1.value = lbl1.innerHTML = 30;
            slider2.value = lbl2.innerHTML = 24;
            slider3.max = (30) * (24) -1;
            slider3.value = 125 //26.04% mine density
            lbl3.innerHTML = Math.floor(29 * (23) * 0.25);
            mineDensity.innerHTML = "26.04%"
            Cookie.set("Height", 30);
            Cookie.set("Width", 24);
            Cookie.set("Mines", 125);
            Cookie.set("Dificulty", "Custom");
            break;
    } else{
        slider1.value = lbl1.innerHTML = Cookie.get("Height");
        slider2.value = lbl2.innerHTML = Cookie.get("Width");
        slider3.value = lbl3.innerHTML = Cookie.get("Mines");
        slider3.max = (30) * (24) -1;
        mineDensity.innerHTML = ((slider3.value * 100 / (slider1.value * slider2.value)).toFixed(2)).toString() + "%";
        Cookie.set("Dificulty", "Custom");
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
    if(localStorage.getItem("logged-in")==="true")
    
        window.location.href = "Splayer.html";
    
else{ alert("Tens que estar logado para jogar");
window.location.href = "login.html";
}
}


