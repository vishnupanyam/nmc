class City {

    constructor(pos) {
        this.radius = 20;

        this.x = pos.x;
        this.y = pos.y;
    }

    draw(ctx){

        ctx.beginPath()
        ctx.strokeStyle = 'green';
        ctx.fillStyle = 'lightgreen';
        ctx.arc(this.x,this.y, this.radius, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
    }
}