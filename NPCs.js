//codigo dos INIMIGOS E NPCs

class NonPlayableChar extends Being{
	constructor(arg, coords){ 
		super(arg.name, arg.age, 4, 8, arg.height, arg.width, arg.dept, arg.htmlSrc, arg.animations);
		this.dialog = arg.dialogs;
		this.dimen = {w: arg.width, h: arg.height, p: arg.dept};
		this.visible = true;
		this.SpawnPos = {x: coords.x, y: coords.y, z: coords.z};
		this.flagCoords = {x: coords.x, y: coords.y, z: coords.z}
		this.boxCol = new Box(coords.x, coords.y + this.dimen.h, coords.z, this.dimen.w, this.dimen.h, this.dimen.p);
		this.behaviorArr = {arr: arg.pathArr, index: 0};
		this.ID = arg.ID;
	}
	draw(map){
		if(this.grapho){
			this.frameY = directions.setFrameY[this.dir](this);
			this.frameX = displayAnim(this);
			
			Game.ctx.drawImage(this.grapho,
				this.frameX*this.sprite.w,
				this.frameY*this.sprite.h,
				this.sprite.w, this.sprite.h,
				this.centralPoint[0]-this.boxCol.h*1.5*0.5,
				this.centralPoint[1]-this.boxCol.h*1.5+this.boxCol.p*1.5,
				this.boxCol.h*1.5, this.boxCol.h*1.5
			);
			/*
			Game.ctx.fillRect(
				this.centralPoint[0]-this.boxCol.h*0.5,
				this.centralPoint[1]-this.boxCol.h+this.boxCol.p,
				this.boxCol.h, this.boxCol.h
			);
			*/
			if(this.isMirrored){//get back to normal state
				mirrorateToAPoint(Game.ctx, this.centralPoint[0], this.centralPoint[1]);
				//mirrorate(Game.ctx)
				this.isMirrored = false;
			}
			return;
		}
		ctx.fillRect(this.centralPoint[0], this.centralPoint[1], this.boxCol.w , this.boxCol.h);
	}
	update(){
		scriptedBehavior(this, this.behaviorArr);
		this.boxCol.x += this.velocity.x;
		this.boxCol.z += this.velocity.z;
		this.WorldPos.y += this.velocity.y;
		this.WorldPos.x = this.boxCol.x + this.boxCol.w*0.5;
		this.WorldPos.z = this.boxCol.z + this.boxCol.p*0.5;
		this.boxCol.y = this.WorldPos.y + this.boxCol.h;
		this.shadow.x = this.boxCol.x;
		this.shadow.y = this.boxCol.z + this.boxCol.y;
		this.centralPoint[0] = WorldToScreen1D(this.WorldPos.x, Camera.x, Camera.w/2 - Game.SCREEN_CENTER[0]);
		this.centralPoint[1] = WorldToScreen1D(this.WorldPos.z-this.WorldPos.y, Camera.y, Camera.h/2 - Game.SCREEN_CENTER[1]);
	}
	spawn(){
		this.WorldPos.x = this.SpawnPos.x;
		this.WorldPos.z = this.SpawnPos.z;
		this.WorldPos.y = this.SpawnPos.y;
		this.boxCol.x = this.SpawnPos.x - this.boxCol.w*0.5;
		this.boxCol.z = this.SpawnPos.z - this.boxCol.p*0.5;
		this.boxCol.y = this.SpawnPos.y + this.boxCol.h;
		return true;
	}
}

//basically we pick the graph that comes with the map, apply that to the movement using lerps and objects we set the NPCs' points of localization, if no graph, NPCs must do regular state machine code or do nothing actually
function Behavior(entity, graph){
	if(graph){
		if(!entity.definedPath)
			Dijkstra(graph);
	}
}