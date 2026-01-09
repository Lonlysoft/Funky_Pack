const TILE_SIZE = 64;
const MAGIC_OFFSET = 0.01;
const MAGIC_NORMALIZER = 0.8
const GRAVITY_EARTH = 6, GRAVITY_EARTH_FALLING = 8;
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

function createMatrixWithSomething(width, height, arg){
	let matrix = new Array(height);
	for(let i = 0; i < height; i++){
		matrix[i] = new Array(width);
	}
	return matrix;
}

function preventStacking(arr){
	arr = [];
}

function mergeSort(arr) {
    // Base case: if the array has 0 or 1 element, it's already sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Divide the array into two halves
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    // Recursively sort the two halves
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    // Merge the sorted halves
    return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compare elements from left and right arrays and add the smaller one to the result
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].WorldPos.z < right[rightIndex].WorldPos.z) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Add any remaining elements from the left array
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }

    // Add any remaining elements from the right array
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }

    return result;
}

function WorldToScreen1D(entCoord, camWCoord, offset) {
	let screenCoord = entCoord - camWCoord - offset;
	return screenCoord;
}

const directions = {
	setFrameY:
	{
		S: function(entity){
			return 0;
		},
		N: function(entity){
			return 2;
		},
		E: function(entity){
			return 1;
		},
		W: function(entity){
			mirrorateToAPoint(Game.ctx, entity.centralPoint[0], entity.centralPoint[1]);
			entity.isMirrored = true;
			return 1;
		},
		NE: function(entity){
			mirrorateToAPoint(Game.ctx, entity.centralPoint[0], entity.centralPoint[1]);
			entity.isMirrored = true;
			return 3;
		},
		NW: function(entity){
			return 3;
		},
		SE: function(entity){
			return 1;
		},
		SW: function(entity){
			mirrorateToAPoint(Game.ctx, entity.centralPoint[0], entity.centralPoint[1]);
			entity.isMirrored = true;
			return 1;
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
	},
	setCube: {
		S(boxCol, atkBox){
			atkBox.x = boxCol.x;
			atkBox.z = boxCol.z + boxCol.p;
			atkBox.y = boxCol.y + boxCol.h/3;
		},
		E(boxCol, atkBox){
			atkBox.x = boxCol.x + boxCol.w;
			atkBox.z = boxCol.z;
			atkBox.y = boxCol.y + boxCol.h/3;
		},
		N(boxCol, atkBox){
			atkBox.x = boxCol.x;
			atkBox.z = boxCol.z - boxCol.p;
			atkBox.y = boxCol.y + boxCol.h/3;
		},
		W(boxCol, atkBox){
			atkBox.x = boxCol.x - boxCol.w;
			atkBox.z = boxCol.z;
			atkBox.y = boxCol.y + boxCol.h/3;
		},
		SE(boxCol, atkBox){
			atkBox.x = boxCol.x + boxCol.w;
			atkBox.z = boxCol.z + boxCol.p;
			atkBox.y = boxCol.y + boxCol.h/3;
		},
		NE(boxCol, atkBox){
			atkBox.x = boxCol.x + boxCol.w;
			atkBox.z = boxCol.z - boxCol.p;
			atkBox.y = boxCol.y + boxCol.h/3;
		},
		NW(boxCol, atkBox){
			atkBox.x = boxCol.x - boxCol.w;
			atkBox.z = boxCol.z - boxCol.p;
			atkBox.y = boxCol.y + boxCol.h/3;
		},
		SW(boxCol, atkBox){
			atkBox.x = boxCol.x - boxCol.w;
			atkBox.z = boxCol.z + boxCol.p;
			atkBox.y = boxCol.y + boxCol.h/3;
		}
	},
	frontDash: {
		S: function(entity, speed){
			entity.velocity.y += 10
			entity.velocity.z += speed;
		},
		E: function(entity, speed){
			entity.velocity.y += 10
			entity.velocity.x += speed;
		},
		N: function(entity, speed){
			entity.velocity.y += 10
			entity.velocity.z -= speed;
		},
		W: function(entity, speed){
			entity.velocity.y += 10
			entity.velocity.x -= speed;
		},
		SE: function(entity, speed){
			entity.velocity.y += 10
			entity.velocity.x += speed;
			entity.velocity.z += speed;
		},
		NE: function(entity, speed){
			entity.velocity.y += 10
			entity.velocity.z -= speed;
			entity.velocity.x += speed;
		},
		SW: function(entity, speed){
			entity.velocity.y += 10
			entity.velocity.z += speed;
			entity.velocity.x -= speed;
		},
		NW: function(entity, speed){
			entity.velocity.y += 10
			entity.velocity.z -= speed;
			entity.velocity.x -= speed;
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


function random(min, max) {
	if (min > max) {
		[min, max] = [max, min];
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawShadow(context, entity, map, oppacity){
	context.fillStyle = "#000";
	let shadowCoords = {x: entity.WorldPos.x, z: entity.WorldPos.z, y: entity.WorldPos.y};
	let shadowScreenCoords = {
		x: WorldToScreen1D(shadowCoords.x, Camera.x
, Camera.w/2 - Game.SCREEN_CENTER[0]),
		y: WorldToScreen1D(shadowCoords.z - map.bounds[WorldToGrid(entity.WorldPos.z, TILE_SIZE)][WorldToGrid(entity.WorldPos.x, TILE_SIZE)].y, Camera.y
, Camera.h/2 - Game.SCREEN_CENTER[0])
	}
	context.globalAlpha = oppacity;
	context.beginPath();
	context.ellipse(
		shadowScreenCoords.x,
		shadowScreenCoords.y,
		entity.boxCol.w*0.8,
		entity.boxCol.p*0.8,
		0, 0, 2*Math.PI, true
	);
	context.fill();
	context.stroke();
	context.closePath();
	context.globalAlpha = 1;
}

class Money{
	constructor(initialAmount = 0){
		this.cents = 0
		this.unit = 0
	}
	add(number){
		this.cents += number%100;
		this.unit += Math.trunc(number/100);
	}
	remove(number){
		this.cents -= number%100;
		this.unit -= Math.trunc(number/100);
	}
}