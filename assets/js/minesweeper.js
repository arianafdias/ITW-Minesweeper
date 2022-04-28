
window.onload = function () {
    var gridContainer = document.getElementsByClassName('grid-container')[0];
    gridContainer.style.gridTemplateColumns = "repeat(" + Cookie.get("Width") + ", 1fr)";
    //Create grid-item divs
    for (var i = 0; i < Cookie.get("Width") * Cookie.get("Height"); i++) {
        var gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridContainer.appendChild(gridItem);
    }
}