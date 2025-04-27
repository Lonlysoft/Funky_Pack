
class BoxPusherBox{
	constructor(x, y, w, h, p, dir) {
		this.x = x;
		this.y = y;
		this.p = p;
		this.w = w;
		this.h = h;
		this.dir = dir;
	}
}

const BoxPusher = {
	stage: null,
	player: null,
	hasDeclared: false,
	asset: {
		
	},
	draw(){
		//drawGrid
	},
	start(){
		if(!this.hasDeclared){
			this.stage = new Level(this.asset);
			this.hasDeclaired = true;
		}else{
			
		}
	}
};