let canvas = document.getElementById("canvass");
canvas.height = 280;
canvas.width = 280;
var boundings = canvas.getBoundingClientRect();

var drawing = false;
let ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
var boundings = canvas.getBoundingClientRect();
var clear_btn = document.getElementById('clear-btn');
var predict_btn = document.getElementById('predict-btn');
var result_space = document.getElementById('result');


function clear() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

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
    ctx.lineTo(e.clientX - boundings.left, e.clientY - boundings.top);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - boundings.left, e.clientY - boundings.top);
}

function preprocessCanvas(image) {
    let tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([28, 28])
        .mean(2)
        .expandDims(2)
        .expandDims()
        .toFloat();
    return tensor.div(255.0)

}

async function predcit() {
    html2canvas(document.getElementById("canvass"))
        .then((img) => {
            fetch('/pre', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ img_tensor: preprocessCanvas(img) })
                }).then((response) => {
                    response.json()
                        .then(data => {
                            result_space.innerText = data.num;
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        })
}


canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stop)
clear_btn.addEventListener('click', clear);
predict_btn.addEventListener('click', predcit);