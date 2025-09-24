/*file to keep Colisions out of things*/ 

function saveCoords(entityBoxCol){
	entityBoxCol.oldX = entityBoxCol.x;
	entityBoxCol.oldY = entityBoxCol.y;
	entityBoxCol.oldZ = entityBoxCol.z;
}


const Col = {
	AABB: function(retangulo1, retangulo2){
		return retangulo1[0] + retangulo1[2] >= retangulo2[0] &&
				retangulo1[0] <= retangulo2[0] + retangulo2[2] &&
				retangulo1[1] + retangulo1[3] >= retangulo2[1] &&
				retangulo1[1] <= retangulo2[1] + retangulo2[3];
	},
	AABB_JSON: function(retangulo1, retangulo2){
		return retangulo1.x + retangulo1.w >= retangulo2.x &&
				retangulo1.x <= retangulo2.x + retangulo2.w &&
				retangulo1.z + retangulo1.p >= retangulo2.z &&
				retangulo1.z <= retangulo2.z + retangulo2.p;
	},
	
	handleShadowCoords(entity, mapGrid = Game.currentMap, num = -1){
		let topLeft = mapGrid.shadowGrid[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x, TILE_SIZE)];
		let topRight = mapGrid.shadowGrid[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x+entity.boxCol.w, TILE_SIZE)];
		let bottomLeft = mapGrid.shadowGrid[WorldToGrid(entity.boxCol.z+entity.boxCol.p-entity.velocity.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x+entity.velocity.x, TILE_SIZE)];
		let bottomRight = mapGrid.shadowGrid[WorldToGrid(entity.boxCol.z+entity.boxCol.p-entity.velocity.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x+entity.boxCol.w+entity.velocity.x, TILE_SIZE)];
		let maxValue = maxVal([topLeft, topRight, bottomLeft, bottomRight]);
		entity.layer = maxValue;
		//DONE: not necessary to do it here. drawing order is now merge sort based. it's not as dynamic, but it covers plenty of the issues here
		let arr = Game.NPCarr;
		for(let i = 0; i < arr.length; i++){
			if(i == num) continue;
			this.handleShadowObjects(entity, arr[i].shadow, arr[i].layer, arr[i].sublayer);
		}
		for(let i = 0; i < Game.ItemArr.length; i++){
			this.handleShadowObjects(entity, Game.ItemArr[i].shadow, Game.ItemArr[i].layer, Game.ItemArr[i].sublayer);
		}
	},
	
	handleShadowObjects(entity, shadow, shadowLayer, shadowSubLayer){
		let entityBox = [entity.boxCol.x, entity.boxCol.z, entity.boxCol.w, entity.boxCol.p];
		let shadowBox = [shadow.x, shadow.z, shadow.w, shadow.p];
		if(this.AABB(entityBox, shadowBox)){
			entity.subLayer = shadowSubLayer-1;
			entity.layer = shadowLayer;
		}
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
			if(this.AABB(arrayCol, arrayColItens)){
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
		this.solid(entity, cube.boxCol);
	},
	
	slopeNorth: function(entity, cube){
		this.top(entity, cube)
		this.left(entity, cube)
		this.right(entity, cube)
		this.uppingBottom(entity, cube);
	},
	slopeEast(entity, cube){
		this.top(entity, cube);
		this.bottom(entity, cube);
		this.slopeTop(entity, cube, 1, 0.01, "x");
		this.right(entity, cube);
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
	//isdo aqui é relativo ao Colisionador de slopes
	slopeTop: function(entity, cube, slope, y_offset, axis){
		let dimen = (axis == "x")? "w" : "p"
		let originX = cube[axis];
		let originY = cube.y + y_offset;
		let currentX = (slope < 0) ? entity.boxCol[axis] + entity.boxCol[dimen] - originX : entity.boxCol[axis] - originX;
		let currentY = entity.boxCol.y + entity.boxCol.height - originY;
		let oldX = (slope < 0) ? entity["old"+axis.toUpperCase()] + entity[dimen] - originX : entity.boxCol["old"+axis.toUpperCase()] - originX;
		let oldY = entity.boxCol.oldY + entity.boxCol.h - originY;
		//["old"+axis.toUpperCase()]
		let currentCrossProduct = currentX * slope - currentY;
		let oldCrossProduct = oldX * slope - oldY;
		let top = (slope < 0) ? cube.y + cube.h + y_offset * slope : cube.y + y_offset;
		if ((currentX < 0 || currentX > cube.w) && (entity.boxCol.y + entity.boxCol.h > top && entity.boxCol.oldY + entity.boxCol.h <= top || current_cross_product < 1 && old_cross_product > -1)){
			entity.onGround = true;
			entity.velocity.y = 0;
			object.y = top - object.height - MAGIC_OFFSET;
			return true;
		} else if(currentCrossProduct < 1 && currentCrossProduct > -1){
			object.jumping = false;
			object.y_velocity = 0;
			object.y = row * TILE_SIZE + slope * current_x + y_offset - object.height - this.offset;
			return true;
		} return false;
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
	
	
	handleYcoords(entity, mapGrid){
		//entity.pontoCentral[1] -= entity.velocity.y;
		let top = mapGrid.bounds[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x, TILE_SIZE)].y
		let bottom = mapGrid.bounds[WorldToGrid(entity.boxCol.z + entity.boxCol.p, TILE_SIZE)][WorldToGrid(entity.boxCol.x + entity.boxCol.w, TILE_SIZE)].y;
		let left = mapGrid.bounds[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x + entity.boxCol.w, TILE_SIZE)].y;
		let right = mapGrid.bounds[WorldToGrid(entity.boxCol.z+entity.boxCol.p, TILE_SIZE)][WorldToGrid(entity.boxCol.x, TILE_SIZE)].y;;
		let currLim = mapGrid.bounds[WorldToGrid(entity.WorldPos.z, TILE_SIZE)][WorldToGrid(entity.WorldPos.x, TILE_SIZE)].y;
		//não é a melhor forma de fazer isso pois é 4*O(N) todos os frames.
		const solidObjectArray = []
		for(let i = 0; i < Game.ItemArr.length; i++){
			if(Game.ItemArr[i].ColType == "solidObject"){
				solidObjectArray.push(Game.ItemArr[i].boxCol);
			}
		}
		let filterCollidings = this.testCol(entity, solidObjectArray);
		if((!isOnGround(entity.WorldPos.y, top) && !isOnGround(entity.WorldPos.y, left) && !isOnGround(entity.WorldPos.y, right) && !isOnGround(entity.WorldPos.y, bottom))){
			entity.velocity.y -= entity.gravity *deltaTime;
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
		if(isOnGround(entity.WorldPos.y, currLim) && entity.WorldPos.y < currLim){
			entity.WorldPos.y = currLim;
			entity.centralPoint[1] = Game.SCREEN_CENTER[1];
		}
	},
	
	wallCleaner(entity, mapGrid){
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
		
		let curLimStartZ = WorldToGrid(entity.WorldPos.z - entity.boxCol.p*0.5, TILE_SIZE);
		let curLimEndZ = WorldToGrid(entity.WorldPos.z + entity.boxCol.p*0.5, TILE_SIZE);
		let curLimStartX = WorldToGrid(entity.WorldPos.x - entity.boxCol.w/2, TILE_SIZE);
		let curLimEndX = WorldToGrid(entity.WorldPos.x + entity.boxCol.w/2, TILE_SIZE);
		let curLimStartY = WorldToGrid(entity.WorldPos.y, TILE_SIZE);
		let curLimEndY = WorldToGrid(entity.WorldPos.y - entity.boxCol.h, TILE_SIZE);
		
		let playerBoxCol = [entity.boxCol.x, entity.boxCol.z, entity.boxCol.w, entity.boxCol.p, entity.boxCol.y, entity.boxCol.h];
		
		let x_intro = Math.floor(Camera.x/TILE_SIZE);
		let x_end = Math.floor((Camera.x+Camera.w)/TILE_SIZE);
		let y_intro = Math.floor(Camera.y/TILE_SIZE);
		let y_end = Math.floor((Camera.y+Camera.h)/TILE_SIZE);
		
		if(x_intro < 0) x_intro = 0;
		if(y_intro < 0) y_intro = 0;
		if(x_end > mapGrid.width) x_end = mapGrid.width;
		if(y_end > mapGrid.height) y_end = mapGrid.height;
		
		
		for(let j = x_intro; j < x_end; j++){
			for(let i = y_intro; i < y_end; i++){
				if(entity.WorldPos.y < mapGrid.bounds[i][j].y){
					mapBoxCol = [mapGrid.bounds[i][j].x, mapGrid.bounds[i][j].z, TILE_SIZE, TILE_SIZE];
					if(Col.AABB(playerBoxCol, mapBoxCol)){
						Col[mapGrid.bounds[i][j].tipo](entity, mapGrid.bounds[i][j]);
					}
				}
			}//fim for
		}//fim for
		
		entity.WorldPos.x = entity.boxCol.x + entity.boxCol.w/2;
		entity.WorldPos.z = entity.boxCol.z + entity.boxCol.p/2;
		entity.boxCol.y = entity.WorldPos.y + entity.boxCol.h;
	},
	
	main(entity, mapGrid, num = -1){
		
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
			for(let i = 0; i < Game.ItemArr.length; i++){
				itensBox = [Game.ItemArr[i].boxCol.x, Game.ItemArr[i].boxCol.z, Game.ItemArr[i].boxCol.w, Game.ItemArr[i].boxCol.p];
				if(Col.AABB(playerBoxCol, itensBox) && isOnGround(entity.WorldPos.y, Game.ItemArr[i].boxCol.y)){
					Col[Game.ItemArr[i].ColType](entity, Game.ItemArr[i]);
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
		
		entity.WorldPos.x = entity.boxCol.x + entity.boxCol.w/2;
		entity.WorldPos.z = entity.boxCol.z + entity.boxCol.p/2;
		entity.boxCol.y = entity.WorldPos.y + entity.boxCol.h;
		this.handleYcoords(entity, mapGrid);
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

