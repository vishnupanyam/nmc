class Asteroid {

    constructor(pos,target, speed) {

        this.trailColor = "orange";
        this.bodyColor = "red";

        this.radius = 5;
        this.speed = speed;

        this.originX = pos.x;
        this.originY = pos.y;

        this.x = pos.x;
        this.y = pos.y;

		this.vx = 0;
		this.vy = 0;

        this.targetX = target.x;
        this.targetY = target.y;

        this.angle = -Math.atan2(this.originX -this.targetX, this.originY - this.targetY) - Math.PI/2;

        this.live = 100;

    }


    step(dt) {

        var dx = this.targetX - this.x;
        var dy = this.targetY - this.y;

        var distanceToTarget = Math.sqrt(dx * dx + dy * dy);

        if ( this.distanceToTarget == null)
            this.distanceToTarget = distanceToTarget;

        if (distanceToTarget > this.distanceToTarget) {
            this.live = 0;
        } else {

            this.vx = dt*this.speed * Math.cos(this.angle);
            this.vy = dt*this.speed * Math.sin(this.angle);

            this.x += this.vx;
            this.y += this.vy;

        }

        this.distanceToTarget = distanceToTarget;
    }

    draw(ctx) {

        // trails
        ctx.beginPath();                           
        ctx.moveTo(this.originX, this.originY );
        ctx.lineTo(this.x, this.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.trailColor;    
        ctx.stroke();         

        ctx.beginPath();
        ctx.strokeStyle = this.bodyColor;
        ctx.fillStyle = this.bodyColor;
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