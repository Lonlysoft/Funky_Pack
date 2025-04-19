//codigo dos INIMIGOS E NPCs

class NonPlayableChar extends Being{
	constructor(name, age, height, width, dept, coords, dialogs, pathArr, HTMLsrc, animations){
		super(name, age, 4, 8, height, width, dept, HTMLsrc, animations);
		this.dialog = dialogs;
		this.realtionshipLevelWithYou = 0;
		this.dimen = {w: width, h: height, p: dept};
		this.visible = true;
		this.SpawnPos = {x: coords.x, y: coords.y, z: coords.z};
		this.flagCoords = {x: coords.x, y: coords.y, z: coords.z}
		this.boxCol = new Box(coords.x, coords.y + this.dimen.h, coords.z, this.dimen.w, this.dimen.h, this.dimen.p);
		this.behaviorArr = {arr: pathArr, index: 0};
		this.relationshipLevelWithYou = 0;
	}
	draw(){
		ctx.fillRect(this.centralPoint[0], this.centralPoint[1], this.boxCol.w , this.boxCol.h);
	}
	update(){
		scriptedBehavior(this, this.behaviorArr);
		this.boxCol.x += this.velocity.x;
		this.boxCol.z += this.velocity.z;
		this.WorldPos.y += this.velocity.y;
		this.WorldPos.x = this.boxCol.x + this.boxCol.w*0.5;
		this.WorldPos.z = this.boxCol.z + this.boxCol.p*0.5;
		this.boxCol.y = this.WorldPos.y + this.boxCol.h;
		this.shadow.x = this.boxCol.x;
		this.shadow.y = this.boxCol.z + this.boxCol.y;
		this.centralPoint[0] = WorldToScreen1D(this.WorldPos.x, Camera.x, Camera.w/2 - Game.SCREEN_CENTER[0]);
		this.centralPoint[1] = WorldToScreen1D(this.WorldPos.z-this.WorldPos.y, Camera.y, Camera.h/2 - Game.SCREEN_CENTER[1]);
	}
	spawn(){
		this.WorldPos.x = this.SpawnPos.x;
		this.WorldPos.z = this.SpawnPos.z;
		this.WorldPos.y = this.SpawnPos.y;
		this.boxCol.x = this.SpawnPos.x - this.boxCol.w*0.5;
		this.boxCol.z = this.SpawnPos.z - this.boxCol.p*0.5;
		this.boxCol.y = this.SpawnPos.y + this.boxCol.h;
		return true;
	}
}

const BehaviorList = {
	linearX: function(entity){
		entity.walk("x");
		entity.rayCast = (entity.pol == -1) ? entity.boxCol.x : entity.boxCol.x + entity.boxCol.w;
		if(Game.currentMap.relevoGrid[WorldToGrid(entity.WorldPos.z, TILE_SIZE)][WorldToGrid(entity.rayCast, TILE_SIZE)] != Game.currentMap.relevoGrid[WorldToGrid(entity.WorldPos.z, TILE_SIZE)][WorldToGrid(entity.WorldPos.x, TILE_SIZE)]){
			entity.pol *= -1;
		}
	},
	linearZ: function(entity){
		entity.walk("z");
		entity.rayCast = (entity.pol == 1) ? entity.boxCol.z : entity.boxCol.z+entity.boxCol.p;
		if(Game.currentMap.relevoGrid[WorldToGrid(entity.WorldPos.z, TILE_SIZE)][WorldToGrid(entity.rayCast, TILE_SIZE)] != Game.currentMap.relevoGrid[WorldToGrid(entity.WorldPos.z, TILE_SIZE)][WorldToGrid(entity.WorldPos.x, TILE_SIZE)]){
			entity.pol *= -1;
		}
	},
	nothing: function(){
		
	},
	goToX: function(entity){
		entity.walk("x");
	},
	goToZ: function(entity){
		entity.walk("Z");
	}
	
}

//ele pega um array e checa se ele chegou. s
function scriptedBehavior(entity, objectBehav){
	switch(objectBehav.arr[objectBehav.index][0]){
		case "goToX": case "goToY":
			if(objectBehav.arr[objectBehav.index][1] < entity.WorldPos.x){
				entity.pol = 1;
				BehaviorList[objectBehav.arr[objectBehav.index][0]](entity);
			} else if(objectBehav.arr[objectBehav.index][1] > entity.WorldPos.x){
				entity.pol = -1;
				BehaviorList[objectBehav.arr[objectBehav.index][0]](entity);
			}
			if(objectBehav.arr[objectBehav.index][1] >= entity.WorldPos.x + 10 && objectBehav.arr[objectBehav.index][1] <= entity.WorldPos.x - 10){
				objectBehav.index++;
			}
		break;
		case "stopAndWait":
			entity.stop();
			if(Relogio.hour == Relogio.convertToHourAndMinute(objectBehav.arr[objectBehav.index][1]).hour){
				objectBehav.index++;
			}
		break;
		case "talk":
			UI.dialogo(objectBehav.arr[objectBehav.index][1]);
			if(UI.isDialogoDismissed){
				objectBehav.index++;
			}
		break;
		default: break;
	}
}
