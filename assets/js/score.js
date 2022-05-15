window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    var colorPicker = document.getElementById("colorPicker");
    if (Cookie.get("color") != null) {
        colorPicker.value = Cookie.get("color");
    }
    changeColour();
    scoretable();


}
function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    var navbar= document.getElementsByClassName("navbar");
    var colorPickerValue= document.getElementById("colorPicker").value;
    //var element1= document.getElementById("multicolor1"); //A palavra "regras"
    var element2= document.getElementById("multicolor2"); //O botão para jogar
    var footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    navbar[0].style.backgroundColor=colorPickerValue;
    element1.style.backgroundColor=colorPickerValue;
    element2.style.borderColor=colorPickerValue;
    }   
    function setCookies(){
        var colorPicker= document.getElementById("colorPicker");
        Cookie.set("color", colorPicker.value, 365);
    }   

//user array position (tem todos os dados dos jogos que os jogadores fizeram no localstorage)
let gamedata = {
    playername : none,
    playertime : none,
    playerscore : none
}




function scoretable(){
    let deftabela = document.getElementById("scoreboard");
    let newtabela = document.createElement("table")
    newtabela.setAttribute("id", "scoreboard");
    let tabline = document.createElement("tr"); 
    tabline.appendChild(linhaTabela);
    tabline.innerHTML = "<th>Jogador</th>" + "<th>Pontos</th>"+"<th>Tempo</th>";
    newtabela.append(tabline);


    let numdata = 0;
    for (let scoreline in gamedata){
        while(numdata < 10){
        tabline = document.createElement("tr");
        tabline.innerHTML = "<td>" + //gamedata.playername + "</td>" +
                                "<td>" + //gamedata.playertime + "</td>" +
                                "<td>" + //gamedata.playerscore + "</td>";
        newtabela.appendChild(tabline);   
        }    
    numdata++;   
    }   
    deftabela.parentNode.replaceChild(newtabela, deftabela);

}