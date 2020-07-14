var yValues = [
50,60,20,190,340,230,70,80
]

document.body.onload = function () {
    var svg = document.getElementById("graph");
    for (var i = 0; i < yValues.length; i++) {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttributeNS(null, "cx", i * 10);
        circle.setAttributeNS(null, "cy", yValues[i]);
        circle.setAttributeNS(null, "r", 2);
        circle.setAttributeNS(null, "fill", "red");
        svg.appendChild(circle);
    }
}