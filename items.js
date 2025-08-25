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
	}
}

//constant for assets
const ITEMS = {
	0: {name: "clearItem", description: "enableCredits", value: 0, type: "creditsScene"},
	1: {ID: 1, name: "penny", description: "A singular monetary solution costs $0.01", value: 1, type: "centMoney", usage: "CollectAndUse", ColType: "use", w: Number.parseInt(TILE_SIZE/4), h: Number.parseInt(TILE_SIZE/4), p: Number.parseInt(TILE_SIZE/4)},
	2: {ID: 3, name: "coin", description: "A centural monetary solution costs $1.00", value: 1, type: "money", usage: "CollectAndUse", ColType: "use" , w: Number.parseInt(TILE_SIZE/4), h: Number.parseInt(TILE_SIZE/4), p: Number.parseInt(TILE_SIZE/6)},
	//fruits
	2: {ID: 2, name:"apple", description: "Fresh and gives us the best", value: 2, type: "food", usage: "useLater", ColType: "solidObject", w: Number.parseInt(TILE_SIZE/2),p: Number.parseInt(TILE_SIZE/6), h: Number.parseInt(TILE_SIZE/4)},
	3: {ID: 3, name:"pear", description: "Fresh, but more watery, hunger -10, hp +7", value: 8, type: "food", usage: "useLater", ColType: "solidObject",
w: Number.parseInt(TILE_SIZE/2),p: Number.parseInt(TILE_SIZE/6), h: Number.parseInt(TILE_SIZE/4)},
	4: {ID: 4, name:"block", description: "Completely solid object. I think you can only carry this if you're Nukko", value: 2, type: "food", usage: "useLater", ColType: "solidObject", w: TILE_SIZE, h: TILE_SIZE, p: TILE_SIZE},
	5: {ID: 5, name: ""},
	
	50: {
		ID: 50,
		name: "oven",
		type: "structure",
		value: function(){
			GameMomentSav = GameMoment;
			GameMoment = "cooking";
		},
		description: "get cooking with this one",
		usage: "interact", ColType: "solidObject",
		w: TILE_SIZE, h: TILE_SIZE, p: TILE_SIZE},
};
/*
	{"banana", ""},
	["peach", ""],
	["kiwi", ""],
	["pineapple", ""],
	["orange", ""],
	
	//liquids
	["bottled water", "Clear and cold. The best drink. Period."],
	["super brite", "Effervescent and sweet, all that goes nice with a well prepared popcorn"],
	["sparkling water", "Effervescent and bold, literally water soda."],
	["tea", "Fancy and the finest as always"],
	["coffee", "Lights your energy, smells unique and it's gurgly if your stomach is empty"],
	["energetic", "Boosts energy, soda coffee, but with other taste"],
	["hot cocoa", "Natural fudge for your tummy. Good for the cold days of holidays"],
	["tonic", "For the wealthy ones. 5 stars with a taste of alcohol"],
	["wine", "Fancy for all people, but don't exaggerate."],
	["SECUENDARRY RUSTY BRASS", "Made with real rust. ALLERGENS: May contain dark mold, metal extracts, gluten and milk"]
	
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
	["coke", "Maniac special: use it to get faster for a short period of time (at the cost of HP getting melted)"],
	["ozempic", "It helps losing weight."],
	["weed", "Makes you faster or slower, it's just a matter of choice."],
	
	//non edibles. (are they?)
	["remote control", ""],
	["phone", "The key item for communication, and to meet some vorny guys too"],
	["laptop", ""],
	["gramophone", ""],
	["Dennis Folff disk", ""],
	["??? toy", "Not that he minds"],
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
