document.onload = function () {
    var graph = this.document.getElementById("graph");
}
graph.onload = function () {
    var ctx = graph.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.lineTo(700, 30);
    ctx.stroke();
} 