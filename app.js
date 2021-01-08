
var width, height;
var ctx;
var canvas;


var game = {maxAsteroids:3 };
var cities = [];
var asteroids = [];
var missiles = [];
var explosions = [];


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

    cities.push(new City({x:width/2,y:height}));

}

// game loop
function loop() {
    step(60/1000);    
    draw(ctx);
    window.requestAnimationFrame(loop);
}

function step(dt) {

    if (asteroids.length < game.maxAsteroids) {
        // create new asteroid
        var asteroid = new Asteroid( {x: Math.random()*width, y:height*1/10}, {x:width/2, y:height});

        // add to asteroid stack
        asteroids.push(asteroid);

    }
    

    // calculate next state 
    asteroids.forEach(asteroid => { asteroid.step(dt); });
    missiles.forEach(missile => { missile.step(dt); });
    explosions.forEach(explosion => { explosion.step(dt); });

    
    missiles.forEach( function(missile) { 
        if (missile.live == 0)
            explosions.push(new Explosion({x:missile.x,y:missile.y}));
     });

    // explosion-asteroid interaction
    asteroids.forEach(asteroid => {
        explosions.forEach(explosion => {
            if ( explosion.collide( asteroid)) {
                asteroid.live = 0;
                explosions.push(new Explosion({x:asteroid.x,y:asteroid.y}));
            }
        });
    });

    // clear dead objects
    asteroids = asteroids.filter(asteroid => asteroid.live > 0);
    missiles = missiles.filter(missile => missile.live > 0);
    explosions = explosions.filter(explosion => explosion.live > 0);

}

function draw(ctx) {

    // clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,width,height);
    ctx.stroke();

    // canvas text
    ctx.beginPath()
    ctx.textAlign = 'right';
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Missiles: '+ missiles.length, canvas.width - 100, 40);
    ctx.stroke();


    // draw cities
    cities.forEach(city => { city.draw(ctx); });

    // draw asteroids
    asteroids.forEach(asteroid => { asteroid.draw(ctx); });

    // draw missiles
    missiles.forEach(missile => { missile.draw(ctx); });

    // draw explosions
    explosions.forEach(explosion => { explosion.draw(ctx); });

}


init();
loop();

canvas.addEventListener('click', function(e) {

    var playerDestX = e.pageX + this.offsetLeft;
    var playerDestY = e.pageY + this.offsetTop;

    console.log('player point at x:'+ playerDestX +' y:'+ playerDestY);

    // create missile
    var missile = new Missile( {x:width/2, y:height}, {x:playerDestX, y:playerDestY});

    // add to missile stack
    missiles.push(missile);

});
