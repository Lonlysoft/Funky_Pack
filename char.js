class Box{
	constructor(x, y, z, width, height, dept){
		this.x = x,
		this.y = y,
		this.z = z,
		this.oldX = undefined,
		this.oldY = undefined,
		this.oldZ = undefined,
		this.w = width,
		this.h = height,
		this.p = dept
	}
}

class Being{
	constructor(name, AGE, ACL, VMAX, height, width, dept, HTMLsrc, animations){
		this.name = name;
		this.HP = AGE*10; this.hp = AGE*10;
		this.maxHunger = AGE*15;
		this.maxStamina = AGE*10;
		this.stamina = AGE*10;
		this.solitude = 100;
		this.maxSolitude = 1000;
		this.maxJoy = 100;
		this.joy = 50;
		this.hunger = 45;
		this.ATK = Math.floor(AGE/2); this.DEF = Math.ceil(AGE/2);
		this.ACL = ACL; this.VMAX = VMAX;
		this.constHP = AGE*10;
		this.isSpawn = false;
		this.isAlive = true;
		this.WorldPos = {x: undefined, y: undefined, z: undefined};
		this.OriginPos = {x: undefined, y: undefined, z: undefined};
		this.boxCol = new Box(undefined, undefined, undefined, width/2, height, dept/2);
		this.velocity = {x: 0, y: 0, z: 0};
		this.friction = 0.6;
		
		
		this.dir = "S";
		this.doing = "still";
		this.oldDoing = "still";
		this.isWalking = {x: false, z: false};
		this.onGround = true;
		this.animationIndex = 0;
		this.anim = animations;
		this.animTimer = 0;
		this.movementFlag = "walk";
		this.isMirrored = false;
		this.grapho = document.querySelector(HTMLsrc);
		this.layer = 0;
		this.sublayer = 0;
		this.shadow = {x: this.boxCol.x, z: this.boxCol.z-this.boxCol.h};
		this.centralPoint = [canvas.width/2, canvas.height/2];
		this.jumping = false;
		this.sprite = {
			w: 192,
			h: 192
		};
		this.gravity = GRAVITY_EARTH;
		this.frameX = 0;
		this.frameY = 0;
	}
	
	walk(axis){
		this.isWalking[axis] = true;
		if(this.velocity[axis] >= this.VMAX){
			this.velocity[axis] = Math.floor(this.VMAX *deltaTime * this.pol);
		}
		else if(this.velocity[axis] <= (this.VMAX *-1)){
			this.velocity[axis] = Math.floor(this.VMAX *deltaTime * this.pol);
		}
		else{
			this.velocity[axis] += Math.floor(this.ACL * deltaTime* this.pol);
		}
	}
	run(axis){
		this.isWalking[axis] = true;
		if(this.velocity[axis] >= this.VMAX*2){
			this.velocity[axis] = this.VMAX *2 * deltaTime * this.pol;
		}
		else if(this.velocity[axis] <= (this.VMAX *-1)){
			this.velocity[axis] = this.VMAX*2 *deltaTime * this.pol;
		}
		else{
			this.velocity[axis] += this.ACL* deltaTime* this.pol;
		}
	}
	stop(axis){
		this.isWalking[axis] = false;
		if(this.onGround){
			this.velocity[axis] *= this.friction;
			this.velocity[axis] = Number.parseInt(this.velocity[axis]);
		}
	}
	stopAbsolute(axis){
		this.isWalking[axis] = false;
		this.velocity[axis] *= this.friction;
		this.velocity[axis] = Number.parseInt(this.velocity[axis]);
	}
	reset(){
		this.hp = this.constHP;
		this.WorldPos.x = this.OriginPos.x;
		this.WorldPos.z = this.OriginPos.z;
		this.WorldPos.y = this.OriginPos.y;
		this.boxCol.x = this.OriginPos.x - this.boxCol.w*0.5;
		this.boxCol.y = this.OriginPos.y + this.boxCol.h;
		this.boxCol.z = this.OriginPos.z - this.boxCol.p*0.5;
	}
	setTop(z){
		this.boxCol.z = z
	}
	setBottom(z){
		this.boxCol.z = z - this.boxCol.p - MAGIC_OFFSET;
	}
	setEast(x){
		this.boxCol.x = x
	}
	setWest(x){
		this.boxCol.x = x - this.boxCol.w - MAGIC_OFFSET;
	}
	
	
}

