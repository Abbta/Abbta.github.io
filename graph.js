document.onload = function () {

}

document.body.onload = function () {
    var svg = document.createElement("svg");
    svg.setAttributeNS(null, "height", 50);
    svg.setAttributeNS(null, "width", 50);
    var circle = document.createElement("circle");
    circle.setAttributeNS(null, "cx", 50);
    circle.setAttributeNS(null, "cy", 50);
    circle.setAttributeNS(null, "r", 60);
    circle.setAttributeNS(null, "fill", "red");
    circle.setAttributeNS(null, "stroke", "red");
    circle.setAttributeNS(null, "stroke-width", "3");
    svg.appendChild(circle);

    var currentDiv = document.getElementById("graph");
    currentDiv.parentNode.insertBefore(svg, currentDiv); 

    svg.width = 100;
    svg.height = 100;
    circle.cx = 50;
    circle.cy = 50;
    circle.r = 40;
    circle.fill = "green";
}