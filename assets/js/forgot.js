window.onload = function(){
    if(localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
            let colorPicker= document.getElementById("colorPicker");
            if(localStorage.getItem('color')!=null){
                colorPicker.value=localStorage.getItem('color');
            }
   changeColour();
       
       
    }

    function changeColour() {   //Tem que tar dentro da função para mudar tudo em tempo real
        let navbar= document.getElementsByClassName("navbar");
        let colorPickerValue= document.getElementById("colorPicker").value;
        let element1= document.getElementById("multicolor1"); 
        let element2= document.getElementById("multicolor2"); 
        let element3= document.getElementById("multicolor3"); 
        let loginBox= document.getElementsByClassName("LoginBox"); //div glow
        let footer = document.getElementById("footer");
        footer.style.backgroundColor = colorPickerValue;
        navbar[0].style.backgroundColor=colorPickerValue;
        element1.style.color=colorPickerValue;
        element2.style.backgroundColor=colorPickerValue;
        element3.style.color=colorPickerValue;
     
        loginBox[0].style.boxShadow= "0px 11px 35px 2px "+ colorPickerValue;
      
        }
        function getDefaultColor(){
            return docStyle.getPropertyValue('--primaryColor');

        }
        
        function forgotPassword(){
            let email = document.getElementById("email");
            if(localStorage.getItem("email")===email.value){
                alert("Insert you new password");
                let newPass = prompt("New Password?");
                localStorage.setItem("pass",newPass);
            }
            else{alert("email errado!");}
        }