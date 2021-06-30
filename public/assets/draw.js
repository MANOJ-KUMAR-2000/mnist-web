let canvas = document.getElementById("canvass");
canvas.height = 280;
canvas.width = 280;

var drawing = false;
let ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);


function start(e) {
    drawing = true;
    draw(e);
}

function stop() {
    drawing = false;
    ctx.beginPath();

}

function draw(e) {
    if (!drawing) {
        return
    }
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);


}
canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stop)