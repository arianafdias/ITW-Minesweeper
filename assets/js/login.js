window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    var colorPicker = document.getElementById("colorPicker");
    if (Cookie.get("color") != null) {
        colorPicker.value = Cookie.get("color");
    }
    changeColour();

}

var docStyle = getComputedStyle(document.documentElement);

function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    var navbar = document.getElementsByClassName("navbar");
    var colorPickerValue = document.getElementById("colorPicker").value;
    var element1 = document.getElementById("multicolor1");
    var element2 = document.getElementById("multicolor2");
    var element3 = document.getElementById("multicolor3");
    var element4 = document.getElementById("multicolor4");
    var loginBox = document.getElementsByClassName("LoginBox"); //div glow
    var footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    navbar[0].style.backgroundColor = colorPickerValue;
    element1.style.color = colorPickerValue;
    element2.style.color = colorPickerValue;
    element3.style.color = colorPickerValue;
    element4.style.background = colorPickerValue;
    loginBox[0].style.boxShadow = "0px 11px 35px 2px " + colorPickerValue;

}
function getDefaultColor() {
    return docStyle.getPropertyValue('--primaryColor');

}

function login() {
    var username = document.getElementById("username");
    var password = document.getElementById("pass");

    if ((username.value === localStorage.getItem("username") ||
        username.value === localStorage.getItem("email")) && password.value === localStorage.getItem("pass")) {
        alert("Logged-in com Sucesso! ");
        localStorage.setItem("logged-in", "true");
        window.event.returnValue = false; //Isto é necessário for some reason?? It's deprecated though
        window.location.href = 'jogo.html';
    }
}