class Protagonist extends Being{
	constructor(arg){
		super(arg.name, arg.age, arg.min_speed, arg.max_speed, arg.height, arg.width, arg.dept, arg.htmlSrc, arg.animations);
		this.dimen = {w: arg.width, h: arg.height, p: arg.dept};
		this.jobs = [];
		this.STR = arg.min_speed;
		this.JPOW = arg.jump_power;
		this.isSwimming = false;
		this.isSpecialSkilling = false;
		this.isCrouching = false;
		this.canTakeDamage = true;
		this.tail = [];
		this.hand = 0;
		this.tailMaxLength = arg.inventory;
		this.money = new Money(0);
		this.xp = 0;
		this.invensibility = false;
		this.relationships = arg.relationships;
		this.ATKbox = {x: undefined, y: undefined, z: undefined, w: arg.width, h: arg.height, p: arg.dept, type: "punch"};
		this.skillList = arg.skills;
		this.section = 0;
		this.ID = 0;
		this.holdingObject = false;
	}
	update(){
		this.centralPoint[0] = WorldToScreen1D(this.WorldPos.x, Camera.x
, Camera.w/2 - Game.SCREEN_CENTER[0]);
		this.centralPoint[1] = WorldToScreen1D(this.WorldPos.z-this.WorldPos.y, Camera.y, Camera.h/2 - Game.SCREEN_CENTER[1]);
		saveCoords(this.boxCol);
		if(this.onGround && this.isSpecialSkilling){
			this.isSpecialSkilling = false;
		}
		
		this.onGround = false;
		this.boxCol.x += this.velocity.x;
		this.boxCol.z += this.velocity.z;
		this.WorldPos.y += this.velocity.y;
		this.WorldPos.x = this.boxCol.x + this.boxCol.w*0.5;
		this.WorldPos.z = this.boxCol.z + this.boxCol.p*0.5;
		this.boxCol.y = this.WorldPos.y + this.boxCol.h;
		this.shadow.x = this.boxCol.x;
		this.shadow.z = this.boxCol.z-this.boxCol.h;
		
		if(this.holdingObject && this.hand !== 0){
			this.hand.centralPoint[0] = this.centralPoint[0];
			this.hand.centralPoint[1] = this.centralPoint[1] - this.boxCol.h*0.6;
	//		this.hand.update();
		}
		this.hp = limitateUp(this.hp, this.HP);
		this.hunger = limitateUp(this.hunger, this.maxHunger);
	}
	draw(currentMap = Game.currentMap){
		drawShadow(ctx, this, currentMap, 0.5);
		this.frameY = directions.setFrameY[this.dir](this);
		this.frameX = displayAnim(this);
		
		Game.ctx.drawImage(this.grapho,
			this.frameX*this.sprite.w,
			this.frameY*this.sprite.h,
			this.sprite.w, this.sprite.h,
			this.centralPoint[0]-this.boxCol.h*0.5,
			this.centralPoint[1]-this.boxCol.h+this.boxCol.p,
			this.boxCol.h, this.boxCol.h
		);
		if(this.isMirrored){//get back to normal state
			mirrorateToAPoint(Game.ctx, this.centralPoint[0], this.centralPoint[1]);
			//mirrorate(Game.ctx)
			this.isMirrored = false;
		}
		if(this.hand != 0){
			this.hand.draw();
		}
	}
	interact(NPC__arr, item__arr){
		let box = directions.setBox[this.dir](this);
		ctx.fillStyle = "green";
		ctx.fillRect(WorldToScreen1D(box[0], Camera.x, Camera.w/2 - Game.SCREEN_CENTER[0]), WorldToScreen1D(box[1], Camera.y, Camera.h/2 - Game.SCREEN_CENTER[1]), TILE_SIZE, TILE_SIZE);
		for(let i = 0; i < NPC__arr.length; i++){
			let this__box = [NPC__arr[i].boxCol.x, NPC__arr[i].boxCol.z, NPC__arr[i].boxCol.w, NPC__arr[i].boxCol.p];
			if(isOnGround(this.WorldPos.y, NPC__arr[i].boxCol.y) && Col.AABB(box, this__box)){
				const conditionalDto = {time: Clock.getDayLateness(), story: Game.storyMoment, relationship: this.relationships[NPC__arr[i].ID]};
				Game.onDialog = true;
				UI.dialogItems.object = chooseDialog(NPC__arr[i].dialog, conditionalDto);
				UI.dialogItems.bufferAnimation = 0;
				UI.dialogStart();
			}
		}
		
		//to interact with the interactables items 
		let interactables = item__arr.filter(
			item =>{
				return item.usage == "interact";
			}
		);
		for(let i = 0; i < interactables.length; i++){
			let this__box = [interactables[i].boxCol.x, interactables[i].boxCol.z, interactables[i].boxCol.w, interactables[i].boxCol.p];
			if(isOnGround(this.WorldPos.y, interactables[i].boxCol.y) && Col.AABB(box, this__box)){
				interactables[i].use(this);
			}
		}
	}
	spawnInY(map, x, y){
		return map.grndElGrid[y][x]*TILE_SIZE;
	}
	spawn(map){
		if(map.beingGrid == undefined){
			this.boxCol.x = 5*TILE_SIZE;
			this.boxCol.z = 5*TILE_SIZE;
			this.WorldPos.y = this.spawnInY(map,5,5);
			return true;
		}
		for(let i = 0; i < map.height; i++){
			for(let j = 0; j < map.width; j++){
				if(map.beingGrid[i][j] == "p1"){
					this.boxCol.x = j*TILE_SIZE;
					this.boxCol.z = i*TILE_SIZE;
					this.WorldPos.y = this.spawnInY(map,j,i);
					return true;
				}
			}
		}
		
	}
	learnSkill(skillName){
		if(!this.skillList.includes(skillName))this.skillList.push(skillName);
	}
	doSkill(skillName){
		if(this.skillList.includes(skillName))skillSet[skillName](this);
	}
}

