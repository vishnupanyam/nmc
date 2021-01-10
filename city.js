class City {

    constructor(pos) {

        this.x = pos.x;
        this.y = pos.y - 20;

        this.color = 'green';
        this.radius = 20;

		this.live = City.LIVE;        
    }

    step(dt) {

    }

    draw(ctx){

        ctx.beginPath()
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.rect(this.x - this.radius ,this.y, this.radius*2, this.radius );
        ctx.fill();
        ctx.stroke();

        if (this.live < 1) {
            ctx.beginPath()
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'black';
            ctx.arc(this.x,this.y-this.radius*0.3,this.radius*0.8,2*Math.PI,false);
            ctx.fill();
            ctx.stroke();
        }
        
    }

	damage(value) {
		this.live -= value;
	}    
}

City.LIVE = 100;


class Tower extends City {

    constructor(pos,loadSpeed) {
        super(pos);

        this.id = Tower.ID++;
        this.y = pos.y - 20;

        this.color = 'blue';
        this.radius = 20;
    
        this.load = Tower.MAX_LOAD/2;    
        if (loadSpeed == null) loadSpeed = 20;
        this.loadSpeed = loadSpeed;
    }

    step(dt) {
        super.step(dt);

        this.load += this.loadSpeed*dt;
        if (this.load > Tower.MAX_LOAD)
            this.load = Tower.MAX_LOAD
        }    

    draw(ctx){
        super.draw(ctx);

        if (this.live > 0) {
            ctx.beginPath()
            ctx.strokeStyle = this.color;
            ctx.fillStyle = 'black';
            ctx.rect(this.x - this.radius ,this.y+1 - this.radius, this.radius*2, this.radius*2-2 );
            ctx.fill();
            ctx.stroke();


            var loadPercent = this.load/Tower.MAX_LOAD;

            var loadDim = {};
            loadDim.x = this.x-1 - this.radius/2;
            loadDim.y = this.y+1 + this.radius;
            loadDim.width = this.radius;
            loadDim.height = this.radius*2;

            loadDim.height = loadPercent*loadDim.height;
            loadDim.y = loadDim.y - loadDim.height;

            ctx.beginPath()
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.rect(loadDim.x , loadDim.y, loadDim.width, loadDim.height );
            ctx.fill();
            ctx.stroke();


        }
    }    

    isReady() {
        return (this.load == Tower.MAX_LOAD) ;
    }

    shot() {
        if (this.load == Tower.MAX_LOAD)        
            this.load = 0;
    }
}
Tower.MAX_LOAD = 100;
Tower.ID = 1;