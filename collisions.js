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
		let topLeft = mapGrid.shadowGrid[WorldToGrid(entity.boxCol.z, TILE_SIZE)%mapGrid.bounds.length][WorldToGrid(entity.boxCol.x, TILE_SIZE)%mapGrid.bounds[0].length];
		let topRight = mapGrid.shadowGrid[WorldToGrid(entity.boxCol.z, TILE_SIZE)%mapGrid.bounds.length][WorldToGrid(entity.boxCol.x+entity.boxCol.w, TILE_SIZE)%mapGrid.bounds[0].length];
		let bottomLeft = mapGrid.shadowGrid[WorldToGrid(entity.boxCol.z+entity.boxCol.p-entity.velocity.z, TILE_SIZE)%mapGrid.bounds.length][WorldToGrid(entity.boxCol.x+entity.velocity.x, TILE_SIZE)%mapGrid.bounds[0].length];
		let bottomRight = mapGrid.shadowGrid[WorldToGrid(entity.boxCol.z+entity.boxCol.p-entity.velocity.z, TILE_SIZE)%mapGrid.bounds.length][WorldToGrid(entity.boxCol.x+entity.boxCol.w+entity.velocity.x, TILE_SIZE)%mapGrid.bounds[0].length];
		let maxValue = maxVal([topLeft, topRight, bottomLeft, bottomRight])
		
		entity.layer = maxValue;
	},
	
	teleportTo: function(entity, placeName){
		//trigger transition
		Game.NPCarr = [];
		Scenery.hasDeclaired = false;
		Game.levelName = placeName;
		Game.requestTransition = true;
		entity.isSpawn = false;
	},
	handleExitsAndTeleporters(entity, mapGrid){
		let topLeft = mapGrid.itemGrid[WorldToGrid(entity.boxCol.z, TILE_SIZE)%mapGrid.bounds.length][WorldToGrid(entity.boxCol.x, TILE_SIZE)%mapGrid.bounds[0].length];
		let topRight = mapGrid.itemGrid[WorldToGrid(entity.boxCol.z, TILE_SIZE)%mapGrid.bounds.length][WorldToGrid(entity.boxCol.x+entity.boxCol.w, TILE_SIZE)%mapGrid.bounds[0].length];
		let bottomLeft = mapGrid.itemGrid[WorldToGrid(entity.boxCol.z+entity.boxCol.p-entity.velocity.z, TILE_SIZE)%mapGrid.bounds.length][WorldToGrid(entity.boxCol.x+entity.velocity.x, TILE_SIZE)%mapGrid.bounds[0].length];
		let bottomRight = mapGrid.itemGrid[WorldToGrid(entity.boxCol.z+entity.boxCol.p-entity.velocity.z, TILE_SIZE)%mapGrid.bounds.length][WorldToGrid(entity.boxCol.x+entity.boxCol.w+entity.velocity.x, TILE_SIZE)%mapGrid.bounds[0].length];
		let maxValue = maxVal([topLeft, topRight, bottomLeft, bottomRight])
		if(maxValue > 1){
			this.teleportTo(entity, Game.LocationsProps[maxValue]);
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
		if(isOnGround(entity.WorldPos.y, cube.y) && cube.conditionals && cube.conditionals()){
			//cube.conditionals() are a function that means the stuff the player need to do or must have in order to activate them. (like... what a literal trigger works)...
			Scenery.hasDeclaired = false;
			mapGrid = cube.to;
		}
	},
	left: function(entity, cube){
		if(entity.boxCol.x + entity.boxCol.w > cube.x && entity.boxCol.oldX + entity.boxCol.w <= cube.x){
			entity.boxCol.x -= entity.velocity.x;
			entity.velocity.x = 0;
			return true;
		}
		return false;
	},
	right: function(entity, cube){
		if(entity.boxCol.x < cube.x+cube.w && entity.boxCol.oldX >= cube.x+cube.w){
			entity.boxCol.x -= entity.velocity.x;
			entity.velocity.x = 0;
			
			return true;
		}
		return false;
	},
	top: function(entity, cube){
		if(entity.boxCol.z + entity.boxCol.p > cube.z && entity.boxCol.oldZ + entity.boxCol.p <= cube.z){
			entity.onGround = true;
			entity.boxCol.z -= entity.velocity.z;
			entity.velocity.z = 0;
			return true;
		}
		return false;
	},
	bottom: function(entity, cube){
		if(entity.boxCol.z < cube.z+cube.p && entity.boxCol.oldZ >= cube.z + cube.p){
			entity.boxCol.z -= entity.velocity.z;
			entity.velocity.z = 0;
			return true;
		}
		return false;
	},
	ladder: function(){
		
	},
	//isdo aqui é relativo ao Colisionador de slope
	slopeTop: function(object, cube, axis){
		let dimen = (axis == "x")? "w" : "p"
		
		let current_x = object.WorldPos[axis] - cube[axis];
		let top = current_x;

		if (current_x > cube[dimen] && current_x > 0){
			object.WorldPos.y -= object.velocity.y;
			object.velocity.y = 0;
			return cube.y;

		} else if (object.boxCol.y + object.boxCol.h > top && current_x > 0){
			object.onGround = true;
			object.velocity.y = 0;
			object.WorldPos.y = top + (cube.y - cube.h);
			return top + (cube.y - cube.h);
		}
	},
	slopeTopWest: function(object, cube, axis){
		let dimen = (axis == "x")? "w" : "p";
		
		let current_x = object.WorldPos[axis] - cube[axis];
		let top = current_x*-1+cube.h;

		if (current_x > cube[dimen] && current_x > 0){
			object.WorldPos.y -= object.velocity.y;
			object.velocity.y = 0;
			return cube.y - cube.h;

		} else if (object.boxCol.y + object.boxCol.h > top && current_x > 0){
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
		let top = mapGrid.bounds[WorldToGrid(entity.boxCol.z, TILE_SIZE)%mapGrid.bounds.length][WorldToGrid(entity.boxCol.x, TILE_SIZE)%mapGrid.bounds[0].length].y
		
		let bottom = mapGrid.bounds[WorldToGrid(entity.boxCol.z + entity.boxCol.p, TILE_SIZE)%mapGrid.bounds.length][WorldToGrid(entity.boxCol.x + entity.boxCol.w, TILE_SIZE)%mapGrid.bounds[0].length].y;
		
		let left = mapGrid.bounds[WorldToGrid(entity.boxCol.z, TILE_SIZE)%mapGrid.bounds.length][WorldToGrid(entity.boxCol.x + entity.boxCol.w, TILE_SIZE)%mapGrid.bounds[0].length].y;
		
		let right = mapGrid.bounds[WorldToGrid(entity.boxCol.z+entity.boxCol.p, TILE_SIZE)%mapGrid.bounds.length][WorldToGrid(entity.boxCol.x, TILE_SIZE)%mapGrid.bounds[0].length].y;
		
		let currLim = mapGrid.bounds[WorldToGrid(entity.WorldPos.z, TILE_SIZE)%mapGrid.bounds.length][WorldToGrid(entity.WorldPos.x, TILE_SIZE)%mapGrid.bounds[0].length].y;
		
		const solidObjectArray = [];
		const slopeObjectArray = [];
		for(let i = 0; i < items.length; i++){
			if(items[i].ColType == "solidObject"){
				solidObjectArray.push(items[i].boxCol);
			}
		}
		for(let i = 0; i < npcs.length; i++){
			if(npcs[i].ColType == "solidObject"){
				solidObjectArray.push(npcs[i].boxCol);
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
		this.testCol(entity, solidObjectArray);
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
	handleMap(entity, mapGrid){
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
		
		let x_intro = Math.floor(Camera.x/TILE_SIZE);
		let x_end = Math.floor((Camera.x+Camera.w)/TILE_SIZE);
		//focus the camera downwards to check collisions when they're not in there
		let y_intro = Math.floor((Camera.y+entity.WorldPos.y)/TILE_SIZE);
		let y_end = Math.floor((Camera.y+Camera.h+entity.WorldPos.y)/TILE_SIZE);
		
		if(x_intro < 0) x_intro = 0;
		if(y_intro < 0) y_intro = 0;
		if(x_end > mapGrid.width) x_end = mapGrid.width;
		if(y_end > mapGrid.height) y_end = mapGrid.height;
		
		let playerBoxCol = [entity.boxCol.x, entity.boxCol.z, entity.boxCol.w, entity.boxCol.p, entity.boxCol.y, entity.boxCol.h]
		
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
	},
	
	handleChunkedMap(entity, pieces, itemArr, npcArr, num = -1){
		const chunkPixelSize = TILE_SIZE * CHUNK_SIZE;
		const cam = Camera;
		let startCX = Math.floor(cam.x / chunkPixelSize);
		let endCX   = Math.ceil((cam.x + cam.w) / chunkPixelSize);
		let startCY = Math.floor((cam.y + entity.WorldPos.y)/ chunkPixelSize);
		let endCY   = Math.ceil((cam.y + cam.h + entity.WorldPos.y) / chunkPixelSize);
		let playerBoxCol = [entity.boxCol.x, entity.boxCol.z, entity.boxCol.w, entity.boxCol.p]
		for (let cx = startCX; cx < endCX; cx++){
			for (let cy = startCY; cy < endCY; cy++){
				const idChunk = `${cx}_${cy}`;
				let chunkAtual = pieces[idChunk];
				if (chunkAtual){
					chunkAtual = pieces[idChunk].bounds;
					for (let i = 0; i < CHUNK_SIZE; i++){
						for (let j = 0; j < CHUNK_SIZE; j++){
							if(entity.WorldPos.y < chunkAtual[i][j].y){
								mapBoxCol = [chunkAtual[i][j].x, chunkAtual[i][j].z, TILE_SIZE, TILE_SIZE];
								if(Col.AABB(playerBoxCol, mapBoxCol)){
									Col[chunkAtual[i][j].tipo](entity, chunkAtual[i][j]);
								}
							}
						}
					}
				}
			}
		}
		
		entity.WorldPos.x = entity.boxCol.x + entity.boxCol.w*0.5;
		entity.WorldPos.z = entity.boxCol.z + entity.boxCol.p*0.5;
		entity.boxCol.y = entity.WorldPos.y + entity.boxCol.h;
		const chunkCoords = `${WorldToChunk(entity.WorldPos.x)}_${WorldToChunk(entity.WorldPos.z)}`;
		this.handleShadowCoords(entity, pieces[chunkCoords], num);
		this.handleYcoords(entity, pieces[chunkCoords], itemArr, npcArr);
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
		
		entity.isSwimming = false;
		entity.gravity = GRAVITY_EARTH;
		
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
		
		if(num == -1){
			let npcBox;
			for(let i = 0; i < npcArr.length; i++){
				npcBox = [npcArr[i].boxCol.x, npcArr[i].boxCol.z, npcArr[i].boxCol.w, npcArr[i].boxCol.p];
				if(Col.AABB(playerBoxCol, npcBox) && isOnGround(entity.WorldPos.y, npcArr[i].boxCol.y)){
					Col["solidObject"](entity, npcArr[i].boxCol);
				}
			}
		}
		
		
		if(mapGrid.isChunkedMap){
			this.handleChunkedMap(entity, mapGrid.pieces, itemArr, npcArr, num);
			return;
		} else {
			this.handleMap(entity, mapGrid);
		}
		
		entity.WorldPos.x = entity.boxCol.x + entity.boxCol.w*0.5;
		entity.WorldPos.z = entity.boxCol.z + entity.boxCol.p*0.5;
		entity.boxCol.y = entity.WorldPos.y + entity.boxCol.h;
		this.handleShadowCoords(entity, mapGrid, num)
		this.handleYcoords(entity, mapGrid, itemArr, npcArr);
	}
}

function isOnGround(entitY, struturY){
	return entitY <= struturY;
}

//only for special occasions
function isBellowGround(entitY, structurY){
	return entitY >= structurY;
}

