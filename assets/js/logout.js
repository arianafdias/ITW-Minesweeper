/* ITW - 2021/2022
Grupo 46    PL21
53687 - Ariana Dias
56931 - Diogo Forte
58628 - Miguel Miguel */
function logout() {
    localStorage.setItem("logged-in", "false");
    window.location.href = 'index.html';
}