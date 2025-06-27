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
		itemCategories[this.category](entity);
	}
	draw(){
		ctx.drawImage(itemGraphics, this.ID*96, 0, 96, 96, this.centralPoint[0] - this.boxCol.w*0.5,
			this.centralPoint[1] - this.boxCol.h,
			this.boxCol.w, this.boxCol.w
		);
	}
	update(){
		//Col.handleShadowCoords(this);
		this.centralPoint[0] = WorldToScreen1D(this.WorldPos.x, Camera.x, Camera.w/2 - Game.SCREEN_CENTER[0]);
		this.centralPoint[1] = WorldToScreen1D(this.WorldPos.z, Camera.y, Camera.h/2 - Game.SCREEN_CENTER[1]);
		this.boxCol.x += this.velocity.x;
		this.boxCol.z += this.velocity.z;
		this.WorldPos.y += this.velocity.y;
		this.WorldPos.x = this.boxCol.x + this.boxCol.w*0.5;
		this.WorldPos.z = this.boxCol.z + this.boxCol.p*0.5;
		this.shadow.x = this.boxCol.x;
		this.shadow.y = this.boxCol.z + this.boxCol.y;
		//this.velocity.z *= this.friction;
		//this.velocity.x *= this.friction;
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
	
}

//constant for assets
const ITEMS = [
	{name: "clearItem", description: "enableCredits", value: 0, type: "creditsScene"},
	{ID: 1, name: "penny", description: "a singular monetary solution costs $0.01", value: 1, type: "centMoney", usage: "CollectAndUse", ColType: "use", w: Number.parseInt(TILE_SIZE/4), h: Number.parseInt(TILE_SIZE/4), p: Number.parseInt(TILE_SIZE/4)},
	{ID: 3, name: "coin", description: "a centural monetary solution costs $1.00", value: 1, type: "money", usage: "CollectAndUse", ColType: "use" , w: Number.parseInt(TILE_SIZE/4), h: Number.parseInt(TILE_SIZE/4), p: Number.parseInt(TILE_SIZE/6)},
	//fruits
	{ID: 2, name:"apple", description: "freah as ever give us the best", value: 2, type: "food", usage: "useLater", ColType: "solidObject", w: Number.parseInt(TILE_SIZE/2),p: Number.parseInt(TILE_SIZE/4), h: Number.parseInt(TILE_SIZE/4)},
	{ID: 4, name:"block", description: "completely solid object. I think you can only carry this if you're Nukko", value: 2, type: "food", usage: "useLater", ColType: "solidObject", w: TILE_SIZE, h: TILE_SIZE, p: TILE_SIZE},
];
/*
	{"banana", ""},
	["peach", ""],
	["kiwi", ""],
	["pineapple", ""],
	["orange", ""],
	
	//liquids
	["bottled water", "clear and Cold. the best drink. period."],
	["super brite", "efervescent and sweet, all that goes nice with a well prepared popcorn"],
	["sparkling water", "effervescent and bold, literally water soda."],
	["tea", "fancy and finest as always"],
	["coffee", "lights your energy, smells unique and gurgly if your stomach's empty"],
	["energetic", "boosts energy, soda coffee, but with other taste"],
	["hot cocoa", "natural fudge for your tummy. good for the Cold days of holidays"],
	["tonic", "for the wealthy ones. 5 stars with a taste of alcohol"],
	["wine", "fancy for all people, don't exaggerate."],
	["SECUENDARRY RUSTY BRASS", "made with real rust. ALLERGICS: may contain dark mold, extrats of metal, gluten and milk"]
	
	//healthies
	["salad", ""],
	["special salad", ""],
	["tomato", ""],
	["lettuce", ""],
	["tunip", ""],
	
	//junkies
	["star fudge", ""],
	["slop fudge", ""],
	["meat", ""],
	["boned meat", ""],
	["pink slime meat", ""],
	["burger", ""],
	["pizza", ""],
	["fries", ""],
	["cookie package", ""]
	
	//drugs 
	["coke", "maniac special: use it to get faster for a short period of time (HP gets melted)"],
	["ozempic", "lose weight."],
	["weed", "slowdown or fasten up. just a matter of choice."],
	
	//non edibles. (are they?)
	["remote control", ""],
	["phone", "key item for communication. and meeting some vorny guys too"],
	["laptop", ""],
	["gramophone", ""],
	["Dennis Folff disk", ""],
	["??? toy", "not that he minds"],
	["newspaper", ""],
	
	//tools 
	["hammer", ""],
	["hoe", ""],
	["axe", ""],
	["bat", ""],
	["stick", ""],
	
	//furniture
	["closet", ""],
	["television", ""],
	["cabinet", ""],
	["bed", ""],
	["fridge", ""],
	["oven", ""],
	["stove", ""],
	["lamp", ""],
	["flower vase", ""],
	
	//vehicle 
	[10820, "car", "", "solidVehicle", (TILE_SIZE*2)-10, TILE_SIZE*0.7, (TILE_SIZE*4)-10],
	[18966, "bmw", "", "solid", (TILE_SIZE*2)-10, TILE_SIZE*0.7, (TILE_SIZE*4)-10],
	[20000, "NUKKO RV", "it's his RV, Nukko's home.", (TILE_SIZE*2)-10, (TILE_SIZE*2)-4, (TILE_SIZE*6)-10],
	[4500, "mercedes", "", (TILE_SIZE*2)-10, TILE_SIZE*0.7, (TILE_SIZE*4)-10],
	[6000, "TAXI", "", (TILE_SIZE*2)-10, TILE_SIZE*0.7, (TILE_SIZE*4)-10],
	[23455, "BUS", "", (TILE_SIZE*2)-10, TILE_SIZE*0.7, (TILE_SIZE*8)-10],
	[3000000, "BLACK LIMO", "", (TILE_SIZE*2)-10, TILE_SIZE*0.7, (TILE_SIZE*10)-10],
	[45499, "Ambulance", "", (TILE_SIZE*2)-10, (TILE_SIZE*2)-4, (TILE_SIZE*4)-10],
	[4345445, "food Truck", "", "solidVehicle", (TILE_SIZE*2)-10, (TILE_SIZE*2)-4, (TILE_SIZE*6)-10]
]
*/