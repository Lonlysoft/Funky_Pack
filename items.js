class Item{
	constructor(ID, value, name, description, type, colType, w, h, p, x, z, y){
		this.boxCol = new Box(x, y + h, z, w, h, p);
		this.ID = ID;
		this.isCollected = false;
		this.pontoCentral = new Array(2)
		this.velocity = {x: 0, y: 0, z: 0};
		this.friction = 0.9;
		this.equiv = colType;
		this.layer = 0;
		this.sublayer = 0;
		this.type = type;
		this.value = value;
		this.isSpawn = true;
		this.visivel = false;
		this.shadow = {
			x: x, y: y+z, w: w, h: p+h
		};
	}
	desenhar(){
		ctx.fillStyle = "#ff" + this.ID;
		ctx.fillRect(this.pontoCentral[0],
			this.pontoCentral[1],
			this.boxCol.w, this.boxCol.p
		);
	}
	update(){
		col.handleShadowCoords(this);
		this.pontoCentral[0] = WorldToScreen1D(this.boxCol.x, Camera.x, Camera.w/2 - CentroDaTela[0]);
		this.pontoCentral[1] = WorldToScreen1D(this.boxCol.z - this.boxCol.y, Camera.y, Camera.h/2 - CentroDaTela[1]);
		this.boxCol.x += this.velocity.x;
		this.boxCol.z += this.velocity.z;
		this.shadow.x = this.boxCol.x;
		this.shadow.y = this.boxCol.z + this.boxCol.y;
		//this.velocity.z *= this.friction;
		//this.velocity.x *= this.friction;
	}
}

function handleItems(itemArray){
	let estruturasBox;
	let trocador;
	let cameraBox = [Camera.x, Camera.y, Camera.w, Camera.h];
	for(let i = 0; i < itemArray.length; i++){
		if(itemArray[i] == undefined){
			itemArray[i].splice(i, i);
		}
		itemArray[i].update();
		estruturasBox = [itemArray[i].shadow.x, itemArray[i].shadow.y, itemArray[i].shadow.w, itemArray[i].shadow.h]
		if(!col.AABB(estruturasBox, cameraBox) || itemArray[i].visivel == false){
			itemArray[i].visivel = false;
			trocador = itemArray[itemArray.length-1];
			itemArray[itemArray.length-1] = itemArray[i];
			itemArray[i] = trocador;
			itemArray.pop();
		}
	}
	let x_grid = Math.floor((Camera.x)/60);
	let x_endGrid = Math.floor((Camera.x+Camera.w)/60);
	let y_grid = Math.floor((Camera.y)/60)-Math.floor((Camera.y)/60);
	let y_endGrid = Math.floor((Camera.y+Camera.h)/60)-Math.floor((Camera.y)/60);
	
	if(x_grid < 0) x_grid = 0;
	if(y_grid < 0) y_grid = 0;
	if(x_endGrid > Game.currentMap.largura) x_endGrid = Game.currentMap.largura;
	if(y_endGrid > Game.currentMap.altura) y_endGrid = Game.currentMap.altura;
	
	for(let i = y_grid; i < y_endGrid; i++){
		for(let j = x_grid; j < x_endGrid; j++){
			if(Game.currentMap.items[i][j] != 0 && !Game.currentMap.items[i][j].visivel && !Game.currentMap.items[i][j].isCollected){
				itemArray.push(Game.currentMap.items[i][j]);
				Game.currentMap.items[i][j].visivel = true;
			}
		}
	}
}


//constant for assets
const ITEMS = [
	//fruits
	["apple", ""],
	["banana", ""],
	["peach", ""],
	["kiwi", ""],
	["pineapple", ""],
	["orange", ""],
	
	//liquids
	["bottled water", "clear and cold. the best drink. period."],
	["super brite", "efervescent and sweet, all that goes nice with a well prepared popcorn"],
	["sparkling water", "effervescent and bold, literally water soda."],
	["tea", "fancy and finest as always"],
	["coffee", ""],
	["energetic", "boosts energy, soda coffee, but with other taste"],
	["hot cocoa", "natural fudge for your tummy. good for the cold days of holidays"],
	["tonic", "for the wealthy ones. 5 stars with a taste of alcohol"],
	["wine", ""],
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
	["sex toy", ""],
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