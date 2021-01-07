
var width=100, height=100;
var ctx;
var canvas;

// game loop

function init() {

    canvas = document.getElementById("game-canvas");

    var canvasRatio = canvas.height / canvas.width;
    var windowRatio = window.innerHeight / window.innerWidth;
        

    if (windowRatio < canvasRatio) {
        height = window.innerHeight;
        width = height / canvasRatio;
    } else {
        width = window.innerWidth;
        height = width * canvasRatio;
    }

    canvas.width  = width;
    canvas.height = height;

    ctx = canvas.getContext("2d");

    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.stroke();

    ctx.moveTo(0, height);
    ctx.lineTo(width, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(width/2, height/2, height*0.4, 0, 2 * Math.PI);
    ctx.stroke();

    console.log('start');

}


init();

canvas.addEventListener('click', event => {
    console.log('click at x:'+ event.x +' y:'+ event.y );
});
