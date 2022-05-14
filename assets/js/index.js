
window.onload = function () {
    if(localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    
    var colorPicker = document.getElementById("colorPicker");
    if (Cookie.get("color") != null) 
        colorPicker.value = Cookie.get("color");
    changeColour();
    //Load video
    document.getElementById("video").src = "https://www.youtube.com/embed/GrZCWx0fnfc";


}



var docStyle = getComputedStyle(document.documentElement);

function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    var navbar = document.getElementsByClassName("navbar")[0];
    var colorPickerValue = document.getElementById("colorPicker").value;
    var element = document.getElementById("multicolor"); //A palavra "regras"
    var element2 = document.getElementById("multicolor2"); //O botão para jogar
    var footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    navbar.style.backgroundColor = colorPickerValue;
    element.style.color = colorPickerValue;
    element2.style.background = colorPickerValue;
}


