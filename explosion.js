class Explosion {

    constructor(owner, pos, score) {

        if (score == null) score = 0;

        this.power = 60;
        this.radius = 1;
        this.owner = owner;

        if (owner == PLAYER)
            this.color = 'blue';
        if (owner == OTHER)
            this.color = 'red';
        if (owner == CITY) {
            this.power = 100;
            this.color = 'lightgreen';
        }


        this.x = pos.x;
        this.y = pos.y;

        this.score = score;
        this.live = Explosion.LIVE;
    }


    step(dt) {

        this.live -= dt*100;

        if (this.live > Explosion.LIVE/2)
            this.radius = 10 + this.power*(Explosion.LIVE - this.live)/Explosion.LIVE;
        else
            this.radius = 10+this.power - this.power*(Explosion.LIVE - this.live)/Explosion.LIVE;

        if (this.radius < 1)
            this.radius = 0;

    }

    draw(ctx) {

        this.explode(this.radius);

        if ( this.score > 0 && this.radius > 12) {
            ctx.save();
            ctx.beginPath();
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "rgba(255,255,255,0.9)";
            ctx.font = "17px Verdana";
            ctx.fillText(this.score , this.x+12, this.y);        
            ctx.restore();
        }        
            
    }


	explode(size) {

        //		if (this.explodeTime<0) return;
        
                // draw the explosion (concentric circles of different colours)
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, size * 1.1, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.arc(this.x, this.y, size * 1.1, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "orange";
                ctx.beginPath();
                ctx.arc(this.x, this.y, size * 1.0, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "yellow";
                ctx.beginPath();
                ctx.arc(this.x, this.y, size * 0.95, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc(this.x, this.y, size * 0.9, 0, Math.PI * 2, false);
                ctx.fill();
            }    


    collide(other) {
        var dx = other.x - this.x;
        var dy = other.y - this.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var minDist = this.radius + other.radius;
        if (dist < minDist)
            return true;
        return false;

    }
}

Explosion.LIVE = 1000;
