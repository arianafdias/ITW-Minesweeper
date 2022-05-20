      
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
                loadScoreTable(localStorage.getItem(selector.value));
        
        }
        else 
         loadScoreTable("Fácil");
    

    changeColour();
    //Load video
 
}
function loadStats(difficulty){
   
    if(difficulty == "Custom" || difficulty==null || difficulty == undefined) difficulty="Fácil";

    let minesRevealed = localStorage.getItem(difficulty+"_minesOpened");

       
}


function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real

    let navbar = document.getElementsByClassName("navbar");
    let colorPickerValue = document.getElementById("colorPicker").value;
   
    let footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    navbar[0].style.backgroundColor = colorPickerValue;
}

