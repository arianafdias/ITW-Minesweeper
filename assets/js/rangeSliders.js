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
            slider1.value = lbl1.innerHTML = slider2.value = lbl2.innerHTML = 8;
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