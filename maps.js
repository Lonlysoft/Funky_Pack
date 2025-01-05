var Camera = {
	x: 100, y: 100, z: 0, w: 800, h: 600,
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
	constructor(width, height, Name, hasWater, groundZero, structureTileSet, shadowGrid, ang, groundElevationGrid, teleportAndPlayerSpawnGrid, itemsGrid, waterGrid = []){
		this.groundTileSet = groundZero;
		this.objectGrid = structureTileSet;
		this.shadowGrid = shadowGrid;
		this.ang = ang;
		this.grndElGrid = groundElevationGrid;
		this.beingGrid = teleportAndPlayerSpawnGrid;
		this.width = width;
		this.height = height;
		this.Name = Name;
		this.bounds = [];
		this.inims = [];
		this.itemGrid = itemsGrid;
		this.items = [];
		this.hasWater = hasWater;
		this.waterGrid = waterGrid;
		this.waterBounds = [];
	}
	
	setBoundaries(){
		for(let i = 0; i < this.height; i++){
			this.bounds.push(new Array());
			for(let j = 0; j < this.width; j++){
				this.bounds[i].push(new Boundary(j * TILE_SIZE, this.grndElGrid[i][j] * TILE_SIZE, i * TILE_SIZE, tipify(this.ang[i][j])));
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
	drawFloor(type){
		//1 quer dizer imagem estática
		//2 quer dizer botar os tilesets
		if(type == 1){
			let imgX = CurrentCharacter.WorldPos.x - 260, imgY = CurrentCharacter.WorldPos.z - 260;
			ctx.drawImage(this.groundTileSet, imgX, imgY, 520, 520, 0, 0, 520, 520);
		}
		else if(type == 2){
			DRAW__Grid(ctx, Camera, this.groundTileSet, Game.tileSetGraphics, TILE_SIZE, 16);
		}
	}
	
	objectGridDraw(camada){
		DRAW__Grid(ctx, Camera, this.objectGrid[camada], Game.tileSetGraphics, TILE_SIZE);
	}//fim objectDraw
}// fim Classe levelScenery