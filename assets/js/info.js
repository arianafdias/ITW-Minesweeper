      
window.onload = function () {
    if(localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    
       
    let colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem('color') != null) 
        colorPicker.value = localStorage.getItem('color');
    changeColour();
    //Load video
 
}

let docStyle = getComputedStyle(document.documentElement);
       
        function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
            
        let navbar= document.getElementsByClassName("navbar");
        let colorPickerValue= document.getElementById("colorPicker").value;
        let element= document.getElementById("multicolor"); //A palavra "regras"
        let footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
        navbar[0].style.backgroundColor=colorPickerValue;    
        element.style.background=colorPickerValue;
        
        }
        function getDefaultColor(){
            return docStyle.getPropertyValue('--primaryColor');

        }
    