const skillSet = {
	hold: function(entity){
		entity.hand = Col.receiveItem(entity, Game.ItemArr);
		if(entity.hand != 0){
			entity.holdingObject = true;
		}
		else{
			entity.holdingObject = false;
		}
	},
	putAway: function(entity){
		if(entity.tail.length < entity.tailMaxLength){
			entity.tail.push(entity.hand);
			entity.hand = 0;
			entity.holdingObject = false;
		}
	},
	hover: function(entity){
		entity.velocity.y = 0;
	},
	release: function(entity){
		//TODO: check if item is a food. if it is, the food will be discarted and play an animation of it getting destroyed.
		if(entity.hand != 0){
			entity.holdingObject = false;
			const box = directions.setBox[entity.dir](entity);
			entity.hand.isCollected = false;
			entity.hand.boxCol.x = box[0]+TILE_SIZE*0.5-entity.hand.boxCol.w*0.5;
			entity.hand.boxCol.z = box[1]+TILE_SIZE*0.5-entity.hand.boxCol.p*0.5;
			entity.hand.boxCol.y = Game.currentMap.bounds[WorldToGrid(box[1], TILE_SIZE)][WorldToGrid(box[0], TILE_SIZE)].y
			Game.currentMap.items.push(entity.hand);
			entity.hand = 0;
		}
	},
	dashDive: function(entity){
		if(!entity.onGround){
			directions.frontDash[entity.dir](entity, 20);
		}
	},
	eatAnything: function(entity){
		//entity.belly.push(entity.hand); //vore flerting 
		entity.hunger = limitateDown(entity.hunger-25, 0);
		entity.holdingObject = false;
		entity.hand = 0;
	}
}