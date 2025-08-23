const Waiter = {
	player: null,
	day: 0,
	presentNPCs: [],
	currentMap: null,
	isPlayerThere: false,
	bonusTips: {
		unit: 0, cents: 0
	},
	timerConfig: {max: 200, extra: 100, acrescim: 65},
	timer: 200,
	tablesCoords: [],
	currentMap: null,
	levelNumber: "lv1",
	orders: [],
	FOODS: ["small meal", "large meal", "water", "large water", "fish meal", "barbecue", "salt"],
	presentNPCs: [],
	presentNPCsHavePendingRequests: [],
	requestTable: function(){
		this.orders.push({id: random_number(0, this.tablesCoords.length), food: random_number(0, this.FOODS.length), tolerance: random_number(32, 512)});
	},
	setAndUpdateItems(){
		for(let i = 0; i < this.plates.length; i++){
			this.plates[i].update();
		}
	},
	setAndUpdateNPCs(){
		this.currentMap.cleanupNPCs(Camera, this.presentNPCs);
		this.currentMap.updateNPCs(Camera);
		for(let i = 0; i < this.presentNPCs.length; i++){
			this.presentNPCs[i].update();
		}
	},
	start: function(entity){
		if(!this.isPlayerThere){
			this.player = entity;
			//this.setTableID();
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
	gamePlay(entity){
		if(!Scenery.hasDeclaired){
			Scenery.declair(this, this.levelNumber, WAITER_MAPS);
			this.start(entity);
		}
		Scenery.draw(Game.CurrentCharacter, Game.ItemArr, Game.NPCarr);
		if(this.getWinningCondition()){
			this.end();
		}
		Col.main(player);
	},
	setTableID(){
		for(let i = 0; i < this.currentMap.itemGrid.length; i++){
			for(let j = 0; j < this.currentMap.itemGrid[i].length; j++){
				if(this.map[i][j] == 1){
					tablesCoords.push([i, j]);
				}
			}
		}
	},
	getWinningCondition: function(){
		if(this.timer < 0){
			this.timer = this.timerConfig.max;
			return true;
		}
		return false;
	}
	
}