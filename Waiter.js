const Waiter = {
	player: null,
	day: 0,
	NPCarr: [],
	isPlayerThere: false,
	bonusTips: {
		unit: 0, cents: 0
	},
	tablesCoords: [],
	currentMap: null,
	levelNumber: "ristorant01",
	orders: [],
	FOODS: ["small meal", "large meal", "water", "large water", "fish meal", "barbecue", "salt"],
	requestTable: function(){
		this.orders.push({id: random_number(0, this.tablesCoords.length), food: random_number(0, this.FOODS.length), tolerance: random_number(32, 512)});
	},
	start: function(entity){
		if(!isPlayerThere){
			player = entity;
			this.setTableID();
		}
	},
	end: function(){
		if(Clock.day % 28 == 0){
			this.player.money += this.salary;
		}
		this.player.money.unit += this.bonusTips.unit;
		this.bonusTips = 0;
		GameMoment = "mainWorld"
	},
	gamePlay(){
		Scenery.declair(this, this.levelNumber, WAITER_MAPS);
		Col.main(player);
	},
	setTableID(){
		for(let i = 0; i < waiter.map.length; i++){
			for(let j = 0; j < waiter.map[i].length; j++){
				if(this.map[i][j] == 1){
					tablesCoords.push([i, j]);
				}
			}
		}
	}
	
}