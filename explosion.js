class Explosion {


    static LIVE = 300;

    constructor(pos, score) {

        this.radius = 1;


        this.x = pos.x;
        this.y = pos.y;

        this.score = score;
        this.live = Explosion.LIVE;
    }


    step(dt) {

        this.live -= dt*100;

        if (this.live > Explosion.LIVE/2)
            this.radius = 0 + 50*(Explosion.LIVE - this.live)/Explosion.LIVE;
        else
            this.radius = 50 - 50*(Explosion.LIVE - this.live)/Explosion.LIVE;

        if (this.radius < 1)
            this.radius = 0;

    }

    draw(ctx) {

        ctx.beginPath();
        ctx.strokeStyle = 'yellow';
        ctx.fillStyle = 'black';
        ctx.arc(this.x,this.y,this.radius,2*Math.PI,false);
        ctx.fill();
        ctx.stroke();

        if ( this.score > 0 && this.radius > 10) {
            ctx.save();
            ctx.beginPath();
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            ctx.font = "18px Verdana";
        
            ctx.fillText(this.score , this.x+10, this.y);            
            ctx.restore();
        }        
            
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