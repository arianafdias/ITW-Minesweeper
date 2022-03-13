var range = document.getElementById("FirstRange");
var output = document.getElementById("lblOne");
output.innerHTML = range.value;

range.oninput = function () {
    output.innerHTML = this.value;
}
var range2 = document.getElementById("SecondRange");
var output2 = document.getElementById("lblTwo");
output2.innerHTML = range2.value;

range2.oninput = function () {
    output2.innerHTML = this.value;
}
var range3 = document.getElementById("ThirdRange");
var output3 = document.getElementById("lblThree");
output3.innerHTML = range3.value;

range3.oninput = function () {
    output3.innerHTML = this.value;
}