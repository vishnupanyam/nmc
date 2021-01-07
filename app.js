
var width=800, height=400;
var ctx;
var canvas;

// game loop

function init() {

    canvas = document.getElementById("game-canvas");
    canvas.width = width;
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