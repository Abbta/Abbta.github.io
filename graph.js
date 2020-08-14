const yValues = [
-0.02, 0.045, -0.004, -0.01, -0.03, -0.02, -0.06, -0.03, -0.003, -0.01, 0, -0.02, -0.07, -0.02, -0.04, -0.04, -0.03, -0.04, -0.085, -0.014, -0.011, 0.03, -0.05, 0, -0.02
]
const initValuesFromTo = [11, yValues.length - 1];
const backgroundYValues = [0.15, 0.1, 0.05, -0.05, -0.1, -.15]
const horisLength = 0.3;
const dataMargin = 0.05;
const yDistance = 0.35
const yMin = -0.2;
const xMin = 0;
const graphStateArray = [
    [11, yValues.length - 1],
    [0, 10],
    [null]
]

document.body.onload = function () {
    const svg = document.getElementById("graph");
    initBackground(svg);
    addToGraph(svg, 0);
}

var g_graphState = 1;
window.onscroll = function () {
    const svg = document.getElementById("graph");
    const graphHolder = document.getElementById("graph-placeholder");
    const graph_overlay_texts = document.getElementsByClassName("graph-overlay-text");
    this.console.log(graph_overlay_texts[g_graphState-1].offsetTop , graphHolder.offsetTop)
    if (graph_overlay_texts[g_graphState-1].offsetTop < graphHolder.offsetTop)
    {
        //if text to transition between current and next state is above marker 
        addToGraph(svg, g_graphState);
        g_graphState++;
    }

}

function yScale(elem, yValue) {
    var scalar = elem.scrollHeight / yDistance;
    return (-yValue - yMin) * scalar;
}

function xScale(element, xValue) {
    var scalar = element.clientWidth / yValues.length;
    return Math.abs(xValue - xMin) * scalar + 5;
}

function addToGraph(svg, graphState) {
    if (graphState < 2) {
        for (var i = graphStateArray[graphState][0]; i <= graphStateArray[graphState][1]; i++) {
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

            var horisontalTop = document.createElementNS("http://www.w3.org/2000/svg", "line");
            horisontalTop.setAttributeNS(null, "x1", xScale(svg, i - horisLength));
            horisontalTop.setAttributeNS(null, "x2", xScale(svg, i + horisLength));
            horisontalTop.setAttributeNS(null, "y1", yScale(svg, yValues[i] - dataMargin));
            horisontalTop.setAttributeNS(null, "y2", yScale(svg, yValues[i] - dataMargin));
            horisontalTop.setAttributeNS(null, "style", "stroke:rgb(255,0,0);stroke-width:2");
            svg.appendChild(horisontalTop);

            var horisontalBot = document.createElementNS("http://www.w3.org/2000/svg", "line");
            horisontalBot.setAttributeNS(null, "x1", xScale(svg, i - horisLength));
            horisontalBot.setAttributeNS(null, "x2", xScale(svg, i + horisLength));
            horisontalBot.setAttributeNS(null, "y1", yScale(svg, yValues[i] + dataMargin));
            horisontalBot.setAttributeNS(null, "y2", yScale(svg, yValues[i] + dataMargin));
            horisontalBot.setAttributeNS(null, "style", "stroke:rgb(255,0,0);stroke-width:2");
            svg.appendChild(horisontalBot);
        }
    }
}

function initBackground(svg) {
    var vertical = document.createElementNS("http://www.w3.org/2000/svg", "line");
    vertical.setAttributeNS(null, "x1", xScale(svg, 0));
    vertical.setAttributeNS(null, "x2", xScale(svg, yValues.length));
    vertical.setAttributeNS(null, "y1", yScale(svg, 0));
    vertical.setAttributeNS(null, "y2", yScale(svg, 0));
    vertical.setAttributeNS(null, "style", "stroke:rgb(0,0,0);stroke-width:3");
    svg.appendChild(vertical); 
    for (var i = 0; i < backgroundYValues.length; i++) {
        var vertical = document.createElementNS("http://www.w3.org/2000/svg", "line");
        vertical.setAttributeNS(null, "x1", xScale(svg, 0));
        vertical.setAttributeNS(null, "x2", xScale(svg, yValues.length));
        vertical.setAttributeNS(null, "y1", yScale(svg, backgroundYValues[i]));
        vertical.setAttributeNS(null, "y2", yScale(svg, backgroundYValues[i]));
        vertical.setAttributeNS(null, "style", "stroke:rgb(150,150,150);stroke-width:2");
        svg.appendChild(vertical); 
    }
}