var Camera = {
	x: 100, y: 100, w: canvas.width, h: canvas.height,
	smoothing: 0.4,
	moveTo: function(x, y, z){
		//this.x = x - this.w*0.5;
		//this.y = y - z - this.h*0.5;
		
		this.x += (x - this.x - this.w*0.5) *this.smoothing; 
		this.y += (y - z - this.y - this.h*0.5) *this.smoothing;
		
	},
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

class SuperMap{
	constructor(mapName){
		this.isChunkedMap = true;
		this.pieces = {};
		this.initialize(mapName);
		this.mapName = mapName;
	}
	async initialize(mapName){
		for(let cx = 0; cx < 3; cx++){
			for(let cy = 0; cy < 3; cy++){
				await loadMap(mapName + "/" + cx + "_" + cy).then(
					mapData => {
						this.pieces[`${cx}_${cy}`] = new Level(mapData);
						this.pieces[`${cx}_${cy}`].initialize();
						Scenery.hasDeclaired = true;
					}
				);
			}
		}
		
	}
	update(entityWorldPos){
		let coords = {
			cx: WorldToChunk(entityWorldPos.x),
			cy: WorldToChunk(entityWorldPos.z-entityWorldPos.y),
		};
		let necessaryChunks = [];
		for(let i = -1; i <= 1; i++){
			for(let j = -1; j <= 1; j++){
				let nx = coords.cx+i;
				let ny = coords.cy+j;
				if(nx < 0){
					nx = 0;
				}
				if(ny < 0){
					ny = 0;
				}
				let chunkId = `${nx}_${ny}`
				necessaryChunks.push(chunkId);
				if(!this.pieces[chunkId]){
					this.loadChunk(chunkId);
				}
			}
		}
		coords.cy = WorldToChunk(entityWorldPos.z);
		let chunkId = `${coords.cx}_${coords.cy}`
		if(!necessaryChunks.includes(chunkId)){
			necessaryChunks.push(chunkId);
			if(!this.pieces[chunkId]){
				this.loadChunk(chunkId);
			}
		}
		for(let c in this.pieces){
			if(!necessaryChunks.includes(c)){
				this.unloadChunk(c);
			}
		}
	}
	async loadChunk(id){
		await loadMap(this.mapName+"/"+id).then(
			mapData =>{
				this.pieces[id] = new Level(mapData);
				this.pieces[id].initialize();
			}
		)
	}
	unloadChunk(id){
		delete this.pieces[id];
	}
	drawFloor(tileGraphics = Game.tileSetGraphics){
		DRAW__chunkedGrid(ctx, Camera, 'groundTileSet', this.pieces, tileGraphics, TILE_SIZE, 48);
	}
	objectGridDraw(layer, tileGraphics = Game.tileSetGraphics){
		let chunkX = WorldToChunk(Game.CurrentCharacter.WorldPos.x);
		let chunkY = WorldToChunk(Game.CurrentCharacter.WorldPos.z);
		debugCollision("map", this.pieces[`${chunkX}_${chunkY}`].objectGrid[layer].length, layer);
		DRAW__chunkedGrid(ctx, Camera, 'objectGrid', this.pieces, tileGraphics, TILE_SIZE, 48, layer);
	}
	cleanupItems(){
		return []
	}
	cleanupNPCs(){
		return []
	}
	updateVisibleItems(){
		return []
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
	}
	initialize(itemAssets = ITEMS, entityAssets = NPCS){
		this.setBoundaries();
		this.setNPCs(entityAssets);
		this.setItems(itemAssets);
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
	setItems(itemSource){
		if(this.itemGrid == undefined){
			return;
		}
		for(let i = 0; i < this.height; i++){
			for(let j = 0; j < this.width; j++){
				if(this.itemGrid[i][j] > 0){
					this.items.push(new Item(
						itemSource[this.itemGrid[i][j]],
						j*TILE_SIZE+TILE_SIZE*0.5-itemSource[this.itemGrid[i][j]].w*0.5,
						i*TILE_SIZE+TILE_SIZE*0.5-itemSource[this.itemGrid[i][j]].p*0.5,
						this.grndElGrid[i][j]*TILE_SIZE));
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
	update(){
		return;
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
		if(!this.npcGrid){
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
		if(!this.npcGrid){
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