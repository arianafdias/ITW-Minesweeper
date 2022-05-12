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
    var navbar= document.getElementsByClassName("navbar");
    var colorPickerValue= document.getElementById("colorPicker").value;
    var element1= document.getElementById("multicolor1"); //A palavra "regras"
    var element2= document.getElementById("multicolor2"); //O botão para jogar
    navbar[0].style.backgroundColor=colorPickerValue;
    element1.style.backgroundColor=colorPickerValue;
    element2.style.borderColor=colorPickerValue;
    }   
    function setCookies(){
        var colorPicker= document.getElementById("colorPicker");
        Cookie.set("color", colorPicker.value, 365);
    }   