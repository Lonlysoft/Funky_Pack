var Camera = {
	x: 100, y: 100, z: 0, w: canvas.width, h: canvas.height,
	moveTo: function(x, y, z){
		this.x = x - this.w*0.5;
		this.y = y - z - this.h*0.5;
		this.z = z;
		
		this.x += (x - this.x - this.w*0.5)*0.9; 
		this.y += (y - this.y - this.h*0.5)*0.9 - z;
		
	}
};

class Boundary{
	constructor(x, y, z, tipo){
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = TILE_SIZE;
		this.p = TILE_SIZE;
		this.h = y;
		this.tipo = tipo;
	}
}


//isso vai ser pra tipificar o terreno das tiles
function tipify(num){
	switch(num){
		case 0:
			return "solid";
		case 1:
			return "rampaNORTE";
		case 2:
			return "lava";
		case 3:
			return "dirtywater";
		case 4:
			return "quicksand";
	}
}


//pessoas e NPCS
class Level{
	constructor(mapObject){
		this.groundTileSet = mapObject.grids.floor;
		this.triggerGrid = mapObject.grids.triggers;
		this.objectGrid = mapObject.grids.objects;
		this.shadowGrid = mapObject.grids.shadow;
		this.ang = mapObject.grids.ang;
		this.npcGrid = mapObject.grids.npcs;
		this.grndElGrid = mapObject.grids.ground;
		this.beingGrid = mapObject.grids.beings;
		this.width = mapObject.width;
		this.height = mapObject.height;
		this.Name = mapObject.name;
		this.triggerList = [];
		this.bounds = [];
		this.npcs = [];
		this.itemGrid = mapObject.grids.items;
		this.items = [];
		this.hasWater = mapObject.hasWater;
		this.waterGrid = mapObject.grids.water;
		this.waterBounds = [];
		this.grass = [];
	}
	
	initialize(){
		this.setBoundaries();
		this.setNPCs(NPCS);
		this.setWater();
		this.setItems(ITEMS);
	}
	
	setBoundaries(){
		for(let i = 0; i < this.height; i++){
			this.bounds.push(new Array());
			for(let j = 0; j < this.width; j++){
				let angulation = (this.ang == null)? 0 : this.ang[i][j];
				this.bounds[i].push(new Boundary(j * TILE_SIZE, this.grndElGrid[i][j] * TILE_SIZE, i * TILE_SIZE, tipify(angulation)));
			}
		}
	}
	setGrass(){
		for(let i = 0; i < this.height; i++){
			for(let j = 0; j < this.width; j++){
				if(this.groundTileSet[i][j] >= 0 && this.groundTileSet[i][j] < 16){
					for(let k = 0; k < 10; k++){
						this.grass.push(new Grass(j*TILE_SIZE+k*(TILE_SIZE*0.1), this.grndElGrid[i][j]*TILE_SIZE, i*TILE_SIZE +random(0, TILE_SIZE)));
					}
				}
			}
		}
	}
	updateGrass(camera, arr){
		arr = [];
		
		const cameraCoords = [camera.x, camera.y, camera.w, camera.h]
		
		for (let i = 0; i < this.grass.length; i++) {
			const itemShadow = [
				this.grass[i].WorldPos.x,
				this.grass[i].WorldPos.z - this.grass[i].WorldPos.y,
				this.grass[i].w,
				this.grass[i].p + this.grass[i].h
			];
			if(Col.AABB(cameraCoords, itemShadow)){
				arr.push(this.grass[i]);
			}
		}
		return arr;
	}
	setWater(){
		if(this.hasWater){
			for(let i = 0; i < this.height; i++){
				this.waterBounds.push(new Array());
				for(let j = 0; j < this.width; j++){
					this.waterBounds[i].push(new Boundary(j * TILE_SIZE, this.waterGrid[i][j] * TILE_SIZE, i * TILE_SIZE, "water"));
				}
			}
		}
	}
	
	setItems(itemSource){
		if(this.itemGrid == undefined){
			return;
		}
		for(let i = 0; i < this.height; i++){
			for(let j = 0; j < this.width; j++){
				if(this.itemGrid[i][j] > 0){
					this.items.push(new Item( itemSource[this.itemGrid[i][j]], j*TILE_SIZE+TILE_SIZE*0.5-itemSource[this.itemGrid[i][j]].w*0.5, i*TILE_SIZE+TILE_SIZE*0.5-itemSource[this.itemGrid[i][j]].p*0.5, this.grndElGrid[i][j]*TILE_SIZE));
				}
			}
		}
	}
	
