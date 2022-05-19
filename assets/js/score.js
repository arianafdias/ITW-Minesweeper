window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    let colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem('color') != null) {
        colorPicker.value = localStorage.getItem('color');
    }
    changeColour();
    scoretable();


}
function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    let navbar= document.getElementsByClassName("navbar");
    let colorPickerValue= document.getElementById("colorPicker").value;
    //let element1= document.getElementById("multicolor1"); //A palavra "regras"
    let element2= document.getElementById("multicolor2"); //O botão para jogar
    let footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    navbar[0].style.backgroundColor=colorPickerValue;
    element1.style.backgroundColor=colorPickerValue;
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




function scoretable(){
    let deftabela = document.getElementById("scoreboard");
    let newtabela = document.createElement("table")
    newtabela.setAttribute("id", "scoreboard");
    let tabline = document.createElement("tr"); 
    tabline.appendChild(linhaTabela);
    tabline.innerHTML = "<th>Jogador</th>"+"<th>Dificuldade</th>" +"<th>Tempo</th>" + "<th>Pontos</th>";
    newtabela.append(tabline);


    let numdata = 0;
    for (let scoreline in gamedata){
        while(numdata < 10){
        tabline = document.createElement("tr");
        tabline.innerHTML = "<td>" + gamedata.playername + "</td>" +
                             "<td>" + gamedata.playerdiff + "</td>" +
                                "<td>" + gamedata.playertime + "</td>" +
                                "<td>" + gamedata.playerscore + "</td>";
        newtabela.appendChild(tabline);   
        }    
    numdata++;   
    }   
    deftabela.parentNode.replaceChild(newtabela, deftabela);

}