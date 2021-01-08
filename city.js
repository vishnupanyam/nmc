class City {

    constructor(pos) {

        this.color = 'green';
        this.radius = 20;

        this.x = pos.x;
        this.y = pos.y;

		this.live = 100;        
    }

    draw(ctx){

        ctx.beginPath()
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y, this.radius, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
    }

	damage(value) {
		this.live -= value;
	}    
}