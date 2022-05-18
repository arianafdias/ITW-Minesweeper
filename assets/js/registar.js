window.onload = function () {
    if (localStorage.getItem("logged-in") === "true")
        document.getElementById("login").innerHTML=`<a onclick="logout()" href="index.html">Logout</a>`;
    let colorPicker = document.getElementById("colorPicker");
    if (localStorage.getItem('color') != null) {
        colorPicker.value = localStorage.getItem('color');
    }
    changeColour();


}

function createAcc(){
    let username = document.getElementById("username");
    let password = document.getElementById("pass");
    let passwordAgain = document.getElementById("passAgain");
    let faixaEtaria = document.getElementById("faixaEtaria");
    let genero = document.getElementById("genero");
    let email = document.getElementById("email");

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
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    for (let i = 0; i < password.value.length; i++) {
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
            let users = JSON.parse(localStorage.getItem("users"));
            if (users == null) {
                users = [];
            }
            
            let userFound = users.find(user => user.email==email.value || user.username==username.value);
            if(userFound){
                alert("O utilizador ou email já existe!");
                return;
            }
            
            let user = {
                username: username.value,
                password: password.value,
                email: email.value,
                faixaEtaria: faixaEtaria.value,
                genero: genero.value,
            }
            //Get array of users from local storage
           
            //Add new user to array
            users.push(user);
            //Save array to local storage
            localStorage.setItem("users", JSON.stringify(users));
            alert("Conta Criada com sucesso!")
            window.location.href='login.html';
        }

   
}
        
    let docStyle = getComputedStyle(document.documentElement);
   
    function changeColour() { //Tem que tar dentro da função para mudar tudo em tempo real
    let navbar= document.getElementsByClassName("navbar");
    let colorPickerValue= document.getElementById("colorPicker").value;
    let element= document.getElementById("multicolor"); 
    let element1= document.getElementById("multicolor1"); 
    let element2= document.getElementById("multicolor2"); 
   
    let loginBox= document.getElementsByClassName("LoginBox"); //div glow
    let footer = document.getElementById("footer");
    footer.style.backgroundColor = colorPickerValue;
    navbar[0].style.backgroundColor=colorPickerValue;
    element.style.background=colorPickerValue;
    element1.style.color=colorPickerValue;
    element2.style.color=colorPickerValue;
  
    loginBox[0].style.boxShadow= "0px 11px 35px 2px "+ colorPickerValue;
  
    }
    
