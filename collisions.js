/*file to keep colisions out of things*/

function saveCoords(entityBoxCol){
	entityBoxCol.oldX = entityBoxCol.x;
	entityBoxCol.oldY = entityBoxCol.y;
	entityBoxCol.oldZ = entityBoxCol.z;
}

function handleOld(){
	saveCoords(personagemAtual.boxCol);
	for(let i = 0; i < arrayDeInimigos.length; i++){
		saveCoords(arrayDeInimigos[i].boxCol);
	}
}

const Col = {
	AABB: function(retangulo1, retangulo2){
		return retangulo1[0] + retangulo1[2] >= retangulo2[0] &&
				retangulo1[0] <= retangulo2[0] + retangulo2[2] &&
				retangulo1[1] + retangulo1[3] >= retangulo2[1] &&
				retangulo1[1] <= retangulo2[1] + retangulo2[3];
	},
	
	handleShadowCoords(entity, num = -1){
		let topLeft = Game.currentMap.shadowGrid[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x, TILE_SIZE)];
		let topRight = Game.currentMap.shadowGrid[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x+entity.boxCol.w, TILE_SIZE)];
		let bottomLeft = Game.currentMap.shadowGrid[WorldToGrid(entity.boxCol.z+entity.boxCol.p-entity.velocity.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x+entity.velocity.x, TILE_SIZE)];
		let bottomRight = Game.currentMap.shadowGrid[WorldToGrid(entity.boxCol.z+entity.boxCol.p-entity.velocity.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x+entity.boxCol.w+entity.velocity.x, TILE_SIZE)];
		let maxValue = maxVal([topLeft, topRight, bottomLeft, bottomRight])
		entity.layer = maxValue;
		//inserir sublayer baseado na colisão de sombra do inimigo
		for(let i = 0; i < arrayDeInimigos.length; i++){
			if(i == num) continue;
			this.handleShadowObjects(entity, arrayDeInimigos[i].shadow, arrayDeInimigos[i].layer, arrayDeInimigos[i].sublayer);
		}
		for(let i = 0; i < arrayDeItens.length; i++){
			this.handleShadowObjects(entity, arrayDeItens[i].shadow, arrayDeItens[i].layer, arrayDeItens[i].sublayer);
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
	
	interact: function(entity, NPCarr){
		
		for(let i = 0; i < NPCarr.length; i++){
			
		}
		return false;
	},
	
	createAtkBox: function(boxCol, atkBox, direcao){
		switch(direcao){
			case 1:
				atkBox.x = boxCol.x;
				atkBox.z = boxCol.z + boxCol.p;
				atkBox.y = boxCol.y + boxCol.h/3;
			break;
			case 2:
				atkBox.x = boxCol.x + boxCol.w;
				atkBox.z = boxCol.z;
				atkBox.y = boxCol.y + boxCol.h/3;
			break;
			case 3:
				atkBox.x = boxCol.x;
				atkBox.z = boxCol.z - boxCol.p;
				atkBox.y = boxCol.y + boxCol.h/3;
			break;
			case 4:
				atkBox.x = boxCol.x - boxCol.w;
				atkBox.z = boxCol.z;
				atkBox.y = boxCol.y + boxCol.h/3;
			break;
			case 5:
				atkBox.x = boxCol.x + boxCol.w;
				atkBox.z = boxCol.z + boxCol.p;
				atkBox.y = boxCol.y + boxCol.h/3;
			break;
			case 6:
				atkBox.x = boxCol.x + boxCol.w;
				atkBox.z = boxCol.z - boxCol.p;
				atkBox.y = boxCol.y + boxCol.h/3;
			break;
			case 7:
				atkBox.x = boxCol.x - boxCol.w;
				atkBox.z = boxCol.z - boxCol.p;
				atkBox.y = boxCol.y + boxCol.h/3;
			break;
			case 8:
				atkBox.x = boxCol.x - boxCol.w;
				atkBox.z = boxCol.z + boxCol.p;
				atkBox.y = boxCol.y + boxCol.h/3;
			break;
		}
	},
	
	receiveItem(entityCol, itemArr){
		let arrayCol = [entityCol.x, entityCol.z, entityCol.w, entityCol.p];
		let switcher;
		for(let i = 0; i < itemArr.length; i++){
			let arrayColItens = [itemArr[i].boxCol.x, itemArr[i].boxCol.z, itemArr[i].boxCol.w, itemArr[i].boxCol.p]
			if(this.AABB(arrayCol, arrayColItens)){
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
		particles(ctx, coin);
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
	
	//types of collision material
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
	
	uppingBottom: function(entity, cube){
		if(entity.boxCol.z < cube.z+cube.p && entity.boxCol.oldZ >= cube.z+ cube.p){
			entity.velocity.z = 0;
			entity.boxCol.z = cube.z + cube.p + MAGIC_OFFSET;
			entity.velocity.y = 10;
			return true;
		}
		return false;
	},
	
	agua: function(entity, cube){
		if(entity.boxCol.y < cube.y && entity.boxCol.oldY >= cube.y){
			//entity.velocity.y = 0;
			entity.gravidade = GRAVIDADE_NA_AGUA;
			return true;
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
	//isdo aqui é relativo ao colisionador de slopes
	slopeTop: function(entity, cube, slope, y_offset, axis){
		let dimen = (axis == "x")? "w" : "p"
		let originX = cube[axis];
		let originY = cube.y + y_offset;
		let currentX = (slope < 0) ? entity[axis] + entity[dimen] - originX : entity.boxCol[axis] - originX;
		let currentY = entity.boxCol.y + entity.boxCol.height - originY;
		let oldX = (slope < 0) ? entity["old"+axis.toUppercase()] + entity[dimen] - originX : entity.boxCol["old"+axis.toUppercase()] - originX;
		let oldY = entity.boxCol.oldY + entity.boxCol.h - originY;
		//["old"+axis.toUppercase()]
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
	
	
	handleYcoords(entity){
		//entity.pontoCentral[1] -= entity.velocity.y;
		let top = Game.currentMap.limites[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x, TILE_SIZE)].y
		let bottom = Game.currentMap.limites[WorldToGrid(entity.boxCol.z + entity.boxCol.p, TILE_SIZE)][WorldToGrid(entity.boxCol.x + entity.boxCol.w, TILE_SIZE)].y;
		let left = Game.currentMap.limites[WorldToGrid(entity.boxCol.z, TILE_SIZE)][WorldToGrid(entity.boxCol.x + entity.boxCol.w, TILE_SIZE)].y;
		let right = Game.currentMap.limites[WorldToGrid(entity.boxCol.z+entity.boxCol.p, TILE_SIZE)][WorldToGrid(entity.boxCol.x, TILE_SIZE)].y;;
		let currLim = Game.currentMap.limites[WorldToGrid(entity.WorldPos.z, TILE_SIZE)][WorldToGrid(entity.WorldPos.x, TILE_SIZE)].y;
		//não é a melhor forma de fazer isso pois é 4*O(N) todos os frames.
		let solidObjectArray = []
		for(let i = 0; i < arrayDeItens.length; i++){
			if(arrayDeItens[i].tipo == "solidObject"){
				solidObjectArray.push(arrayDeItens[i]);
			}
		}
		if((!isOnGround(entity.WorldPos.y, top) && !isOnGround(entity.WorldPos.y, left) && !isOnGround(entity.WorldPos.y, right) && !isOnGround(entity.WorldPos.y, bottom))){
			entity.velocity.y -= entity.gravidade;
			entity.onGround = false;
		}
		else{
			entity.velocity.y = 0;
			entity.onGround = true;
			entity.pulando = false
		}
		if(isOnGround(entity.WorldPos.y, currLim) && entity.WorldPos.y < currLim){
			entity.WorldPos.y = currLim;
			entity.pontoCentral[1] = CentroDaTela[1];
		}
	},
	
	main(entity, num = -1){
		entity.WorldPos.x = entity.boxCol.x + entity.boxCol.w*0.5;
		entity.WorldPos.z = entity.boxCol.z + entity.boxCol.p*0.5;
		entity.boxCol.y = entity.WorldPos.y + entity.boxCol.h;
		if(entity.WorldPos.x<entity.boxCol.w*0.5){
			entity.WorldPos.x = 30;
			entity.boxCol.x = 0;
			entity.velocity.x = 0;
		}
		if(entity.WorldPos.z<entity.boxCol.p*0.5){
			entity.WorldPos.z = 30;
			entity.boxCol.z = 0;
			entity.velocity.z = 0;
			//aqui teria uma tela de game over porque ele tà out of bounds
		}
		
		if(entity.WorldPos.x>=((Game.currentMap.largura)*TILE_SIZE)-entity.boxCol.w/2){
			entity.WorldPos.x = ((Game.currentMap.largura)*TILE_SIZE)-entity.boxCol.w*0.5;
			entity.boxCol.x = Game.currentMap.largura*TILE_SIZE-entity.boxCol.w-MAGIC_OFFSET;
			entity.velocity.x = 0;
		}
		
		if(entity.WorldPos.z>=((Game.currentMap.altura)*TILE_SIZE)-entity.boxCol.p*0.5){
			entity.WorldPos.z = ((Game.currentMap.altura)*TILE_SIZE)-entity.boxCol.p*0.5;
			entity.boxCol.z = Game.currentMap.altura*TILE_SIZE-entity.boxCol.p-MAGIC_OFFSET;
			entity.velocity.z = 0;
			
			//aqui tbm
		}
		
		entity.nadando = false;
		entity.gravidade = GRAVIDADE_NA_TERRA;
		
		let curLimStartZ = WorldToGrid(entity.WorldPos.z - entity.boxCol.p*0.5, TILE_SIZE);
		let curLimEndZ = WorldToGrid(entity.WorldPos.z + entity.boxCol.p*0.5, TILE_SIZE);
		let curLimStartX = WorldToGrid(entity.WorldPos.x - entity.boxCol.w/2, TILE_SIZE);
		let curLimEndX = WorldToGrid(entity.WorldPos.x + entity.boxCol.w/2, TILE_SIZE);
		let curLimStartY = WorldToGrid(entity.WorldPos.y, TILE_SIZE);
		let curLimEndY = WorldToGrid(entity.WorldPos.y - entity.boxCol.h, TILE_SIZE);
		
		let playerCubeCol = [entity.boxCol.x, entity.boxCol.z, entity.boxCol.w, entity.boxCol.p, entity.boxCol.y, entity.boxCol.h]
		
		
		//começou as colisões em relação ao tileset
		let x_intro = Math.floor(Camera.x/TILE_SIZE);
		let x_end = Math.floor((Camera.x+Camera.w)/TILE_SIZE);
		let y_intro = Math.floor(Camera.y/TILE_SIZE);
		let y_end = Math.floor((Camera.y+Camera.h)/TILE_SIZE);
		
		if(x_intro < 0) x_intro = 0;
		if(y_intro < 0) y_intro = 0;
		if(x_end > Game.currentMap.largura) x_end = Game.currentMap.largura;
		if(y_end > Game.currentMap.altura) y_end = Game.currentMap.altura;
		
		let playerBoxCol = [entity.boxCol.x, entity.boxCol.z, entity.boxCol.w, entity.boxCol.p, entity.boxCol.y, entity.boxCol.h]
		//comparar colisoes com os inimigos 
		let enemiesBox;
		for(let i = 0; i < arrayDeInimigos.length; i++){
			enemiesBox = [arrayDeInimigos[i].boxCol.x, arrayDeInimigos[i].boxCol.z, arrayDeInimigos[i].boxCol.w, arrayDeInimigos[i].boxCol.p, arrayDeInimigos[i].boxCol.y, arrayDeInimigos[i].boxCol.h]
			if(col.AABB(playerBoxCol, enemiesBox) && isOnGround(entity.WorldPos.y, arrayDeInimigos[i].boxCol.y) && num == -1 && !entity.invensibilidade){
				entity.velocity.x = 0;
				entity.velocity.z = 0;
				entity.boxCol.x = arrayDeInimigos[i].boxCol.x + entity.boxCol.w;
				entity.boxCol.z = arrayDeInimigos[i].boxCol.z + entity.boxCol.p;
				entity.hp -= 10;
				entity.invensibilidade = true;
			}
		}
		
		//colisionar com os NPCs 
		
		
		
		//comparar colisoes com os itens presentes
		if(num == -1){
			let itensBox;
			for(let i = 0; i < arrayDeItens.length; i++){
				itensBox = [arrayDeItens[i].boxCol.x, arrayDeItens[i].boxCol.z, arrayDeItens[i].boxCol.w, arrayDeItens[i].boxCol.p];
				if(col.AABB(playerBoxCol, itensBox) && isOnGround(entity.WorldPos.y, arrayDeItens[i].boxCol.y)){
					col[arrayDeItens[i].tipo](entity, arrayDeItens[i]);
					if(arrayDeItens[i].equivalente == "coletavelinstantaneo"){
						arrayDeItens.splice(i, i);
					}
				}
			}
		}
		
		let mapBoxCol;
		let waterBoxCol;
		
		for(let j = x_intro; j < x_end; j++){
			for(let i = y_intro; i < y_end; i++){
				if(entity.WorldPos.y < Game.currentMap.limites[i][j].y){
					mapBoxCol = [Game.currentMap.limites[i][j].x, Game.currentMap.limites[i][j].z, TILE_SIZE, TILE_SIZE];
					if(col.AABB(playerBoxCol, mapBoxCol)){
						col[Game.currentMap.limites[i][j].tipo](entity, Game.currentMap.limites[i][j])
					}
				}
				if(Game.currentMap.temAgua && entity.WorldPos.y < Game.currentMap.aguaLimites[i][j].y){
					waterBoxCol = [Game.currentMap.aguaLimites[i][j].x, Game.currentMap.aguaLimites[i][j].z, TILE_SIZE, TILE_SIZE];
					if(col.AABB(playerBoxCol, waterBoxCol)){
						entity.nadando = true;
						col[Game.currentMap.aguaLimites[i][j].tipo](entity, Game.currentMap.aguaLimites[i][j]);
					}
				}
			}//fim for
		}//fim for 
		entity.WorldPos.x = entity.boxCol.x + entity.boxCol.w/2;
		entity.WorldPos.z = entity.boxCol.z + entity.boxCol.p/2;
		entity.boxCol.y = entity.WorldPos.y + entity.boxCol.h;
	}
}

//num serve apenas pra ser compatível com os inimigos
//fim colisionar
function isOnGround(entitY, struturY){
	return entitY <= struturY;
}


//lembre-se de que esse contexto é especifico.
function isBellowGround(entitY, structurY){
	return entitY >= structurY;
}

