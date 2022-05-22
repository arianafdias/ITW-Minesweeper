/* ITW - 2021/2022
Grupo 46    PL21
53687 - Ariana Dias
56931 - Diogo Forte
58628 - Miguel Miguel */
function validateForm() {
let nameVal = document.forms["simpleForm"]["name"].value;
if(nameVal == null || nameVal == "") {
document.getElementsByClassName( "errorMessage" )[0].style.visibility = "visible";
document.getElementsByClassName( "errorMessage" )[0].innerHTML = "Please Fill out this field";
return false;
} else {
return true;
}
}
