const yValues = [
-0.02, 0.045, -0.004, -0.01, -0.03, -0.02, -0.06, -0.03, -0.003, -0.01, 0, -0.02, -0.07, -0.02, -0.04, -0.04, -0.03, -0.04, -0.085, -0.014, -0.011, 0.03, -0.05, 0, -0.02
]
const backgroundYValues = [0.15, 0.1, 0.05, 0, -0.05, -0.1, -.15];
const circleRadius = 5;
const horisLength = 0.6;
const dataMargin = 0.05;
const yDistance = 0.35
const yMin = -0.17;
const graphPaddingX = 50;
const yAxisMarkerWidth = 15;
const yAxisTextPadding = 17;
const yAxisLetterWidth = 3;
const yAxisText = "y axis text";
const xAxisMarkerHeight = yAxisMarkerWidth;
const xAxisTextPadding = yAxisTextPadding;
const xAxisLetterWidth = 7;
const xAxisDisplayIndices = [3, 7, 11, 15, 19, 23];
const xAxisDisplayFirst = 24;
const xAxisDisplayValuePerIndex = -2;
const xAxisText = "Age at parent's layoff";
const graphStateArray = [
    [11, yValues.length - 1],
    [0, 10]
]
var svgElementsContainer = new Array; 
const animationDelay = 50;
const animationDuration = 300;
const maxFrames = 15;

var g_graphState = 0;

