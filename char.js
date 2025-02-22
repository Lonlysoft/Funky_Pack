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
		//if(this.doing != "jump"){
			this.doing = (this.dir == "S" || this.dir == "N") ? "walk" : "walkDifferent";
		//}
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
		this.doing = "still"
		this.velocity[axis] *= this.friction;
		this.velocity[axis] = Number.parseInt(this.velocity[axis])
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
		this.onGround = true;
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
		saveCoords(this.boxCol)
		this.onGround = false;
		this.boxCol.x += this.velocity.x;
		this.boxCol.z += this.velocity.z;
		this.WorldPos.y += this.velocity.y;
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
		switch(this.dir){
			case 'S': this.frameY = 1; break;
			case 'N': this.frameY = 2; tailInFront = true; break;
			case "E": this.frameY = 3; break;
			case "W": this.frameY = 3; mirrorateToAPoint(Game.ctx, this.centralPoint[0], this.centralPoint[1]); this.isMirrored = true; break;
			case "SE": this.frameY = 4; break;
			case "SW": this.frameY = 4; mirrorateToAPoint(Game.ctx, this.centralPoint[0], this.centralPoint[1]); this.isMirrored = true; break;
			case "NW": this.frameY = 6.5; break;
			case "NE": this.frameY = 6.5; mirrorateToAPoint(Game.ctx, this.centralPoint[0], this.centralPoint[1]); this.isMirrored = true; break;
		}
		
		this.frameX = displayAnim(this);
		
		Game.ctx.drawImage(this.grapho,
			this.frameX*this.sprite.w,
			this.frameY*this.sprite.h,
			this.sprite.w, this.sprite.h,
			this.centralPoint[0]-this.boxCol.h*0.5,
			this.centralPoint[1]-this.boxCol.h+this.boxCol.p*0.25,
			this.boxCol.h, this.boxCol.h
		);
		
		if(tailInFront){
			Game.ctx.drawImage(this.grapho, 0*this.sprite.w, 5.5*this.sprite.h, this.sprite.w, this.sprite.h, this.centralPoint[0]-this.boxCol.h/2*0.5, this.centralPoint[1]-this.boxCol.h/2, this.boxCol.h/2, this.boxCol.h/2);
		}
		if(this.isMirrored){//get back to normal state
			mirrorateToAPoint(Game.ctx, this.centralPoint[0], this.centralPoint[1]);
			this.isMirrored = false;
		}
	}
	interact(NPC__arr){
		let box = [0, 0, TILE_SIZE, TILE_SIZE];
		switch(this.dir){
			case 'S':
				box[0] = GridToWorld(WorldToGrid(this.boxCol.x, TILE_SIZE), TILE_SIZE);
				box[1] = GridToWorld(WorldToGrid(this.boxCol.z + this.boxCol.p, TILE_SIZE), TILE_SIZE);
				break;
			case 'N':
				box[0] = GridToWorld(WorldToGrid(this.boxCol.x, TILE_SIZE), TILE_SIZE);
				box[1] = GridToWorld(WorldToGrid(this.boxCol.z - this.boxCol.p, TILE_SIZE), TILE_SIZE);
				break;
			case "E":
				box[0] = GridToWorld(WorldToGrid(this.boxCol.x + this.boxCol.w, TILE_SIZE), TILE_SIZE);
				box[1] = GridToWorld(WorldToGrid(this.boxCol.z, TILE_SIZE), TILE_SIZE);
				break;
			case "W":
				box[0] = GridToWorld(WorldToGrid(this.boxCol.x - this.boxCol.w, TILE_SIZE), TILE_SIZE);
				box[1] = GridToWorld(WorldToGrid(this.boxCol.z, TILE_SIZE), TILE_SIZE);
				break;
			case "SE":
				box[0] = GridToWorld(WorldToGrid(this.boxCol.x + this.boxCol.w, TILE_SIZE), TILE_SIZE);
				box[1] = GridToWorld(WorldToGrid(this.boxCol.z + this.boxCol.p, TILE_SIZE), TILE_SIZE);
				break;
			case "SW":
				box[0] = GridToWorld(WorldToGrid(this.boxCol.x - this.boxCol.w, TILE_SIZE), TILE_SIZE);
				box[1] = GridToWorld(WorldToGrid(this.boxCol.z + this.boxCol.p, TILE_SIZE), TILE_SIZE);
				break;
			case "NW":
				box[0] = GridToWorld(WorldToGrid(this.boxCol.x - this.boxCol.w, TILE_SIZE), TILE_SIZE);
				box[1] = GridToWorld(WorldToGrid(this.boxCol.z - this.boxCol.p, TILE_SIZE), TILE_SIZE);
				break;
			case "NE":
				box[0] = GridToWorld(WorldToGrid(this.boxCol.x + this.boxCol.w, TILE_SIZE), TILE_SIZE);
				box[1] = GridToWorld(WorldToGrid(this.boxCol.z - this.boxCol.p, TILE_SIZE), TILE_SIZE);
				break;
		}
		for(let i = 0; i < NPC__arr; i++){
			if(onGround(this.WorldPos.y, NPC__arr[i].boxCol.y)){
				if(Col.AABB(box, this__box)){
					Game.dialogBox.draw(NPC__arr[i].dialogs[NPC__arr[i].realtionshipLevelWithYou]);
				}
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