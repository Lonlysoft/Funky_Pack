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
	constructor(NOME, AGE, ACL, VMAX, height, width, dept, HTMLsrc, animations){
		this.Nome = NOME;
		this.HP = AGE*10; this.hp = AGE*10;
		this.ATK = Math.floor(AGE/2); this.DEF = Math.ceil(AGE/2);
		this.ACL = ACL; this.VMAX = VMAX;
		this.constHP = AGE*10;
		
		this.isSpawn = false;
		this.isAlive = true;
		this.WorldPos = {x: undefined, y: undefined, z: undefined};
		this.OriginPos = {x: undefined, y: undefined, z: undefined};
		this.boxCol = new Box(undefined, undefined, undefined, width, height, dept);
		this.velocity = {x: 0, y: 0, z: 0};
		this.friction = 0.4;
		
		
		this.dir = "S";
		this.doing = "still";
		this.oldDoing = "still";
		this.isWalking = {x: false, z: false};
		this.onGround = true;
		this.animationIndex = 0;
		this.anim = animations;
		this.isMirrored = false;
		this.grapho = document.querySelector(HTMLsrc);
		this.layer = 0;
		this.sublayer = 0;
		this.shadow = {x: this.boxCol.x, z: this.boxCol.z-this.boxCol.h};
		this.centralPoint = [canvas.width/2, canvas.height/2];
		this.jumping = false;
		this.sprite = {
			w: 154,
			h: 154
		};
		this.gravity = GRAVITY_EARTH;
		this.frameX = 0;
		this.frameY = 1;
	}
	
	walk(axis){
		this.isWalking[axis] = true;
		if(this.velocity[axis] >= this.VMAX){
			this.velocity[axis] = Number.parseInt(this.VMAX * this.pol);
		}
		else if(this.velocity[axis] <= (this.VMAX *-1)){
			this.velocity[axis] = Number.parseInt(this.VMAX * this.pol);
		}
		else{
			this.velocity[axis] += Number.parseInt(this.ACL * this.pol);
		}
	}
	stop(axis){
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
	constructor(Nome, age, VMIN, VMAX, JMAX, tail, height, width, dept, skills, HTMLsrc, animations){
		super(Nome, age, VMIN, VMAX, height, width, dept, HTMLsrc, animations);
		this.STR = VMIN;
		this.JPOW = JMAX;
		this.isSwimming = false;
		this.canTakeDamage = true;
		this.tail = [];
		this.hand = 0;
		this.tailMaxLength = tail;
		this.money = 0;
		this.xp = 0;
		this.invensibility = false;
		
		this.ATKbox = {x: undefined, y: undefined, z: undefined, w: width, h: height, p: dept, type: "punch"};
		this.skills = skills;
		this.section = 0;
		this.ID = 0;
	}
	//important
	update(){
		saveCoords(this.boxCol);
		this.onGround = false;
		this.boxCol.x += this.velocity.x;
		this.boxCol.z += this.velocity.z;
		this.WorldPos.y += this.velocity.y;
		this.WorldPos.x = this.boxCol.x + this.boxCol.w*0.5;
		this.WorldPos.z = this.boxCol.z + this.boxCol.p*0.5;
		this.boxCol.y = this.WorldPos.y + this.boxCol.h;
		this.shadow.x = this.boxCol.x;
		this.shadow.z = this.boxCol.z-this.boxCol.h;
		if( checkCentralPoint(this.centralPoint[0], this.centralPoint[1]) == false ){
			this.centralPoint[1]-=this.velocity.z;
			this.centralPoint[0]-=this.velocity.x;
		}
	}
	//graphics
	draw(){
		drawShadow(ctx, this, 1);
		let tailInFront = false;
		this.frameY = directions.setFrameY[this.dir](this);
		this.frameX = displayAnim(this);
		
		Game.ctx.drawImage(this.grapho,
			this.frameX*this.sprite.w,
			this.frameY*this.sprite.h,
			this.sprite.w, this.sprite.h,
			this.centralPoint[0]-this.boxCol.h*0.5,
			this.centralPoint[1]-this.boxCol.h+this.boxCol.p*0.25,
			this.boxCol.h, this.boxCol.h
		);
		if(this.isMirrored){//get back to normal state
			mirrorateToAPoint(Game.ctx, this.centralPoint[0], this.centralPoint[1]);
			this.isMirrored = false;
		}
	}
	interact(NPC__arr){
		let box = directions.setBox[this.dir](this);
		ctx.fillStyle = "green";
		ctx.fillRect(WorldToScreen1D(box[0], Camera.x, Camera.w/2 - Game.SCREEN_CENTER[0]), WorldToScreen1D(box[1], Camera.y, Camera.h/2 - Game.SCREEN_CENTER[1]), TILE_SIZE, TILE_SIZE);
		for(let i = 0; i < NPC__arr.length; i++){
			console.table(NPC__arr[i].dialog)
			let this__box = [NPC__arr[i].boxCol.x, NPC__arr[i].boxCol.z, NPC__arr[i].boxCol.w, NPC__arr[i].boxCol.p];
			if(isOnGround(this.WorldPos.y, NPC__arr[i].boxCol.y) && Col.AABB(box, this__box)){
				Game.onDialog = true;
				Game.dialogBox.draw(NPC__arr[i].dialog[NPC__arr[i].relationshipLevelWithYou]);
			}
		}
	}
	spawnInY(x, y){
		return Game.currentMap.grndElGrid[y][x]*TILE_SIZE;
	}
	spawn(){
		for(let i = 0; i < Game.currentMap.height; i++){
			for(let j = 0; j < Game.currentMap.width; j++){
				if(Game.currentMap.beingGrid[i][j] == "p1"){
					this.boxCol.x = j*TILE_SIZE;
					this.boxCol.z = i*TILE_SIZE;
					this.WorldPos.y = this.spawnInY(j,i);
					return true;
				}
			}
		}
	}
}