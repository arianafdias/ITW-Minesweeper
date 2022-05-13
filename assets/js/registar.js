window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
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

    if (username.value == "" || password.value == "" || passwordAgain.value == "" || email.value == "") {
        alert("Preencha todos os campos!");
        return;
    }
    if (password.value != passwordAgain.value) {
        alert("As passwords não coincidem!");
        return;
    }
    if (password.value.length < 6) {
        alert("A password tem de ter pelo menos 6 caracteres!");
        return;
    }
    if (email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1 || email.value.indexOf("@") > email.value.indexOf(".")  )  { 
        alert("O email não é válido!");
        return;
    }

    //Check if password has uppercase and lowercase letters and numbers
    var hasUpper = false;
    var hasLower = false;
    var hasNumber = false;
    for (var i = 0; i < password.value.length; i++) {
        if (password.value[i] >= 'A' && password.value[i] <= 'Z') {
            hasUpper = true;
        }
        if (password.value[i] >= 'a' && password.value[i] <= 'z') {
            hasLower = true;
        }
        if (password.value[i] >= '0' && password.value[i] <= '9') {
            hasNumber = true;
        }
    }
    if (!hasUpper || !hasLower || !hasNumber) {
        alert("A password tem de ter pelo menos uma letra maiúscula, uma minúscula e um número!");
        return;
    }


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
    var element= document.getElementById("multicolor"); 
    var element1= document.getElementById("multicolor1"); 
    var element2= document.getElementById("multicolor2"); 
   
    var loginBox= document.getElementsByClassName("LoginBox"); //div glow
    navbar[0].style.backgroundColor=colorPickerValue;
    element.style.background=colorPickerValue;
    element1.style.color=colorPickerValue;
    element2.style.color=colorPickerValue;
  
    loginBox[0].style.boxShadow= "0px 11px 35px 2px "+ colorPickerValue;
  
    }
    
