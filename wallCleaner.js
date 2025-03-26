const WallCleaner = {
	score: 0,
	salary: 2499,
	glass: [],
	glassState: [0, 1, 2, 3], //add ID from tileset when you have it.
	
	stageGrid: null,
	cleaner: {x: undefined, y: undefined},
	stroller: {x: 0, y: 0, w: TILE_SIZE*4, h: TILE_SIZE},
	target: {x: 0, y: 0},
	glassWidth: 50,
	glassHeight: 50,
	hasStarted: false,
	hasWon: false,
	tileGraph: document.getElementById("WallCleanerTileGraphic"),
	bufferCoords: {x: 0, y: 0, z: 0}, // defined when setting up the game and the entity receives back its coordinates to spawn back in the map if the entity col grid goes wrong...
	clean(){
		
			this.stageGrid[this.target.y][this.target.x] = 0
	},
	setGlass(){
		for(let i = 0; i < this.glassHeight; i++){
			
			for(let j = 0; j < this.glassWidth; j++){
				if(stageGrid[i][j] == 0 || stageGrid[i][j] == 1 || stageGrid[i][j] == 2){
					glass[i].push([this.]);
				}
			}
		}
	},
	draw(p1){
		DRAW__Grid(Game.ctx, Camera, this.glass, this.tileGraph, 32, 16);
		Game.ctx.fillRect(p1.centralPoint[0]-32*0.5, p1.centralPoint[1]-32*0.5, 32, 32);
	},
	checkWinning(){
		for(let i = 0; i < this.glassHeight; i++){
			for(let j = 0; j < this.glassWidth; j++){
				if(this.glass[i][j] == 1){
					return false;
				}
			}
		}
		return true;
	},
	start(entity){
		if(!this.hasStarted){
			this.setGlass();
			entity.boxCol.x = GridToWorld(5, TILE_SIZE);
			entity.boxCol.z = GridToWorld(5, TILE_SIZE);
			this.hasStarted = true;
		}
		if(this.cleaner.x != undefined && this.cleaner.y != undefined){
			this.glass[this.cleaner.y][this.cleaner.x] = 0;
		}
		if(entity.WorldPos.x<entity.boxCol.w*0.5){
			entity.WorldPos.x = entity.boxCol.w*0.5;
			entity.boxCol.x = 0;
			entity.velocity.x = 0;
		}
		if(entity.WorldPos.z<entity.boxCol.p*0.5){
			entity.WorldPos.z = entity.boxCol.p;
			entity.boxCol.z = 0;
			entity.velocity.z = 0;
			//aqui teria uma tela de game over porque ele tà out of bounds
		}
		
		entity.update();
		Ctrl.draw(Ctrl.Btns, Ctrl.graph);
		Ctrl.action(entity, "wallCleaner");
		this.draw();
		Camera.moveTo(entity.WorldPos.x, entity.WorldPos.z, 0);
		this.hasWon = this.checkWinning();
		if(this.hasWon){
			entity.money += this.salary;
			
			GameMoment = GameMomentSav;
		}
	}
}