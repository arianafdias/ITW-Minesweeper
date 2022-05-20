window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    let colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem('color') != null) {
        colorPicker.value = localStorage.getItem('color');
    }
    changeColour();
    loadScoreTable();


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
    function setCookies(){
        let colorPicker= document.getElementById("colorPicker");
        localStorage.setItem('color', colorPicker.value);
    }   

//user array position (tem todos os dados dos jogos que os jogadores fizeram no localstorage)
let gamedata = {
    playername : localStorage.getItem("Name"),
    playerdiff :localStorage.getItem("Difficulty"),
    playertime : localStorage.getItem("Time"),
    playerscore : localStorage.getItem("Score")
}




function loadScoreTable(filter=null) {
    
    let table = document.getElementById("scoreboard");
    //Apagar o que tava lá caso alguém tenha feito um filtro
    var rowCount = table.rows.length;
    for (let i = 1; i < rowCount; i++) {
        table.deleteRow(1);
    }
    //Get scoresIndividuais from local storage and sort them by time (ascending)
    let scoresIndividuais = JSON.parse(localStorage.getItem("scoresMultiplayer"));
    //Sort por tempo por default como diz no enunciado
    if(filter!==null)
    scoresIndividuais = scoresIndividuais.filter(score=>score.difficulty==filter);

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