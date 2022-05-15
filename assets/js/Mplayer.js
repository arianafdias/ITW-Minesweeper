window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    var colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem('color') != null) {
        colorPicker.value = localStorage.getItem('color');
    }
    changeColour();


}
function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    var navbar = document.getElementsByClassName("navbar");
    var colorPickerValue = document.getElementById("colorPicker").value;
    var gridContainer = document.getElementsByClassName("grid-container");
    var allGridItems = document.getElementsByClassName("grid-item");
    var footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    navbar[0].style.backgroundColor = colorPickerValue;
    //Change all grid items border color
    for (var i = 0; i < allGridItems.length; i++) {
        allGridItems[i].style.borderColor = colorPickerValue;
    }
    var darkerColor=mudarBrightness(colorPickerValue, -55);
    gridContainer[0].style.backgroundColor=darkerColor
    var css = '.grid-item:hover{ background-color:'+darkerColor;+'; color: black;}';
var style = document.createElement('style');

if (style.styleSheet) {
style.styleSheet.cssText = css;
} else {
style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);
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


function setCookies() {
    var colorPicker = document.getElementById("colorPicker");
    localStorage.setItem('color', colorPicker.value);
}