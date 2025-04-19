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