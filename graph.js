const yValues = [
-0.02, 0.045, -0.004, -0.01, -0.03, -0.02, -0.06, -0.03, -0.003, -0.01, 0, -0.02, -0.07, -0.02, -0.04, -0.04, -0.03, -0.04, -0.085, -0.014, -0.011, 0.03, -0.05, 0, -0.02
]
const backgroundYValues = [0.15, 0.1, 0.05, -0.05, -0.1, -.15]
const circleRadius = 5;
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
var svgElementsContainer = new Array; 
const animationDelay = 50;
const animationDuration = 300;
const maxFrames = 15;

var g_graphState = 0;

document.body.onload = function () {
    const svg = document.getElementById("graph");
    initBackground(svg);
    initSvgElements(svg);
    addToGraph(document.getElementById("graph"), g_graphState);
    g_graphState++;

    window.onscroll = function () {
        const svg = document.getElementById("graph");
        const graphHolder = document.getElementById("graph-placeholder");
        const graph_overlay_texts = document.getElementsByClassName("graph-overlay-text");
        if (graph_overlay_texts[g_graphState - 1].offsetTop < graphHolder.offsetTop) {
            //if text to transition between current and next state is above marker 
            addToGraph(svg, g_graphState);
            g_graphState++;
        }

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
    console.log(graphState);
    if (graphState < 2)
    {
        for (let i = graphStateArray[graphState][0]; i <= graphStateArray[graphState][1]; i++) {
            setTimeout(animateCircleIn, animationDelay * i, svgElementsContainer[i].circle);
            setTimeout(animateVerticalIn, animationDelay * i, svgElementsContainer[i].vertical, svg, yValues[i]);
            setTimeout(animateHorisontalIn, animationDelay * i + animationDuration, svgElementsContainer[i].horisontalTop, svgElementsContainer[i].horisontalBot, svg, i);
        }
    }
}

function initSvgElements(svg)
{
    for (var i = 0; i < yValues.length; i++) {
        svgElementsContainer.push(new Object);
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttributeNS(null, "cx", xScale(svg, i));
        circle.setAttributeNS(null, "cy", yScale(svg, yValues[i]));
        circle.setAttributeNS(null, "r", 0);
        circle.setAttributeNS(null, "fill", "red");
        svgElementsContainer[i].circle = circle;
        svg.appendChild(circle);

        var vertical = document.createElementNS("http://www.w3.org/2000/svg", "line");
        vertical.setAttributeNS(null, "x1", xScale(svg, i));
        vertical.setAttributeNS(null, "x2", xScale(svg, i));
        vertical.setAttributeNS(null, "y1", yScale(svg, yValues[i]));
        vertical.setAttributeNS(null, "y2", yScale(svg, yValues[i]));
        vertical.setAttributeNS(null, "style", "stroke:rgb(255,0,0);stroke-width:2");
        svgElementsContainer[i].vertical = vertical;
        svg.appendChild(vertical);

        var horisontalTop = document.createElementNS("http://www.w3.org/2000/svg", "line");
        horisontalTop.setAttributeNS(null, "x1", xScale(svg, i));
        horisontalTop.setAttributeNS(null, "x2", xScale(svg, i));
        horisontalTop.setAttributeNS(null, "y1", yScale(svg, yValues[i] - dataMargin));
        horisontalTop.setAttributeNS(null, "y2", yScale(svg, yValues[i] - dataMargin));
        horisontalTop.setAttributeNS(null, "style", "stroke:rgb(255,0,0);stroke-width:2");
        svgElementsContainer[i].horisontalTop = horisontalTop;
        svg.appendChild(horisontalTop);

        var horisontalBot = document.createElementNS("http://www.w3.org/2000/svg", "line");
        horisontalBot.setAttributeNS(null, "x1", xScale(svg, i));
        horisontalBot.setAttributeNS(null, "x2", xScale(svg, i));
        horisontalBot.setAttributeNS(null, "y1", yScale(svg, yValues[i] + dataMargin));
        horisontalBot.setAttributeNS(null, "y2", yScale(svg, yValues[i] + dataMargin));
        horisontalBot.setAttributeNS(null, "style", "stroke:rgb(255,0,0);stroke-width:2");
        svgElementsContainer[i].horisontalBot = horisontalBot;
        svg.appendChild(horisontalBot);
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

function animateCircleIn(circle)
{
    console.log(circle);
    let time = Date.now();
    var oStop = 1000;
    window.requestAnimationFrame(circleAnimation);
    function circleAnimation()
    {
        let waitTo = time + (animationDuration / circleRadius);
        circle.setAttributeNS(null, "r", parseInt(circle.getAttributeNS(null, "r")) + 1);
        while (time < waitTo)
        {
            time = Date.now();
        }
        oStop--;
        if ((parseInt(circle.getAttributeNS(null, "r")) < circleRadius) && (oStop > 0))
        {
            window.requestAnimationFrame(circleAnimation);
        }
    }
}

function animateVerticalIn(vertical, svg, center)
{
    let time = Date.now();
    var oStop = 1000;
    window.requestAnimationFrame(verticalAnimation);
    function verticalAnimation()
    {
        let waitTo;
        let pixelsByFrame;
        if (yScale(svg, dataMargin) < maxFrames)
        {
            waitTo = time + (animationDuration / yScale(svg, dataMargin));
            pixelsByFrame = 1;
        }
        else
        {
            waitTo = time + (animationDuration / maxFrames)
            pixelsByFrame = yScale(svg, dataMargin) / maxFrames;
        }
        vertical.setAttributeNS(null, "y1", parseInt(vertical.getAttributeNS(null, "y1")) - pixelsByFrame);
        vertical.setAttributeNS(null, "y2", parseInt(vertical.getAttributeNS(null, "y2")) + pixelsByFrame);
        while ((time < waitTo)) {
            time = Date.now();
        }
        oStop--;
        if ((parseInt(vertical.getAttributeNS(null, "y1")) > yScale(svg, center + dataMargin)) && (oStop > 0))
        {
            window.requestAnimationFrame(verticalAnimation);
        }
        else
        {
            vertical.setAttributeNS(null, "y1", yScale(svg, center + dataMargin));
            vertical.setAttributeNS(null, "y2", yScale(svg, center - dataMargin));
        }
    }
}

function animateHorisontalIn(top, bot, svg, center)
{
    let time = Date.now();
    var oStop = 1000;
    window.requestAnimationFrame(horisontalAnimation);
    function horisontalAnimation()
    {
        let waitTo = time + (animationDuration / (xScale(horisLength / 2)));
        top.setAttributeNS(null, "x1", parseInt(top.getAttributeNS(null, "x1")) - 1);
        top.setAttributeNS(null, "x2", parseInt(top.getAttributeNS(null, "x2")) + 1);
        bot.setAttributeNS(null, "x1", parseInt(bot.getAttributeNS(null, "x1")) - 1);
        bot.setAttributeNS(null, "x2", parseInt(bot.getAttributeNS(null, "x2")) + 1);
        var stop = 1000;
        while ((time < waitTo) && (stop > 0))
        {
            time = Date.now();
            stop--;
        }
        oStop--;
        if ((top.getAttributeNS(null, "x1") > xScale(svg, center - horisLength / 2)) && (oStop > 0))
        {
            window.requestAnimationFrame(horisontalAnimation);
        }
    }
}