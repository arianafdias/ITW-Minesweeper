let loginForm;

window.onload = isLoggedIn;

function isLoggedIn() {
    loginForm = document.forms[0]
    if (loginForm === undefined) {
        document.getElementById("mustLogin").style.display = "none";
    } else {
        document.getElementById("login").innerHTML=`<a href="index.html">Logout</a>`;
    }
    console.log(loginForm)
}

