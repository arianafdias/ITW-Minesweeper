window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    let colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem('color') != null) {
        colorPicker.value = localStorage.getItem('color');
    }
    loadScoreTable();
    changeColour();

}

function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
let navbar= document.getElementsByClassName("navbar");
let colorPickerValue= document.getElementById("colorPicker").value;
//let element1= document.getElementById("multicolor1"); //A palavra "regras"
let element2= document.getElementById("multicolor2"); //O botão para jogar
let footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    navbar[0].style.backgroundColor=colorPickerValue;
   // element1.style.backgroundColor=colorPickerValue;
    element2.style.borderColor=colorPickerValue;
}   

function loadScoreTable(filter=null) {
    let table = document.getElementById("scoreboard");
    let tHead = document.getElementById("tableHeaders");
    var orderArrayHeader = ["S.No", "Date" ];
    for (var i=0; i<orderArrayHeader.length; i++) {
        tHead.appendChild(document.createElement("th")).
        appendChild(document.createTextNode(orderArrayHeader[i]));
    }
    table.appendChild(tHead);
    //Get scoresIndividuais from local storage and sort them by time (ascending)
    let scoresIndividuais = JSON.parse(localStorage.getItem("scoresIndividuais"));
    //Sort por tempo por default como diz no enunciado
    if(filter===null)
        scoresIndividuais.sort(function(a, b){return a.seconds - b.seconds});
    //Populate table with top 10 scores
    for (var i = 0; i < scoresIndividuais.length&&i<10; i++) {
        let row = table.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = scoresIndividuais[i].name;
        cell2.innerHTML = scoresIndividuais[i].time;
    }


 
}