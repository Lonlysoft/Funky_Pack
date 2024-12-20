const TILE_SIZE = 32;
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

function mirrorar(context){
	context.translate(canvas.width, 0);
	context.scale(-1, 1);
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
	context.ellipse(entity.centralPoint[0], entity.centralPoint[1] + entity.WorldPos.y - mapaAtual.limites[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x + entity.boxCol.w, TILE_SIZE)].y, entity.boxCol.w*0.5, entity.boxCol.p*0.5, 0, 0, 2*Math.PI, true);
	context.fill();
	context.stroke();
	context.closePath();
	context.globalAlpha = 1;
}