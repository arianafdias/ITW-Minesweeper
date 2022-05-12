window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML = `<a href="index.html">Logout</a>`;
    var colorPicker = document.getElementById("colorPicker");
    if (Cookie.get("color") != null) {
        colorPicker.value = Cookie.get("color");
    }
    changeColour();


}


function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    var navbar = document.getElementsByClassName("navbar");
    var colorPickerValue = document.getElementById("colorPicker").value;
    var element = document.getElementById("multicolor5");
    var element2 = document.getElementById("multicolor6");
    //Mudar a cor de um elemento pseudo-elemento (n sei pk está lento mas até ficou fixe)
    var css = 'input[type="range"]::-webkit-slider-thumb {-webkit-appearance: none;background-color:' + colorPickerValue + ';width: 30px;height: 30px;border-radius: 50%;border: 2px solid white;cursor: pointer;transition: .3s ease-in-out;}​';
    var style = document.createElement('style');

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