	updateVisibleItems(camera, arr) {
		//cleans the array and restart you got it.
		
		arr = [];
		
		const cameraCoords = [camera.x, camera.y, camera.w, camera.h]
		
		for (let i = 0; i < this.items.length; i++) {
			const itemShadow = [
				this.items[i].boxCol.x,
				this.items[i].boxCol.z - this.items[i].boxCol.y,
				this.items[i].boxCol.w,
				this.items[i].boxCol.p + this.items[i].boxCol.h
			];
			if(!this.items[i].isCollected && Col.AABB(cameraCoords, itemShadow)){
				arr.push(this.items[i]);
				this.items[i].visible = true;
			}
		}
		return arr;
	}
	
	cleanupItems(camera, arr) {
		return arr.filter(item => {
			if (item.isCollected) return false;
			
			const itemRight = item.boxCol.x + TILE_SIZE;
			const itemBottom = item.boxCol.y + TILE_SIZE;
			
			return (
				itemRight > camera.x &&
				item.boxCol.x < camera.x + camera.w &&
				itemBottom > camera.y &&
				item.boxCol.y < camera.y + camera.h
			);
		});
	}
	
	updateNPCs(camera){
		if(this.npcGrid == undefined){
			return;
		}
		const newArr = [];
		
		const x_grid = Math.max(0, Math.floor(camera.x / TILE_SIZE));
		const x_endGrid = Math.min(this.width - 1, Math.floor((camera.x + camera.w) / TILE_SIZE));
		
		const y_grid = Math.max(0, Math.floor(camera.y / TILE_SIZE));
		const y_endGrid = Math.min(this.height - 1, Math.floor((camera.y + camera.h) / TILE_SIZE));
		
		for (let i = y_grid; i <= y_endGrid; i++) {
			for (let j = x_grid; j <= x_endGrid; j++) {
				if (this.npcs[i][j] !== 0) {
					newArr.push(this.npcs[i][j]);
					this.npcs[i][j].isSpawn = this.npcs[i][j].spawn();
				}
			}
		}
		
		Game.NPCarr = newArr;
	}
	
	cleanupNPCs(camera, arr){
		arr = arr.filter( i => {
			if(!i.isAlive) return false;
			
			const cameraBox = [camera.x, camera.y, camera.w, camera.h];
			const iBox = [i.boxCol.x, i.boxCol.z, i.boxCol.w, i.boxCol.p];
			
			return (Col.AABB(cameraBox, iBox));
		});
	}
	
	drawFloor(tileGraphics = Game.tileSetGraphics){
		DRAW__Grid(ctx, Camera, this.groundTileSet, tileGraphics, TILE_SIZE, 48);
	}
	objectGridDraw(layer, tileSet = Game.tileSetGraphics){
		DRAW__Grid(ctx, Camera, this.objectGrid[layer], tileSet, TILE_SIZE, 48);
	}
	setTriggers(){
		for(let i = 0; i < this.height; i++){
			this.triggers.push(new Array());
			for(let j = 0; j < this.width; j++){
				if(this.triggerGrid[i][j] > 0){
					this.triggers[i].push(new Trigger(TRIGGERS[ this.triggerGrid[i][j] ]));
				}
			}
		}
	}
	setImportantNPCs(){
		if(!this.importants){
			return;
		}
		for(let i = 0; i < this.importants.length; i++){
			Game.ImportantNPCs.push(new NonPlayableChar(IMPORTANTS[this.importants[i]], {x: undefined, y: undefined, z: undefined}));
		}
	}
	//set as a chance of spawning new NPCs
	setNPCs(nonPlayableCharacterList){
		if(this.npcGrid == undefined){
			return;
		}
		for(let i = 0; i < this.height; i++){
			this.npcs.push(new Array());
			for(let j = 0; j < this.width; j++){
				if(this.npcGrid[i][j] > 0){
					this.npcs[i].push(
						new NonPlayableChar(
						nonPlayableCharacterList[random(1, 2)],
							//COORDINATES X, Y, Z;
							{
								z: GridToWorld(i, TILE_SIZE),
								y: GridToWorld(this.grndElGrid[i][j], TILE_SIZE),
								x: GridToWorld(j, TILE_SIZE),
							}
						)
					)
				} else{
					this.npcs[i].push(0);
				}
			}
		}
	}//
}// fim Classe levelScenery