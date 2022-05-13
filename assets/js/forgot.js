window.onload = function(){
    if(localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a href="index.html">Logout</a>`;
            var colorPicker= document.getElementById("colorPicker");
            if(Cookie.get("color")!=null){
                colorPicker.value=Cookie.get("color");
            }
   changeColour();
       
       
    }

    function changeColour() {   //Tem que tar dentro da função para mudar tudo em tempo real
        var docStyle = document.documentElement.style;
        var navbar= document.getElementsByClassName("navbar");
        var colorPickerValue= document.getElementById("colorPicker").value;
        var element1= document.getElementById("multicolor1"); 
        var element2= document.getElementById("multicolor2"); 
        var element3= document.getElementById("multicolor3"); 
        
        var loginBox= document.getElementsByClassName("LoginBox"); //div glow
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
            var email = document.getElementById("email");
            if(localStorage.getItem("email")===email.value){
                alert("Insert you new password");
                let newPass = prompt("New Password?");
                localStorage.setItem("pass",newPass);
            }
            else{alert("email errado!");}
        }