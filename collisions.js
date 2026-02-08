/*file to keep Colisions out of things*/ 

function saveCoords(entityBoxCol){
	entityBoxCol.oldX = entityBoxCol.x;
	entityBoxCol.oldY = entityBoxCol.y;
	entityBoxCol.oldZ = entityBoxCol.z;
}


const Col = {
	AABB: function(rect1, rect2){
		return rect1[0] + rect1[2] >= rect2[0] &&
				rect1[0] <= rect2[0] + rect2[2] &&
				rect1[1] + rect1[3] >= rect2[1] &&
				rect1[1] <= rect2[1] + rect2[3];
	},
	AABB_JSON: function(rect1, rect2){
		return rect1.x + rect1.w >= rect2.x &&
				rect1.x <= rect2.x + rect2.w &&
				rect1.z + rect1.p >= rect2.z &&
				rect1.z <= rect2.z + rect2.p;
	},
	
	handleShadowCoords(entity, mapGrid = Game.currentMap){
		let topLeft = mapGrid.shadowGrid[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x, TILE_SIZE)];
		let topRight = mapGrid.shadowGrid[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x+entity.boxCol.w, TILE_SIZE)];
		let bottomLeft = mapGrid.shadowGrid[WorldToGrid(entity.boxCol.z+entity.boxCol.p-entity.velocity.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x+entity.velocity.x, TILE_SIZE)];
		let bottomRight = mapGrid.shadowGrid[WorldToGrid(entity.boxCol.z+entity.boxCol.p-entity.velocity.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x+entity.boxCol.w+entity.velocity.x, TILE_SIZE)];
		let maxValue = maxVal([topLeft, topRight, bottomLeft, bottomRight]);
		entity.layer = maxValue;
	},
	
	teleportTo: function(entity, placeName){
		//trigger transition
		preventStacking(Game.NPCarr);
		Scenery.hasDeclaired = false;
		Game.levelName = placeName;
		Game.requestTransition = true;
		entity.isSpawn = false;
	},
	
	handleExitsAndTeleporters(entity, mapGrid){
		let topLeft = mapGrid.beingGrid[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x, TILE_SIZE)];
		let topRight = mapGrid.beingGrid[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x+entity.boxCol.w, TILE_SIZE)];
		let bottomLeft = mapGrid.beingGrid[WorldToGrid(entity.boxCol.z+entity.boxCol.p-entity.velocity.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x+entity.velocity.x, TILE_SIZE)];
		let bottomRight = mapGrid.beingGrid[WorldToGrid(entity.boxCol.z+entity.boxCol.p-entity.velocity.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x+entity.boxCol.w+entity.velocity.x, TILE_SIZE)];
		let maxValue = maxVal([topLeft, topRight, bottomLeft, bottomRight])
		if(maxValue > 1){
			this.teleportTo(entity, Game.LocationsProps[maxValue]);
		}
	},
	
	loadEntities(whatIs, arr, mapGrid = Game.currentMap){
		let x_grid = Math.floor((Camera.x)/TILE_SIZE);
		let x_endGrid = Math.floor((Camera.x+Camera.w)/TILE_SIZE);
		let y_grid = Math.floor((Camera.y)/TILE_SIZE)-Math.floor((Camera.y)/TILE_SIZE);
		let y_endGrid = Math.floor((Camera.y+Camera.h)/TILE_SIZE)-Math.floor((Camera.y)/TILE_SIZE);
		
		if(x_grid < 0) x_grid = 0;
		if(y_grid < 0) y_grid = 0;
		if(x_endGrid > mapGrid.width) x_endGrid = mapGrid.width;
		if(y_endGrid > mapGrid.height) y_endGrid = mapGrid.height;
		
		for(let i = y_grid; i < y_endGrid; i++){
			for(let j = x_grid; j < x_endGrid; j++){
				if(mapGrid[whatIs][i][j] != 0 && !mapGrid[whatIs][i][j].isSpawn){
					arr.push(mapGrid[whatIs][i][j]);
					mapGrid[whatIs][i][j].isSpawn = arr[arr.length-1].spawn();
				}
			}
		}
	},
	
	createAtkBox: function(boxCol, atkBox, direction){
		directions.setCube[direction](boxCol, atkBox);
	},
	
	receiveItem(entity, itemArr){
		let arrayCol = directions.setBox[entity.dir](entity);
		let switcher;
		for(let i = 0; i < itemArr.length; i++){
			let arrayColItens = [itemArr[i].boxCol.x, itemArr[i].boxCol.z, itemArr[i].boxCol.w, itemArr[i].boxCol.p]
			if(this.AABB(arrayCol, arrayColItens) && itemArr[i].type !== "nothing"){
				itemArr[i].isCollected = true;
				switcher = itemArr[i];
				itemArr[i] = itemArr[itemArr.length-1]
				itemArr[itemArr.length-1] = switcher;
				itemArr.pop();
				return switcher;
			}
		}
		return 0;
	},
	
	//itens
	coin: function(entity, coin){
		entity.money+=coin.value;
		coin.visivel = false;
		//particles(ctx, coin);
		coin.isCollected = true;
	},
	
	food: function(entity, obj){
		obj.visible = false;
		obj.isCollected = true;
		entity.tail.push(obj);
	},
	
	deleteAtkBox: function(cu){
		cu.x = undefined;
		cu.y = undefined;
		cu.z = undefined;
	},
	
	//types of Collision material
	solid: function(entity, cube){
		this.top(entity, cube)
		this.left(entity, cube)
		this.right(entity, cube)
		this.bottom(entity, cube);
	},
	solidObject: function(entity, cube){
		this.solid(entity, cube);
	},
	
	slopeNorth: function(entity, cube){
		this.top(entity, cube)
		this.left(entity, cube)
		this.right(entity, cube)
		this.uppingBottom(entity, cube);
	},
	slopeEast(entity, cube){
		return this.slopeTop(entity, cube, "x");
	},
	slopeWest(entity, cube){
		return this.slopeTopWest(entity, cube, "x");
	},
	slopeNorth(entity, cube){
		return this.slopeTop(entity, cube, "z");
	},
	
	solid3D:function(entity, cube){
		if(this.top(entity, cube))return;
		if(this.left(entity, cube))return;
		if(this.right(entity, cube))return;
		if(this.up(entity, cube))return;
		if(this.down(entity, cube))return;
		this.bottom(entity, cube);
	},
	
	bedness3D: function(entity, cube){
		if(this.top(entity, cube))return;
		if(this.left(entity, cube))return;
		if(this.right(entity, cube))return;
		if(this.elasticUp(entity, cube))return;
		if(this.down(entity, cube))return;
		this.bottom(entity, cube);
	},
	
	elasticUp: function(entity, cube){
		if(entity.boxCol.y < cube.y && entity.boxCol.oldY >= cube.y){
			entity.velocity.y *= -1;
			return true;
		}
	},
	
	use: function(entity, item){
		itemCategories[item.type](entity, item);
	},
	
	uppingBottom: function(entity, cube){
		if(entity.boxCol.z < cube.z+cube.p && entity.boxCol.oldZ >= cube.z+ cube.p){
			entity.velocity.z = 0;
			entity.boxCol.z = cube.z + cube.p + MAGIC_OFFSET;
			entity.velocity.y = 10;
			return true;
		}
		return false;
	},
	
	water: function(entity, cube){
		if(entity.boxCol.y < cube.y && entity.boxCol.oldY >= cube.y){
			entity.velocity.y = 0;
			entity.gravity = gravity_NA_AGUA;
			return true;
		}
	},
	
	teleport: function(entity, cube){
		if(isOnGround(entity.WorldPos.y, cube.y) && cube.conditionals()){
			//cube.conditionals() are a function that means the stuff the player need to do or must have in order to activate them. (like... what a literal trigger works)...
			Scenery.hasDeclaired = false;
			mapGrid = cube.to;
		}
	},
	
	left: function(entity, cube){
		if(entity.boxCol.x + entity.boxCol.w > cube.x && entity.boxCol.oldX + entity.boxCol.w <= cube.x){
			entity.velocity.x = 0;
			entity.boxCol.x = cube.x - entity.boxCol.w - MAGIC_OFFSET;
			return true;
		}
		return false;
	},
	right: function(entity, cube){
		if(entity.boxCol.x < cube.x+cube.w && entity.boxCol.oldX >= cube.x+cube.w){
			entity.velocity.x = 0;
			entity.boxCol.x = cube.x + cube.w + MAGIC_OFFSET;
			return true;
		}
		return false;
	},
	top: function(entity, cube){
		if(entity.boxCol.z + entity.boxCol.p > cube.z && entity.boxCol.oldZ + entity.boxCol.p <= cube.z){
			entity.onGround = true;
			entity.velocity.z = 0;
			entity.boxCol.z = cube.z - entity.boxCol.p - MAGIC_OFFSET;
			return true;
		}
		return false;
	},
	
	bottom: function(entity, cube){
		if(entity.boxCol.z < cube.z+cube.p && entity.boxCol.oldZ >= cube.z+ cube.p){
			entity.velocity.z = 0;
			entity.boxCol.z = cube.z + cube.p + MAGIC_OFFSET;
			return true;
		}
		return false;
	},
	
	up: function(entity, cube){
		//raramente isso vai acontecer no mapa. quer dizer.. não deve acontecer in anyway...
		if(entity.boxCol.y < cube.y && entity.boxCol.oldY >= cube.y){
			entity.velocity.y = 0;
			entity.boxCol.y = cube.y + cube.h + MAGIC_OFFSET;
			entity.onGround = true;
			return true;
		}
	},
	
	down: function(entity, cube){
		if(entity.boxCol.y > cube.y && entity.boxCol.oldY <= cube.y){
			entity.velocity.y = 0;
			entity.boxCol.y = cube.y - entity.boxCol.h - MAGIC_OFFSET;
			
			return true;
		}
	},
	ladder: function(){
		
	},
	//isdo aqui é relativo ao Colisionador de slope
	slopeTop: function(object, cube, axis){
		let dimen = (axis == "x")? "w" : "p"
		let originX = cube[axis];
		
		let current_x = object.WorldPos[axis] - cube[axis];
		let top = current_x;

		if (current_x > cube[dimen] && current_x > 0) {

			
			object.velocity.y = 0;
			object.WorldPos.y = cube.y + MAGIC_OFFSET;
			return cube.y;

		} else if (object.boxCol.y + object.boxCol.h > top && current_x > 0) {
			object.onGround = true;
			object.velocity.y = 0;
			object.WorldPos.y = top + (cube.y - cube.h) +MAGIC_OFFSET;
			return top + (cube.y - cube.h);
		}
	},
	slopeTopWest: function(object, cube, axis){
		let dimen = (axis == "x")? "w" : "p"
		let originX = cube[axis];
		
		let current_x = object.WorldPos[axis] - cube[axis];
		let top = current_x*-1+cube.h;

		if (current_x > cube[dimen] && current_x > 0) {
			object.velocity.y = 0;
			object.WorldPos.y = (cube.y - cube.h);
			return cube.y - cube.h;

		} else if (object.boxCol.y + object.boxCol.h > top && current_x > 0) {
			object.onGround = true;
			object.velocity.y = 0;
			object.WorldPos.y = top + (cube.y - cube.h);
			return top + (cube.y - cube.h);
		}
	},
	
	testCol(entity, colArr){
		let yesArr = [];
		let playerBoxCol = [entity.boxCol.x, entity.boxCol.z, entity.boxCol.w, entity.boxCol.p];
		for(let i = 0; i< colArr.length; i++){
			cBoxCol = [colArr.x, colArr.z, colArr.w, colArr.p];
			if(this.AABB(playerBoxCol, cBoxCol)){
				yesArr.push(true);
			}
			else{
				yesArr.push(false);
			}
		}
		return yesArr;
	},
	
	
	handleYcoords(entity, mapGrid, items, npcs){
		
		// no idea what's the responsibility here
		if(entity.velocity.y < 0){
			entity.gravity = GRAVITY_EARTH_FALLING;
		} else {
			entity.gravity = GRAVITY_EARTH;
		}
		
		//entity.pontoCentral[1] -= entity.velocity.y;
		let top = mapGrid.bounds[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x, TILE_SIZE)].y
		let bottom = mapGrid.bounds[WorldToGrid(entity.boxCol.z + entity.boxCol.p, TILE_SIZE)][WorldToGrid(entity.boxCol.x + entity.boxCol.w, TILE_SIZE)].y;
		let left = mapGrid.bounds[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x + entity.boxCol.w, TILE_SIZE)].y;
		let right = mapGrid.bounds[WorldToGrid(entity.boxCol.z+entity.boxCol.p, TILE_SIZE)][WorldToGrid(entity.boxCol.x, TILE_SIZE)].y;;
		let currLim = mapGrid.bounds[WorldToGrid(entity.WorldPos.z, TILE_SIZE)][WorldToGrid(entity.WorldPos.x, TILE_SIZE)].y;
		
		const solidObjectArray = [];
		const slopeObjectArray = [];
		for(let i = 0; i < items.length; i++){
			if(items[i].ColType == "solidObject"){
				solidObjectArray.push(items[i].boxCol);
			}
		}
		const direction = [];
		for(let i = 0; i< items.length; i++){
			if(items[i].ColType == "slopeEast"){
				slopeObjectArray.push(items[i].boxCol);
				direction.push("East");
			} else if (items[i].ColType == "slopeWest"){
				slopeObjectArray.push(items[i].boxCol);
				direction.push("West");
			}
		}
		let filterCollidings = this.testCol(entity, solidObjectArray);
		if((!isOnGround(entity.WorldPos.y, top) && !isOnGround(entity.WorldPos.y, left) && !isOnGround(entity.WorldPos.y, right) && !isOnGround(entity.WorldPos.y, bottom))){
			entity.velocity.y -= entity.gravity /*/1000*/ *deltaTime;
			entity.onGround = false;
		}
		else{
			entity.velocity.y = 0;
			entity.onGround = true;
			entity.jumping = false
		}
		for(let i = 0; i < solidObjectArray.length; i++){
			if(this.AABB_JSON(entity.boxCol, solidObjectArray[i])){
				
				if(isOnGround(entity.WorldPos.y, solidObjectArray[i].y)){
					
					entity.velocity.y = 0;
					entity.onGround = true;
					entity.jumping = false;
					currLim = solidObjectArray[i].y;
				}
			}
		}
		for(let i = 0; i < slopeObjectArray.length; i++){
			if(this.AABB_JSON(entity.boxCol, slopeObjectArray[i])){
				if(isOnGround(entity.WorldPos.y, slopeObjectArray[i].y)){
					currLim = this["slope" + direction[i]](entity, slopeObjectArray[i]);
				}
			}
		}
		
		if(isOnGround(entity.WorldPos.y, currLim) && entity.WorldPos.y < currLim){
			entity.WorldPos.y = currLim;
		}
	},
	
	main(entity, mapGrid, itemArr, npcArr, num = -1){
		
		if(entity.WorldPos.x<entity.boxCol.w*0.5){
			entity.WorldPos.x = 30;
			entity.boxCol.x = 0;
			entity.velocity.x = 0;
		}
		if(entity.WorldPos.z<entity.boxCol.p*0.5){
			entity.WorldPos.z = 30;
			entity.boxCol.z = 0;
			entity.velocity.z = 0;
		}
		
		if(entity.WorldPos.x>=((mapGrid.width)*TILE_SIZE)-entity.boxCol.w/2){
			entity.WorldPos.x = ((mapGrid.width)*TILE_SIZE)-entity.boxCol.w*0.5;
			entity.boxCol.x = mapGrid.width*TILE_SIZE-entity.boxCol.w-MAGIC_OFFSET;
			entity.velocity.x = 0;
		}
		
		if(entity.WorldPos.z>=((mapGrid.height)*TILE_SIZE)-entity.boxCol.p*0.5){
			entity.WorldPos.z = ((mapGrid.height)*TILE_SIZE)-entity.boxCol.p*0.5;
			entity.boxCol.z = mapGrid.height*TILE_SIZE-entity.boxCol.p-MAGIC_OFFSET;
			entity.velocity.z = 0;
		}
		
		
		entity.isSwimming = false;
		entity.gravity = GRAVITY_EARTH;
		
		let curLimStartZ = WorldToGrid(entity.WorldPos.z - entity.boxCol.p*0.5, TILE_SIZE);
		let curLimEndZ = WorldToGrid(entity.WorldPos.z + entity.boxCol.p*0.5, TILE_SIZE);
		let curLimStartX = WorldToGrid(entity.WorldPos.x - entity.boxCol.w/2, TILE_SIZE);
		let curLimEndX = WorldToGrid(entity.WorldPos.x + entity.boxCol.w/2, TILE_SIZE);
		let curLimStartY = WorldToGrid(entity.WorldPos.y, TILE_SIZE);
		let curLimEndY = WorldToGrid(entity.WorldPos.y - entity.boxCol.h, TILE_SIZE);
		
		let playerCubeCol = [entity.boxCol.x, entity.boxCol.z, entity.boxCol.w, entity.boxCol.p, entity.boxCol.y, entity.boxCol.h]
		
		//começou as Colisões em relação ao tileset
		let x_intro = Math.floor(Camera.x/TILE_SIZE);
		let x_end = Math.floor((Camera.x+Camera.w)/TILE_SIZE);
		let y_intro = Math.floor(Camera.y/TILE_SIZE);
		let y_end = Math.floor((Camera.y+Camera.h)/TILE_SIZE);
		
		if(x_intro < 0) x_intro = 0;
		if(y_intro < 0) y_intro = 0;
		if(x_end > mapGrid.width) x_end = mapGrid.width;
		if(y_end > mapGrid.height) y_end = mapGrid.height;
		
		let playerBoxCol = [entity.boxCol.x, entity.boxCol.z, entity.boxCol.w, entity.boxCol.p, entity.boxCol.y, entity.boxCol.h]
		//comparar Colisoes com os itens presentes
		if(num == -1){
			let itensBox;
			for(let i = 0; i < itemArr.length; i++){
				itensBox = [itemArr[i].boxCol.x, itemArr[i].boxCol.z, itemArr[i].boxCol.w, itemArr[i].boxCol.p];
				if(Col.AABB(playerBoxCol, itensBox) && isOnGround(entity.WorldPos.y, itemArr[i].boxCol.y)){
					Col[itemArr[i].ColType](entity, itemArr[i].boxCol);
				}
			}
		}
		
		let mapBoxCol;
		let waterBoxCol;
		
		for(let j = x_intro; j < x_end; j++){
			for(let i = y_intro; i < y_end; i++){
				if(entity.WorldPos.y < mapGrid.bounds[i][j].y){
					mapBoxCol = [mapGrid.bounds[i][j].x, mapGrid.bounds[i][j].z, TILE_SIZE, TILE_SIZE];
					if(Col.AABB(playerBoxCol, mapBoxCol)){
						Col[mapGrid.bounds[i][j].tipo](entity, mapGrid.bounds[i][j]);
					}
				}
				if(mapGrid.hasWater && entity.WorldPos.y < mapGrid.waterBounds[i][j].y){
					waterBoxCol = [mapGrid.waterBounds[i][j].x, mapGrid.waterBounds[i][j].z, TILE_SIZE, TILE_SIZE];
					if(Col.AABB(playerBoxCol, waterBoxCol)){
						entity.isSwimming = true;
						Col[mapGrid.waterBounds[i][j].tipo](entity, mapGrid.waterBounds[i][j]);
					}
				}
			}//fim for
		}//fim for
		
		entity.WorldPos.x = entity.boxCol.x + entity.boxCol.w*0.5;
		entity.WorldPos.z = entity.boxCol.z + entity.boxCol.p*0.5;
		entity.boxCol.y = entity.WorldPos.y + entity.boxCol.h;
		this.handleShadowCoords(entity, mapGrid, num)
		this.handleYcoords(entity, mapGrid, itemArr, npcArr);
		this.handleExitsAndTeleporters(entity, mapGrid);
	}
}

function isOnGround(entitY, struturY){
	return entitY <= struturY;
}

//only for special occasions
function isBellowGround(entitY, structurY){
	return entitY >= structurY;
}

