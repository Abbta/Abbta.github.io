var yValues = [
-0.02, 0.045, -0.004, -0.01, -0.03, -0.02, -0.06, -0.03, -0.003, -0.01, 0, -0.02, -0.07, -0.02, -0.04, -0.04, -0.03, -0.04, -0.085, -0.014, -0.011, 0.03, -0.05, 0, -0.02
]
var dataMargin = 0.05;
var yDistance = 0.35
var yMin = -0.2;
var xMin = 0;

document.body.onload = function () {
    var svg = document.getElementById("graph");
    for (var i = 0; i < yValues.length; i++) {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttributeNS(null, "cx", xScale(svg, i));
        circle.setAttributeNS(null, "cy", yScale(svg, yValues[i]));
        circle.setAttributeNS(null, "r", 5);
        circle.setAttributeNS(null, "fill", "red");
        svg.appendChild(circle);

        var vertical = document.createElementNS("http://www.w3.org/2000/svg", "line");
        vertical.setAttributeNS(null, "x1", xScale(svg, i));
        vertical.setAttributeNS(null, "x2", xScale(svg, i));
        vertical.setAttributeNS(null, "y1", yScale(svg, yValues[i] + dataMargin));
        vertical.setAttributeNS(null, "y2", yScale(svg, yValues[i] - dataMargin));
        vertical.setAttributeNS(null, "style", "stroke:rgb(255,0,0);stroke-width:2");
        svg.appendChild(vertical);
    }
}

function yScale(elem, yValue) {
    var scalar = elem.scrollHeight / yDistance;
    console.log(scalar);
    return (yValue - yMin) * scalar;
}

function xScale(element, xValue) {
    var scalar = element.clientWidth / yValues.length;
    return Math.abs(xValue - xMin) * scalar + 5;
}