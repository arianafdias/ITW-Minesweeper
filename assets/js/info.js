      
window.onload = function () {
    if(localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    
       
    var colorPicker = document.getElementById("colorPicker");
    if (Cookie.get("color") != null) 
        colorPicker.value = Cookie.get("color");
    changeColour();
    //Load video
 
}

var docStyle = getComputedStyle(document.documentElement);
       
        function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
            
        var navbar= document.getElementsByClassName("navbar");
        var colorPickerValue= document.getElementById("colorPicker").value;
        var element= document.getElementById("multicolor"); //A palavra "regras"
        var footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
        navbar[0].style.backgroundColor=colorPickerValue;    
        element.style.background=colorPickerValue;
        
        }
        function getDefaultColor(){
            return docStyle.getPropertyValue('--primaryColor');

        }
    