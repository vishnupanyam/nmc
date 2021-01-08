class Missile {

    constructor(pos,target) {

        this.radius = 5;

        this.originX = pos.x;
        this.originY = pos.y;

        this.x = pos.x;
        this.y = pos.y;

        this.targetX = target.x;
        this.targetY = target.y;

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
            var angle = -Math.atan2(this.originX -this.targetX, this.originY - this.targetY) - Math.PI/2;

            this.x += dt*100 * Math.cos(angle);
            this.y += dt*100 * Math.sin(angle);
        }

        this.distanceToTarget = distanceToTarget;

    }

    draw(ctx) {

        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.fillStyle = 'lightgreen';
        ctx.arc(this.x,this.y,this.radius,2*Math.PI,false);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = 'lightgreen';
        ctx.moveTo(this.targetX-10, this.targetY-10);
        ctx.lineTo(this.targetX+10, this.targetY+10);
        ctx.stroke();
    
        ctx.moveTo(this.targetX+10, this.targetY-10);
        ctx.lineTo(this.targetX-10, this.targetY+10);
        ctx.stroke();
            
    }
}