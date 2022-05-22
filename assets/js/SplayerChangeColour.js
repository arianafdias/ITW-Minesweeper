/* ITW - 2021/2022
Grupo 46    PL21
53687 - Ariana Dias
56931 - Diogo Forte
58628 - Miguel Miguel */


/*

Este ficheiro têm que existir porque o changeColour() não é reconhecido se tiver no ficheiro Splayer.js 
porque esse é do tipo "module" (para poder importar o Cell.js) e não "script" acho eu.
¯\_(ツ)_/¯ ¯\_(ツ)_/¯ ¯\_(ツ)_/¯ ¯\_(ツ)_/¯ ¯\_(ツ)_/¯ ¯\_(ツ)_/¯ ¯\_(ツ)_/¯ ¯\_(ツ)_/¯ ¯\_(ツ)_/¯ ¯\_(ツ)_/¯
*/ 


function changeColour(color) { //Tem que tar dentro da função para mudar tudo em tempo real
    if (localStorage.getItem('color') != null) 
        colorPicker.value = localStorage.getItem('color');
    if(color != null)
        colorPicker.value = color;
        
    let navbar = document.getElementsByClassName("navbar");
    let colorPickerValue = document.getElementById("colorPicker").value;
    let gridContainer = document.getElementsByClassName("grid-container");
    let allGridItems = document.getElementsByClassName("grid-item");
    let btnRestart = document.getElementById("btnReset");
    let footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    navbar[0].style.backgroundColor = colorPickerValue;
    btnRestart.style.backgroundColor = colorPickerValue;
    //Change all grid items border color
    for (let i = 0; i < allGridItems.length; i++) {
        allGridItems[i].style.borderColor = colorPickerValue;
    }
    let darkerColor = mudarBrightness(colorPickerValue, -55);
    gridContainer[0].style.backgroundColor = darkerColor
    let css = '.grid-item:hover{ background-color:' + darkerColor; +'; color: black;}';
    let style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
}
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