document.body.onload = function () {
    const svg = document.getElementById("graph");
    const left = document.getElementById("graph-left");
    const bot = document.getElementById("graph-bot");
    initBackground(svg);
    initLeft(left);
    initBot(bot, svg);
    initSvgElements(svg);
    addToGraph(document.getElementById("graph"), g_graphState);
    g_graphState++;

    window.onscroll = function () {
        headerScroll();
        const svg = document.getElementById("graph");
        const graphHolder = document.getElementById("graph-placeholder");
        const graph_overlay_texts = document.getElementsByClassName("graph-overlay-text");
        if (graph_overlay_texts[g_graphState - 1].offsetTop < graphHolder.offsetTop - svg.scrollHeight / 2) {
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

function xScale(element, xValue, withPadding = true) {
    let padding = withPadding ? graphPaddingX : 0;
    var scalar = (element.clientWidth - padding) / yValues.length;
    return Math.abs(xValue) * scalar + padding / 2;
}

function addToGraph(svg, graphState) {
    if (graphState < 2)
    {
        for (let i = graphStateArray[graphState][0]; i <= graphStateArray[graphState][1]; i++) {
            setTimeout(animateCircleIn, animationDelay * i, svgElementsContainer[i].circle);
            setTimeout(animateVerticalIn, animationDelay * i, svgElementsContainer[i].vertical, svg, yValues[i]);
            setTimeout(animateHorisontalIn, animationDelay * i + animationDuration, svgElementsContainer[i].horisontalTop, svgElementsContainer[i].horisontalBot, svg, i, i == 0 ? true : false);
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

        svgElementsContainer[i].vertical = addLine(svg, xScale(svg, i), xScale(svg, i), yScale(svg, yValues[i]), yScale(svg, yValues[i]), "rgb(255,0,0)", "2");
        svgElementsContainer[i].horisontalTop = addLine(svg, xScale(svg, i), xScale(svg, i), yScale(svg, yValues[i] - dataMargin), yScale(svg, yValues[i] - dataMargin), "rgb(255,0,0)", "2");
        svgElementsContainer[i].horisontalBot = addLine(svg, xScale(svg, i), xScale(svg, i), yScale(svg, yValues[i] + dataMargin), yScale(svg, yValues[i] + dataMargin), "rgb(255,0,0)", "2");
    }
}

function initBackground(svg) {
    addLine(svg, xScale(svg, 0, false), xScale(svg, yValues.length, false), yScale(svg, 0), yScale(svg, 0), "rgb(0,0,0)", "2");
    for (var i = 0; i < backgroundYValues.length; i++)
    {
        if (backgroundYValues[i] != 0)
        {
            addLine(svg, xScale(svg, 0, false), xScale(svg, yValues.length, false), yScale(svg, backgroundYValues[i]), yScale(svg, backgroundYValues[i]), "rgb(150, 150, 150)", "1");
        }
    }
}

function initLeft(svg)
{
    addLine(svg, svg.clientWidth, svg.clientWidth, 0, svg.scrollHeight, "rgb(0,0,0)", "2");
    addText(svg, svg.clientWidth - (yAxisMarkerWidth + yAxisTextPadding * 2 + yAxisLetterWidth), svg.scrollHeight / 2, true, yAxisText).classList.add("yAxisText");
    for (let i = 0; i < backgroundYValues.length; i++)
    {
        addLine(svg, svg.clientWidth - yAxisMarkerWidth, svg.clientWidth, yScale(svg, backgroundYValues[i]), yScale(svg, backgroundYValues[i]), "rgb(0,0,0)", "2");
        var text = addText(svg, svg.clientWidth - yAxisMarkerWidth - yAxisTextPadding, yScale(svg, backgroundYValues[i]), true, backgroundYValues[i].toString());
        text.classList.add("yAxisMarker");
    }
}

function initBot(bot, svg)
{
    const marginLeft = bot.clientWidth - svg.clientWidth;
    addLine(bot, marginLeft, bot.clientWidth, 0, 0, "rgb(0,0,0)", "2");
    addText(
        bot,
        marginLeft + svg.clientWidth / 2 - xAxisText.length * xAxisLetterWidth / 2,
        xAxisMarkerHeight + xAxisTextPadding * 2 + xAxisLetterWidth,
        false,
        xAxisText
    ).classList.add("xAxisText");
    for (let i = 0; i < xAxisDisplayIndices.length; i++)
    {
        addLine(bot, xScale(svg, xAxisDisplayIndices[i], false) + marginLeft, xScale(svg, xAxisDisplayIndices[i], false) + marginLeft, 0, xAxisMarkerHeight, "rgb(0,0,0)", "2");
        var text = addText(bot, xScale(svg, xAxisDisplayIndices[i], false) + marginLeft - ((xAxisDisplayFirst + i* xAxisDisplayValuePerIndex).toString().length * xAxisLetterWidth / 2), xAxisMarkerHeight + xAxisTextPadding, false, xAxisDisplayFirst + i * xAxisDisplayValuePerIndex);
        text.classList.add("xAxisMarker");
    }
}

function animateCircleIn(circle)
{
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

function animateHorisontalIn(top, bot, svg, center, isFirst = false)
{
    let time = Date.now();
    var oStop = 1000;
    window.requestAnimationFrame(horisontalAnimation);
    function horisontalAnimation()
    {
        let waitTo = time + (animationDuration / (xScale(svg, horisLength / 2)));
        top.setAttributeNS(null, "x1", parseInt(top.getAttributeNS(null, "x1")) - 1);
        top.setAttributeNS(null, "x2", parseInt(top.getAttributeNS(null, "x2")) + 1);
        bot.setAttributeNS(null, "x1", parseInt(bot.getAttributeNS(null, "x1")) - 1);
        bot.setAttributeNS(null, "x2", parseInt(bot.getAttributeNS(null, "x2")) + 1);
        while ((time < waitTo) && (stop > 0))
        {
            time = Date.now();
        }
        oStop--;
        if ((top.getAttributeNS(null, "x1") >
            (isFirst ?
                graphPaddingX / 2 - xScale(svg, (center - horisLength / 2), false) :
                xScale(svg, (center - horisLength / 2), true)))
            && (oStop > 0))
        {
            window.requestAnimationFrame(horisontalAnimation);
        }
    }
}

function addLine(svg, x1, x2, y1, y2, colour, width)
{
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttributeNS(null, "x1", x1);
    line.setAttributeNS(null, "x2", x2);
    line.setAttributeNS(null, "y1", y1);
    line.setAttributeNS(null, "y2", y2);
    line.setAttributeNS(null, "style", "stroke:" + colour + ";stroke-width:" + width);
    svg.appendChild(line); 
    return line;
}

function addText(svg, x, y, rotate = false, textString)
{
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttributeNS(null, "x", x);
    text.setAttributeNS(null, "y", y);
    text.innerHTML = textString;
    if (rotate)
    {
        text.setAttributeNS(null, "transform", "rotate(90," + (x + textString.length * yAxisLetterWidth).toString() + "," + y + ")");
        text.setAttributeNS(null, "y", y + textString.length * yAxisLetterWidth);
    }
    svg.appendChild(text);
    return text;
}