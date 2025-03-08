const TILE_SIZE = 64;
const MAGIC_OFFSET = 0.01;
const GRAVITY_EARTH = 6;
const GRAVITY_WATER = 1;

function WorldToGrid(axis, tileSize){
	return Math.floor(axis/tileSize);
}

function GridToWorld(gridAx, tileSize){
	return gridAx*tileSize;
}

function maxVal(arr){
	let o = arr[0];
	for(let i = 0; i < arr.length; i++){
		if(arr[i] > o) o = arr[i];
	}
	return o;
}

function minVal(arr){
	let o = arr[0];
	for(let i = 0; i < arr.length; i++){
		if(arr[i] < o) o = arr[i];
	}
	return o;
}

function WorldToScreen1D(entCoord, camWCoord, offset) {
	let screenCoord = entCoord - camWCoord - offset;
	return screenCoord;
}

const directions = {
	setFrameY:
	{
		S: function(entity){
			return 1;
		},
		N: function(entity){
			return 2;
		},
		E: function(entity){
			return 3;
		},
		W: function(entity){
			mirrorateToAPoint(Game.ctx, entity.centralPoint[0], entity.centralPoint[1]);
			entity.isMirrored = true;
			return 3;
		},
		NE: function(entity){
			mirrorateToAPoint(Game.ctx, entity.centralPoint[0], entity.centralPoint[1]);
			entity.isMirrored = true;
			return 6.5;
		},
		NW: function(entity){
			return 6.5;
		},
		SE: function(entity){
			return 4;
		},
		SW: function(entity){
			mirrorateToAPoint(Game.ctx, entity.centralPoint[0], entity.centralPoint[1]);
			entity.isMirrored = true;
			return 4;
		}
	},
	setBox: {
		S: function(entity){
			const boxX = GridToWorld(WorldToGrid(entity.boxCol.x, TILE_SIZE), TILE_SIZE)
			const boxY = GridToWorld(WorldToGrid(entity.boxCol.z + entity.boxCol.p, TILE_SIZE), TILE_SIZE);
			return [boxX, boxY, TILE_SIZE, TILE_SIZE];
		},
		N: function(entity){
			const boxX = GridToWorld(WorldToGrid(entity.boxCol.x, TILE_SIZE), TILE_SIZE);
			const boxY = GridToWorld(WorldToGrid(entity.boxCol.z - entity.boxCol.p, TILE_SIZE), TILE_SIZE);
			return [boxX, boxY, TILE_SIZE, TILE_SIZE];
		},
		E: function(entity){
			const boxX = GridToWorld(WorldToGrid(entity.boxCol.x + entity.boxCol.w, TILE_SIZE), TILE_SIZE);
			const boxY = GridToWorld(WorldToGrid(entity.boxCol.z, TILE_SIZE), TILE_SIZE);
			return [boxX, boxY, TILE_SIZE, TILE_SIZE];
		},
		W: function(entity){
			const boxX = GridToWorld(WorldToGrid(entity.boxCol.x - entity.boxCol.w, TILE_SIZE), TILE_SIZE);
			const boxY = GridToWorld(WorldToGrid(entity.boxCol.z, TILE_SIZE), TILE_SIZE);
			return [boxX, boxY, TILE_SIZE, TILE_SIZE];
		},
		NE: function(entity){
			const boxX = GridToWorld(WorldToGrid(entity.boxCol.x + entity.boxCol.w, TILE_SIZE), TILE_SIZE);
			const boxY = GridToWorld(WorldToGrid(entity.boxCol.z - entity.boxCol.p, TILE_SIZE), TILE_SIZE);
			return [boxX, boxY, TILE_SIZE, TILE_SIZE];
		},
		NW: function(entity){
			const boxX = GridToWorld(WorldToGrid(entity.boxCol.x - entity.boxCol.w, TILE_SIZE), TILE_SIZE);
			const boxY = GridToWorld(WorldToGrid(entity.boxCol.z - entity.boxCol.p, TILE_SIZE), TILE_SIZE);
			return [boxX, boxY, TILE_SIZE, TILE_SIZE];
		},
		SE: function(entity){
			const boxX = GridToWorld(WorldToGrid(entity.boxCol.x + entity.boxCol.w, TILE_SIZE), TILE_SIZE);
			const boxY = GridToWorld(WorldToGrid(entity.boxCol.z + entity.boxCol.p, TILE_SIZE), TILE_SIZE);
			return [boxX, boxY, TILE_SIZE, TILE_SIZE];
		},
		SW: function(entity){
			const boxX = GridToWorld(WorldToGrid(entity.boxCol.x - entity.boxCol.w, TILE_SIZE), TILE_SIZE);
			const boxY = GridToWorld(WorldToGrid(entity.boxCol.z + entity.boxCol.p, TILE_SIZE), TILE_SIZE);
			return [boxX, boxY, TILE_SIZE, TILE_SIZE];
		}
	}
	
}

function limitateUp(variable, limit){
	if(variable > limit){
		return limit;
	}
	return variable;
}

function limitateDown(variable, limit){
	if(variable < limit){
		return limit;
	}
	return variable;
}

function mirrorate(context){
	context.translate(canvas.width, 0);
	context.scale(-1, 1);
}
function mirrorateToAPoint(context, x, y){
	context.translate(x, y);
	context.scale(-1, 1);
	context.translate(-x, -y);
}

function zoomIn(context){
	context.scale(2, 2)
}

function zoomOut(context){
	context.scale(0.5, 0.5)
}

function checkCentralPoint(x, y){
	if(x == Game.SCREEN_CENTER[0] && y == Game.SCREEN_CENTER[1]) return true;
	return false;
}

function random(min, max) {
	if (min > max) {
		[min, max] = [max, min];
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawShadow(context, entity, oppacity){
	context.fillStyle = "#000"
	context.globalAlpha = oppacity;
	context.beginPath();
	context.ellipse(
		entity.centralPoint[0],
		entity.centralPoint[1] + entity.WorldPos.y - Game.currentMap.bounds[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x + entity.boxCol.w, TILE_SIZE)].y,
		entity.boxCol.w*0.5,
		entity.boxCol.p*0.5,
		0, 0, 2*Math.PI, true
	);
	context.fill();
	context.stroke();
	context.closePath();
	context.globalAlpha = 1;
}