window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    let colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem('color') != null) {
        colorPicker.value = localStorage.getItem('color');
    }
    changeColour();

}

let docStyle = getComputedStyle(document.documentElement);

function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    let navbar = document.getElementsByClassName("navbar");
    let colorPickerValue = document.getElementById("colorPicker").value;
    let element1 = document.getElementById("multicolor1");
    let element2 = document.getElementById("multicolor2");
    let element3 = document.getElementById("multicolor3");
    let element4 = document.getElementById("multicolor4");
    let loginBox = document.getElementsByClassName("LoginBox"); //div glow
    let footer = document.getElementById("footer");
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
    let username = document.getElementById("username").value;
    let password = document.getElementById("pass").value;

    let users = JSON.parse(localStorage.getItem("users"));
    if (users == null) {
        users = [];
    }

    let userFound = users.find(user => {    //find retorna o primeiro elemento que satisfaz a condição
        if ((user.username == username || user.email == user.username) && user.password == password) {
            localStorage.setItem("logged-in", "true");
            localStorage.setItem("username", username);
            window.event.returnValue = false; //Isto é necessário for some reason?? It's deprecated though
            window.location.href = 'jogo.html';
            return true;
        }
    });
    if (!userFound) {
        alert("Username ou password incorretos!");
    }
   
}


