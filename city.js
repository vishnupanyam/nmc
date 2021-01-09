class City {

    constructor(pos) {

        this.color = 'green';

        this.radius = 20;

        this.x = pos.x;
        this.y = pos.y;

		this.live = City.LIVE;        
    }

    draw(ctx){

        ctx.beginPath()
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.rect(this.x - this.radius ,this.y - this.radius, this.radius*2, this.radius*2 );
        ctx.fill();
        ctx.stroke();

        // ctx.beginPath()
        // ctx.strokeStyle = this.color;
        // ctx.fillStyle = 'white';
        // ctx.arc(this.x,this.y,this.radius,2*Math.PI,false);
        // ctx.fill();
        // ctx.stroke();
        
    }

	damage(value) {
		this.live -= value;
	}    
}

City.LIVE = 100;


class Tower extends City {

    constructor(pos) {
        super(pos);

        this.color = 'blue';
        this.radius = 30;        
    }
}