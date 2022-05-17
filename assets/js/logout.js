function logout() {
    localStorage.setItem("logged-in", "false");
    window.location.href = 'index.html';
}