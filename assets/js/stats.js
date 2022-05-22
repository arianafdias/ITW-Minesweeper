/* ITW - 2021/2022
Grupo 46    PL21
53687 - Ariana Dias
56931 - Diogo Forte
58628 - Miguel Miguel */  

window.onload = function () {
    if(localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;  
    let colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem('color') != null) 
        colorPicker.value = localStorage.getItem('color');

        let selector = document.getElementById("select-css");
    
        if(localStorage.getItem("Difficulty") != null && localStorage.getItem("Difficulty")!="Custom")
           {
           selector.value = localStorage.getItem("Difficulty");
           loadStats(selector.value);
        
        }
        else 
            loadStats("Fácil");
    

    changeColour();
    //Load video
 
}
//para devolver 0 se n existir
function isNaN(x) {
    if(x!==x) return 0; //hmm resulta wow
    else return x;
 };
 isNaN(NaN);//true
function loadStats(difficulty){
    let username = localStorage.getItem("username");
    if(difficulty == "Custom" || difficulty==null || difficulty == undefined) difficulty="Fácil";
   
    document.getElementById("minesOpened").innerHTML=isNaN(localStorage.getItem(username+"minesOpened"+difficulty));
    document.getElementById("minesFlagged").innerHTML=isNaN(localStorage.getItem(username+"minesFlagged"+difficulty));
    document.getElementById("cellsRevealed").innerHTML=isNaN(localStorage.getItem(username+"cellsRevealed"+difficulty));
}


function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real

    let navbar = document.getElementsByClassName("navbar");
    let colorPickerValue = document.getElementById("colorPicker").value;
   
    let footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    navbar[0].style.backgroundColor = colorPickerValue;
}

