
function validateForm() {
var nameVal = document.forms["simpleForm"]["name"].value;
if(nameVal == null || nameVal == "") {
document.getElementsByClassName( "errorMessage" )[0].style.visibility = "visible";
document.getElementsByClassName( "errorMessage" )[0].innerHTML = "Please Fill out this field";
return false;
} else {
return true;
}
}
