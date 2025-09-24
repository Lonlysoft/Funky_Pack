class Table {
	constructor(x, y){
		this.x = x; this.y = y;
		this.isRequested = false;
		this.request = 0;
		this.food = null;
	}
}

const Waiter = {
	player: null,
	day: 0,
	currentMap: null,
	isPlayerThere: false,
	bonusTips: {
		unit: 0, cents: 0
	},
	salary: 357500,
	timerConfig: {max: 200, extra: 100, acrescim: 65},
	timer: 200,
	tablesCoords: [],
	currentMap: null,
	levelNumber: "lv1",
	orders: [],
	FOODS: ["small meal", "large meal", "water", "large water", "fish meal", "barbecue", "salt"],
	presentNPCs: [],
	presentNPCsHavePendingRequests: [],
	plates: [],
	UI: {
		DOM: document.querySelector("#waiterToolBox"),
		noteblock: document.querySelector("#noteblock"),
		update(){
			if(timeCounter > 1000){
				Waiter.timer--;
				timeCounter = 0;
			}
			let waiterTimer = this.DOM.querySelector(".timer h5");
			waiterTimer.innerHTML = Waiter.timer;
		}
	},
	requestTable: function(){
		let tableId = random(0, this.tablesCoords.length-1);
		if(!this.tablesCoords[tableId].isRequested){
			this.tablesCoords[tableId].isRequested = true;
			let food = random(0, this.FOODS.length-1);
			this.tablesCoords[tableId].food = food;
			this.orders.push({id: tableId, food: food, tolerance: random(32, 512)});
		}
	},
	setAndUpdateItems(){
		this.currentMap.updateItems(Camera);
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
		}
	},
	events: function(){
		Ctrl.action(this.player, "character");
		Ctrl.stateSave();
		Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
	},
	end: function(){
		if(Clock.day % 28 == 0){
			this.player.money.add(this.salary);
		}
		this.player.money.add(this.bonusTips.unit);
		this.bonusTips = 0;
		GameMoment = "mainWorld"
	},
	gamePlay(entity){
		if(!Scenery.hasDeclaired){
			Scenery.declair(this, this.levelNumber, WAITER_MAPS);
			this.start(entity);
		}
		if(!this.player.isSpawn && Scenery.hasDeclaired){
			this.player.isSpawn = this.player.spawn(this.currentMap);
			this.setTableID();
		}
		Scenery.draw(this.currentMap, this.player, this.presentNPCs, this.plates);
		if(this.getWinningCondition()){
			this.end();
		}
		this.events();
		Camera.moveTo(this.player.WorldPos.x, this.player.WorldPos.z, this.player.WorldPos.y);
		this.player.update();
		Col.main(this.player, this.currentMap);
		this.UI.update();
		this.requestTable();
		this.debug();
	},
	setTableID(){
		for(let i = 0; i < this.currentMap.itemGrid.length; i++){
			for(let j = 0; j < this.currentMap.itemGrid[i].length; j++){
				if(this.currentMap.itemGrid[i][j] == 1){
					this.tablesCoords.push(new Table(i, j));
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
	},
	waiterUIstart(){
		this.UI.DOM.classList.remove("notHere");
	},
	waiterUIdismiss(){
		this.UI.DOM.classList.add("notHere");
	},
	debug(){
		for(let i = 0; i < this.orders.length; i++){
			Game.ctx.fillText(this.orders[i].id, 200, 100+16*i);
			Game.ctx.fillText(this.orders[i].food, 220, 100+16*i);
			Game.ctx.fillText(this.orders[i].tolerance, 240, 100+16*i);
		}
	}
}