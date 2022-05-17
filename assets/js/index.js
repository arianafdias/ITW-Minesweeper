
window.onload = function () {
    if(localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    
    let colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem('color') != null) 
        colorPicker.value = localStorage.getItem('color');
    changeColour();
    //Load video
    document.getElementById("video").src = "https://www.youtube.com/embed/GrZCWx0fnfc";


}



let docStyle = getComputedStyle(document.documentElement);

function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    let navbar = document.getElementsByClassName("navbar")[0];
    let colorPickerValue = document.getElementById("colorPicker").value;
    let element = document.getElementById("multicolor"); //A palavra "regras"
    let element2 = document.getElementById("multicolor2"); //O botão para jogar
    let footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    navbar.style.backgroundColor = colorPickerValue;
    element.style.color = colorPickerValue;
    element2.style.background = colorPickerValue;
}


