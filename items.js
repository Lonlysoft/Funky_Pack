const itemGraphics = document.getElementById("items");

class Item{
	constructor(itemSourceConstructor, x, z, y){
		this.boxCol = new Box(x, y + itemSourceConstructor.h, z, itemSourceConstructor.w, itemSourceConstructor.h, itemSourceConstructor.p);
		this.SpawnPos = {x: x, y: y, z: z};
		this.WorldPos = {x: undefined, y: undefined, z: undefined};
		this.name = itemSourceConstructor.name;
		this.ID = itemSourceConstructor.ID;
		this.centralPoint = new Array(2)
		this.velocity = {x: 0, y: 0, z: 0};
		this.friction = 0.9;
		this.usage = itemSourceConstructor.usage;
		this.ColType = itemSourceConstructor.ColType;
		this.layer = 0;
		this.sublayer = 0;
		this.type = itemSourceConstructor.type;
		this.value = itemSourceConstructor.value;
		this.visible = false;
		this.isCollected = false;
		this.shadow = {
			x: x, y: y+z, w: itemSourceConstructor.w, h: itemSourceConstructor.p+itemSourceConstructor.h
		};
	}
	use(entity){
		itemCategories[this.type](entity, this);
	}
	draw(){
		ctx.drawImage(itemGraphics, this.ID*96, 0, 96, 96, this.centralPoint[0] - this.boxCol.w*0.5,
			this.centralPoint[1] - this.boxCol.w,
			this.boxCol.w, this.boxCol.w
		);
	}
	update(){
		this.centralPoint[0] = WorldToScreen1D(this.WorldPos.x, Camera.x, Camera.w/2 - Game.SCREEN_CENTER[0]);
		this.centralPoint[1] = WorldToScreen1D(this.WorldPos.z, Camera.y, Camera.h/2 - Game.SCREEN_CENTER[1]);
		this.boxCol.x += this.velocity.x;
		this.boxCol.z += this.velocity.z;
		this.WorldPos.y += this.velocity.y;
		this.WorldPos.x = this.boxCol.x + this.boxCol.w*0.5;
		this.WorldPos.z = this.boxCol.z + this.boxCol.p*0.5;
		this.shadow.x = this.boxCol.x;
		this.shadow.y = this.boxCol.z + this.boxCol.y;
		this.velocity.z *= this.friction;
		this.velocity.x *= this.friction;
	}
}

class Structure extends Item{
	constructor(structureConstructor, x, y, z){
		super(structureConstructor);
		this.graphCoords = []
	}
}

const itemCategories = {
	centMoney: function(entity, item){
		entity.money.cents += item.value;
		if(entity.money.cents >= 100){
			entity.money.unit++;
			entity.money.cents = 0;
		}
		item.isCollected = true;
	},
	money: function(entity, item){
		entity.money.unit += item.value;
		item.isCollected = true;
	},
	food: function(entity, item){
		entity.hunger += item.value;
		entity.hp += item.value;
	},
	structure: function(entity, item){
		item.value();
	},
	foodGiver: function(entity, item){
		item.value(entity);
	}
}