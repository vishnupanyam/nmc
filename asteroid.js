class Asteroid {

    constructor(pos,target, speed) {

        this.radius = 5;
        this.speed = speed;

        this.originX = pos.x;
        this.originY = pos.y;

        this.x = pos.x;
        this.y = pos.y;

        this.targetX = target.x;
        this.targetY = target.y;

        this.live = 1000;
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
            var angle = -Math.atan2(this.originX -this.targetX, this.originY - this.targetY) - Math.PI/2;

            this.x += dt*this.speed * Math.cos(angle);
            this.y += dt*this.speed * Math.sin(angle);
        }

        this.distanceToTarget = distanceToTarget;
    }

    draw(ctx) {

        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';
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