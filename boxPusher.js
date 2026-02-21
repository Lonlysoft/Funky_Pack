const BoxPusherBox = {
	
};
const BoxPusher = {
	boxArr: [],
	currentMap: null,
	player: null,
	hasDeclared: false,
	hasBoxesPushed: false,
	asset: {
		box: document.querySelector(".boxPusherSprites"),
		boxProps: ["small", "medium", "big", "large", "huge", "hyper", "macro"],
		boxPropsSizeMultiplier: {
			small: 0.25,
			medium: 0.5,
			big: 0.75,
			large: 1.25,
			huge: 1.5,
			hyper: 2.25,
			macro: 3.75
		}
	},
	draw(){
		//drawGrid
	},
	declairBoxes(){
		for(let i = 0; i < currentMap.height; i++){
			for(let j = 0; j < currentMap.width; j++){
				this.boxArr[random(0, 3)]
			}
		}
	},
	gamePlay(){
		this.start();
		Col.main();
		Scenery.draw();
	},
	start(){
		if(!Scenery.hasDeclaired || !this.hasDeclaired){
			Scenery.declair(BoxPusher, BoxPusher.levelName, MAPS);
			Scenery.hasDeclair = true;
			this.player = 
			this.hasDeclaired = true;
		} else {
			if(!this.hasBoxesPushed){
				this.declairBoxes();
			}
		}
	},
	winningCondition(){
		if(this.finalBoxAmount >= 200){
			//request winning transition 
			
		}
	}
};