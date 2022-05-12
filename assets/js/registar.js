window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML = `<a href="index.html">Logout</a>`;
    var colorPicker = document.getElementById("colorPicker");
    if (Cookie.get("color") != null) {
        colorPicker.value = Cookie.get("color");
    }
    changeColour();


}
function createAcc(){
    var username = document.getElementById("username");
    var password = document.getElementById("pass");
    var passwordAgain = document.getElementById("passAgain");
    var email = document.getElementById("email");

    if(password.value===passwordAgain.value)
        {
            localStorage.setItem("username",username.value);
            localStorage.setItem("pass",pass.value);
            localStorage.setItem("email",email.value);
            alert("Conta Criada com sucesso!")
            window.location.href='login.html';
        }

   
}
        
    var docStyle = getComputedStyle(document.documentElement);
   
    function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    var navbar= document.getElementsByClassName("navbar");
    var colorPickerValue= document.getElementById("colorPicker").value;
    var element1= document.getElementById("multicolor1"); 
    var element2= document.getElementById("multicolor2"); 
   
    var loginBox= document.getElementsByClassName("LoginBox"); //div glow
    navbar[0].style.backgroundColor=colorPickerValue;
    element1.style.color=colorPickerValue;
    element2.style.color=colorPickerValue;
  
    loginBox[0].style.boxShadow= "0px 11px 35px 2px "+ colorPickerValue;
  
    }
    function getDefaultColor(){
        return docStyle.getPropertyValue('--primaryColor');

    }
    function setCookies(){
        var colorPicker= document.getElementById("colorPicker");
        Cookie.set("color", colorPicker.value, 365);
    }
   