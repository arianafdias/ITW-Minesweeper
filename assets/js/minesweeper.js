
window.onload = function () {
    var gridContainer = document.getElementsByClassName('grid-container')[0];
    gridContainer.style.gridTemplateColumns = "repeat(" + Cookie.get("Width") + ", 1fr)";
    //Create grid-item divs
    for (var i = 0; i < Cookie.get("Width") * Cookie.get("Height"); i++) {
        var gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridContainer.appendChild(gridItem);
    }
    var color = Cookie.get("color");

        var allGridItems = document.getElementsByClassName("grid-item");
        colorPicker.value = color;

      
        //Change all grid items border color
        for (var i = 0; i < allGridItems.length; i++) {
            allGridItems[i].style.borderColor = color;
        }
        var darkerColor=mudarBrightness(color, -55);

        gridContainer[0].style.backgroundColor=darkerColor;
        var css = '.grid-item:hover{ background-color:'+darkerColor;+'; color: black;}';
var style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);
}