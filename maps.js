var Camera = {
	x: 100, y: 100, z: 0, w: canvas.width, h: canvas.height,
	moveTo: function(x, y, z){
		this.x = x - this.w*0.5;
		this.y = y - z - this.h*0.5;
		this.z = z;
		
//		this.x += (x - this.x - this.w*0.5)*0.9; 
		//this.y += (y - this.y - this.h*0.5)*0.9 - z;
		
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
		this.triggers = [];
		this.bounds = [];
		this.npcs = [];
		this.itemGrid = mapObject.grids.items;
		this.items = [];
		this.hasWater = mapObject.hasWater;
		this.waterGrid = mapObject.grids.water;
		this.waterBounds = [];
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
		for(let i = 0; i < this.height; i++){
			this.items.push(new Array());
			for(let j = 0; j < this.width; j++){
				if(this.itemGrid[i][j] > 0){
					this.items[i].push(new Item(
						itemSource[ this.itemGrid[i][j] ][0], itemSource[ this.itemGrid[i][j] ][1], 
						itemSource[ this.itemGrid[i][j] ][2], itemSource[ this.itemGrid[i][j] ][3], 
						itemSource[ this.itemGrid[i][j] ][4], itemSource[ this.itemGrid[i][j] ][5], 
						itemSource[ this.itemGrid[i][j] ][6], itemSource[ this.itemGrid[i][j] ][7], 
						j*TILE_SIZE, i*TILE_SIZE, this.grndElGrid[i][j]*TILE_SIZE
						)
					);
					
				} else{
					this.items[i].push(0);
				}
			}
		}
	}
	drawFloor(tileGraphics = Game.tileSetGraphics){
		DRAW__Grid(ctx, Camera, this.groundTileSet, tileGraphics, TILE_SIZE, 48);
	}
	objectGridDraw(layer, tileSet = Game.tileSetGraphics){
		DRAW__Grid(ctx, Camera, this.objectGrid[layer], tileSet, TILE_SIZE);
	}
	setTriggers(){
		for(let i = 0; i < this.height; i++){
			this.items.push(new Array());
			for(let j = 0; j < this.width; j++){
				if(this.triggerGrid[i][j] > 0){
					this.triggers[i].push(new Item(
							TRIGGERS[ this.triggerGrid[i][j] ]["name"], TRIGGERS[ this.triggerGrid[i][j] ]["function"],
							j*TILE_SIZE, i*TILE_SIZE, this.grndElGrid[i][j]*TILE_SIZE
						)
					);
					
				} else{
					this.triggers[i].push(0);
				}
			}
		}
	}
	setNPCs(nonPlayableCharacterList){
		for(let i = 0; i < this.height; i++){
			this.npcs.push(new Array());
			for(let j = 0; j < this.width; j++){
				if(this.npcGrid[i][j] > 0){
					this.npcs[i].push(
						new NonPlayableChar(
							nonPlayableCharacterList[this.npcGrid[i][j]].name,
							nonPlayableCharacterList[this.npcGrid[i][j]].age,
							nonPlayableCharacterList[this.npcGrid[i][j]].height,
							nonPlayableCharacterList[this.npcGrid[i][j]].width,
							nonPlayableCharacterList[this.npcGrid[i][j]].dept,
							//COORDINATES X, Y, Z;
							{
								z: GridToWorld(i, TILE_SIZE),
								y: GridToWorld(this.grndElGrid[i][j], TILE_SIZE),
								x: GridToWorld(j, TILE_SIZE),
							},
							nonPlayableCharacterList[this.npcGrid[i][j]].dialogs,
							nonPlayableCharacterList[this.npcGrid[i][j]].pathArr,
							nonPlayableCharacterList[this.npcGrid[i][j]].HTMLsrc,
							nonPlayableCharacterList[this.npcGrid[i][j]].animations,
						)
					)
				} else{
					this.npcs[i].push(0);
				}
			}
		}
	}//
}// fim Classe levelScenery