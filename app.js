
var width, height;
var ctx;
var canvas;

const PLAYER = 1;
const OTHER = 2;
const CITY = 3;

const GAME_STOP = 0;
const GAME_RUNNING = 1;
const GAME_LEVEL_INIT = 1;
var game = {
    status:GAME_RUNNING,
    level:GAME_LEVEL_INIT
};

var conf = {
    ASTEROID_SPEED: 20,
    MISSILE_SPEED: 150,
    SCORE_BASE:25
};
var score = {};

var cities = [];
var asteroids = [];
var missiles = [];
var explosions = [];

var asteroidsWave = [];

function init() {

	// start & score
	modalEl = document.getElementById( 'modalEl' );
	scoreEl = document.getElementById( 'scoreEl' );
	levelEl = document.getElementById( 'levelEl' );
	scoreBigEl = document.getElementById( 'scoreBigEl' );
	score = { points: 0 };
	modalEl.style.display = 'none';    

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


	cities = [];
	missiles = [];
	asteroids = [];
    explosions = [];
        
    // create cities and defense towers
    cities.push(new Tower({x:width*1/10,y:height-10}));
    cities.push(new City({x:width*2/10,y:height-10}));
    cities.push(new City({x:width*3/10,y:height-10}));
    cities.push(new City({x:width*4/10,y:height-10}));
    cities.push(new Tower({x:width*5/10,y:height-10}));
    cities.push(new City({x:width*6/10,y:height-10}));
    cities.push(new City({x:width*7/10,y:height-10}));
    cities.push(new City({x:width*8/10,y:height-10}));
    cities.push(new Tower({x:width*9/10,y:height-10}));


    initLevel(GAME_LEVEL_INIT);
    game.status = GAME_RUNNING;

}

function initLevel(level) {

    game.level = level;

    while (asteroidsWave.length < game.level*5) {
        // create new asteroid
        var origin = {x: Math.random()*width, y:height*1/10};

        var num = Math.floor(Math.random() * cities.length);
        var target = cities[num];
        //var dest = {x:width/2 + (Math.random()-0.5)* width, y:height}; 
        var dest = {x:target.x, y:height}; 
        var asteroid = new Asteroid( origin, dest, conf.ASTEROID_SPEED);

        // add to asteroid wave
        asteroidsWave.push(asteroid);

        if (asteroidsWave.length > 25) break;
    }
}



// game loop

function loop() {
	if (game.status == GAME_RUNNING) 
        step(60/1000);    
    draw(ctx);
    window.requestAnimationFrame(loop);
}

function step(dt) {


    while (asteroidsWave.length>0) {
        var asteroid = asteroidsWave.pop();
        asteroids.push(asteroid);
    }
    

    // calculate next state 
    asteroids.forEach(asteroid => { asteroid.step(dt); });
    missiles.forEach(missile => { missile.step(dt); });
    explosions.forEach(explosion => { explosion.step(dt); });

    
    missiles.forEach( function(missile) { 
        if (missile.live == 0)
            explosions.push(new Explosion(PLAYER, {x:missile.x,y:missile.y}));
     });

     asteroids.forEach( function(asteroid) { 
        if (asteroid.live == 0)
            explosions.push(new Explosion(OTHER, {x:asteroid.x,y:asteroid.y}));
     });


    // explosion-asteroid interaction
    asteroids.forEach(asteroid => {
        explosions.forEach(explosion => {
            if ( explosion.collide( asteroid)) {
                asteroid.live = 0;

                var newScore = conf.SCORE_BASE + (explosion.score!=null?explosion.score:0);
                if (explosion.owner != PLAYER)
                    newScore = 0;

                explosions.push(new Explosion(explosion.owner, {x:asteroid.x,y:asteroid.y}, newScore));
                score.points += newScore;
            }
        });
    });


	// cities-asteroid interaction
	asteroids.forEach(asteroid => {
		cities.forEach( city => {
            if (city.live > 0) {
                if (asteroid.collide(city)) {
                    asteroid.live = 0;
                    explosions.push(new Explosion(OTHER, {x:asteroid.x,y:asteroid.y}));
    
                    city.damage(100);
    
                    if (city.live < 1)
                        explosions.push(new Explosion(CITY, {x:city.x,y:city.y}));
    
                }
            } 
		});
	});    

    // clear dead objects
    asteroids = asteroids.filter(asteroid => asteroid.live > 0);
    missiles = missiles.filter(missile => missile.live > 0);
    explosions = explosions.filter(explosion => explosion.live > 0);
    // cities = cities.filter(city => city.live > 0);


	if(cities.filter(city => city.live>0).length==0)
        gameOver();    
        
    if (asteroids.length == 0)
        initLevel(game.level + 1);

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
    //ctx.fillText('Missiles: '+ missiles.length, canvas.width - 100, 40);
    ctx.stroke();


    // draw cities
    cities.forEach(city => { city.draw(ctx); });

    // draw asteroids
    asteroids.forEach(asteroid => { asteroid.draw(ctx); });

    // draw missiles
    missiles.forEach(missile => { missile.draw(ctx); });

    // draw explosions
    explosions.forEach(explosion => { explosion.draw(ctx); });


    scoreEl.innerHTML = score.points;
    levelEl.innerHTML = game.level;

}


init();
loop();



function gameOver() {
	game.status = GAME_STOP;
	scoreBigEl.innerHTML = score.points;
	modalEl.style.display = 'flex';
}

canvas.addEventListener('click', function(e) {

    var playerDestX = e.pageX + this.offsetLeft;
    var playerDestY = e.pageY + this.offsetTop;

    //console.log('player point at x:'+ playerDestX +' y:'+ playerDestY);


    var tower = getTower(cities,playerDestX);

    if (tower != null) {
        // create missile
        var missile = new Missile( {x:tower.x,y:tower.y}, {x:playerDestX, y:playerDestY}, conf.MISSILE_SPEED);

        // add to missile stack
        missiles.push(missile);
    }


});

gameBtn.addEventListener('click', () => {
	init();
});

function getTower(cities,playerX) {

    var towers = cities.filter(city => city instanceof Tower && city.live > 0);

    var tower = null;

    var minDist = Infinity;

    for (var i=0; i<towers.length;i++) {

        var dist = getDist(towers[i], {x:playerX,y:0});

        if ( dist < minDist ) {
            tower = towers[i];
            minDist = dist;
        }
    };

    return tower;
}


function getDist(a,b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);    
}