
window.onload = function () {
  
    var range1 = document.getElementById("slider1");
    var range2 = document.getElementById("slider2");
    var range3 = document.getElementById("slider3");
    var lbl1 = document.getElementById("lbl1");
    var lbl2 = document.getElementById("lbl2");
    var lbl3 = document.getElementById("lbl3");
    var dificultySelector = document.getElementById("select-css");
    dificultySelector.onchange =
        function changeSliders() {
            var mineDensity = document.getElementById("mineDensity");
            switch (dificultySelector.value) {
                case "Easy": //8x8 10 mines
                    slider1.value = lbl1.innerHTML = slider2.value = lbl2.innerHTML = 8;
                    slider3.value = lbl3.innerHTML = 10;
                    slider1.style.display = slider2.style.display  = slider3.style.display = "none";
                    Cookie.set("Height", 9);
                    Cookie.set("Width", 9);
                    Cookie.set("Mines", 10);
                    mineDensity.innerHTML = '15.63%'
                    break;
                case "Normal": //16x16 40 mines
                    slider1.value = 16;
                    lbl1.innerHTML = 16;
                    slider2.value = 16;
                    lbl2.innerHTML = 16;
                    slider3.value = 40;
                    lbl3.innerHTML = 40;
                    slider1.style.display = "none";
                    slider2.style.display = "none";
                    slider3.style.display = "none";
                    mineDensity.innerHTML = '15.63%'
                    Cookie.set("Height", 16);
                    Cookie.set("Width", 16);
                    Cookie.set("Mines", 40);
                    break;

                case "Hard": //30x16 99 mines
                    slider1.value = 30;
                    lbl1.innerHTML = 30;
                    slider2.value = 16;
                    lbl2.innerHTML = 16;
                    slider3.value = 99;
                    lbl3.innerHTML = 99;
                    slider1.style.display = "none";
                    slider2.style.display = "none";
                    slider3.style.display = "none";
                    mineDensity.innerHTML = '20.63%'
                    Cookie.set("Height", 30);
                    Cookie.set("Width", 16);
                    Cookie.set("Mines", 99);
                    break;
                    ;
                case "Custom":
                    slider1.style.display = "block";
                    slider2.style.display = "block";
                    slider3.style.display = "block";
                    slider1.value = 30;
                    lbl1.innerHTML = 30;
                    slider2.value = 24;
                    lbl2.innerHTML = 24;
                    slider3.max = (29) * (23);
                    slider3.value = 125 //26.04% mine density
                    lbl3.innerHTML = Math.floor(29 * (23) * 0.25);
                    mineDensity.innerHTML = "26.04%"
                    Cookie.set("Height", 30);
                    Cookie.set("Width", 24);
                    Cookie.set("Mines", 125);
                    break;
            }

            //(x-1)*(y-1)

        }

    range1.oninput = function () {
        lbl1.innerHTML = this.value;
        mineDensity.innerHTML = ((range3.value * 100 / (this.value * range2.value)).toFixed(2)).toString() + "%";
    }
    range1.onchange = function () {
        Cookie.set("Height", this.value, 4242);
    }

    range2.oninput = function () {
        lbl2.innerHTML = this.value;
        mineDensity.innerHTML = ((range3.value * 100 / (range1.value * this.value)).toFixed(2)).toString() + "%";
    }
    range2.onchange = function () {
        Cookie.set("Width", this.value, 4242);
    }

    range3.oninput = function () {
        lbl3.innerHTML = this.value;

        mineDensity.innerHTML = ((this.value * 100 / (range1.value * range2.value)).toFixed(2)).toString() + "%";
    }
    range3.onchange = function () {
        Cookie.set("Mines", this.value, 4242);
    }

}