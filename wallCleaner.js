const WallCleaner = {
	score: 0,
	salary: 2499,
	glass: [],
	glassState: [0, 1, 2, 3], //add ID from tileset when you have it.
	currentLevelName: "level1",
	stage: null,
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
		let stageGrid = this.stage.groundTileSet;
		for(let i = 0; i < this.glassHeight; i++){
			for(let j = 0; j < this.glassWidth; j++){
				if(stageGrid[i][j] == 0 || stageGrid[i][j] == 1 || stageGrid[i][j] == 2){
					stageGrid[i][j] = 2;
					this.glass.push([i, j]);
				}
			}
		}
	},
	draw(p1){
		DRAW__Grid(Game.ctx, Camera, this.stage.groundTileSet, this.tileGraph, TILE_SIZE, 48);
	},
	checkWinning(){
		for(let i = 0; i < this.glass.length; i++){
			if([this.glass[i][0]][this.glass[i][1]] == 0){
				return false;
			}
		}
		return true;
	},
	start(entity){
		if(!this.hasStarted){
			//declair the grid 
			this.stage = new Level(WallCleanerMaps[this.currentLevelName]);
			this.setGlass();
			entity.boxCol.x = GridToWorld(5, TILE_SIZE);
			entity.boxCol.z = GridToWorld(5, TILE_SIZE);
			entity.WorldPos.x = GridToWorld(5, TILE_SIZE);
			entity.WorldPos.z = GridToWorld(5, TILE_SIZE);
			entity.WorldPos.y = 0;
			this.stage.setBoundaries();
			this.hasStarted = true;
		}
		if(this.cleaner.x != undefined && this.cleaner.y != undefined){
			this.glass[this.cleaner.y][this.cleaner.x] = 0;
		}
		Col.main(entity, this.stage)
		entity.update();
		Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
		Ctrl.action(entity, "wallCleaner");
		this.draw();
		entity.draw(this.stage);
		Camera.moveTo(entity.WorldPos.x, entity.WorldPos.z, 0);
		this.hasWon = this.checkWinning();
		if(this.hasWon){
			entity.money += this.salary;
			
			GameMoment = GameMomentSav;
		}
	}
}