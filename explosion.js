class Explosion {

    constructor(pos) {

        this.radius = 1;


        this.x = pos.x;
        this.y = pos.y;


        this.live = 100;
    }


    step(dt) {

        this.live -= dt*100/2;

        if (this.live > 50)
            this.radius = 10 + 40*(100 - this.live)/100;
        else
            this.radius = 50 - 50*(100 - this.live)/100;

        if (this.radius < 1)
            this.radius = 0;

    }

    draw(ctx) {

        ctx.beginPath();
        ctx.strokeStyle = 'orange';
        ctx.fillStyle = 'yellow';
        ctx.arc(this.x,this.y,this.radius,2*Math.PI,false);
        ctx.fill();
        ctx.stroke();
            
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