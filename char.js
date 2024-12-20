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
	constructor(NOME, HP, ATK, DEF, ACL, VMAX, height, width, dept, HTMLsrc){
		this.Nome = NOME;
		this.HP = HP; this.hp = HP;
		this.ATK = ATK; this.DEF = DEF;
		this.ACL = ACL; this.VMAX = VMAX;
		this.constHP = HP;
		
		this.isSpawn = false;
		this.isAlive = true;
		this.WorldPos = {x: undefined, y: undefined, z: undefined};
		this.OriginPos = {x: undefined, y: undefined, z: undefined};
		this.boxCol = new Box(undefined, undefined, undefined, width, height, dept);
		this.velocity = {x: 0, y: 0, z: 0};
		this.friction = 0.4;
		
		this.direcao = 1;
		this.grapho = document.querySelector(HTMLsrc);
		this.layer = 0;
		this.sublayer = 0;
		this.sombra = {x: this.boxCol.x, z: this.boxCol.z-this.boxCol.h};
		this.centralPoint = [canvas.width/2, canvas.height/2];
		this.pulando = false;
		this.sprite = {
			w: 154,
			h: 154
		};
		this.gravidade = GRAVITY_EARTH;
		this.frameX;
		this.frameY;
	}
	
	andar(axis){
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
	parar(axis){
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
	constructor(Nome, HP, ATK, DEF, VMIN, VMAX, JMAX, tail, height, width, dept, skills, HTMLsrc){
		//relacionado ao movimento
		super(Nome, HP, ATK, DEF, VMIN, VMAX, height, width, dept, HTMLsrc);
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
		this.oldDoing = "still"
		this.invensibility = false;
		//relacionado à ataques e coisas.
		this.ATKbox = {x: undefined, y: undefined, z: undefined, w: width, h: height, p: dept, type: "punch"};
		this.skills = skills;
		this.section = 0;
		this.ID = 0;
	}
	//important
	update(){
		this.boxCol.x += this.velocity.x;
		this.boxCol.z += this.velocity.z;
		this.boxCol.y = this.WorldPos.y + this.boxCol.h;
		if( checkCentralPoint(this.centralPoint[0], this.centralPoint[1]) == false ){
			this.centralPoint[1]-=this.velocity.z;
			this.centralPoint[0]-=this.velocity.x;
		}
	}
	//graphics
	desenhar(){
		ctx.drawImage(this.grapho, this.frameX*this.sprite.w, this.frameY*this.sprite.h, this.sprite.w, this.sprite.h, this.centralPoint[0]-this.boxCol.h*0.5, this.centralPoint[1]-this.boxCol.h, this.boxCol.h, this.boxCol.h);
		drawShadow(ctx, this, 1);
	}
	
	spawnInRelevo(x, y){
		return mapaAtual.relevoGrid[y][x]*TILE_SIZE;
	}
	spawn(){
		for(let i = 0; i < mapaAtual.height; i++){
			for(let j = 0; j < mapaAtual.width; j++){
				if(mapaAtual.beingGrid[i][j] == "p1"){
					this.boxCol.x = j*TILE_SIZE;
					this.boxCol.z = i*TILE_SIZE;
					this.WorldPos.y = this.spawnInRelevo(j,i);
					return true;
				}
			}
		}
	}
}