
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
	currentMap: null,
	player: null,
	hasDeclared: false,
	hasBoxesPushed: false,
	asset: {
		box: document.querySelector(".boxPusherSprites"),
		boxProps: ["small", "medium", "big", "large", "huge", "hyper", "macro"],
		boxPropsObjects: [
			{w: TILE_SIZE/4, p: TILE_SIZE/4, h: TILE_SIZE/4},
			{w: TILE_SIZE/2, p: TILE_SIZE/2, h: TILE_SIZE/2},
			{w: TILE_SIZE, p: TILE_SIZE, h: TILE_SIZE},
			{w: TILE_SIZE*1.5, p: TILE_SIZE*1.5, h: TILE_SIZE*1.5},
		]
	},
	draw(){
		//drawGrid
	},
	declairBoxes(){
		for(let i = 0; i < currentMap.height; i++){
			for(let j = 0; j < currentMap.width; j++){
				if(random_number(0, 3)){
					
				}
			}
		}
	},
	start(){
		if(!Scenery.hasDeclaired || !this.hasDeclaired){
			Scenery.declair(BoxPusher, BoxPusher.levelName, MAPS);
			Game.CurrentCharacter = Characters[0];
			Scenery.hasDeclair = true;
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