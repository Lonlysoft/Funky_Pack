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
		w: TILE_SIZE, h: TILE_SIZE, p: TILE_SIZE
	},
	
	100: {
		ID: 100,
		name: "savePoint",
		value: function(){
			GameMomentSav = GameMoment;
			GameMoment = "saving";
		},
		description: "save the game here",
		usage: "interact", ColType: "solidObject",
		w: TILE_SIZE, h: TILE_SIZE, p: TILE_SIZE
	}
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
