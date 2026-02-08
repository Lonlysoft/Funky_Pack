class Table {
	constructor(x, y){
		this.x = x; this.y = y;
		this.isRequested = false;
		this.request = 0;
		this.food = null;
	}
}

const Waiter = {
	info: {
		salary: 357500,
		horary: {
			partTime: {
				mon: [2, 3, 4, 5, 6],
				tue: [2, 3, 4, 5, 6],
				wed: [2, 3, 4, 5, 6],
			},
			fullTime: {
				sun: [2, 3, 4, 5],
				tue: [2, 3, 4, 5],
				wed: [2, 3, 4, 5],
				thu: [5, 6, 7, 8],
				fri: [5, 6, 7, 8],
				sat: [4, 5, 6, 7, 8],
			}
		}
	},
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
	balcons: [],
	presentNPCs: [],
	presentNPCsHavePendingRequests: [],
	plates: [],
	UI: {
		inGameUI: document.querySelector("#dynamicPlacement"),
		here: false,
		DOM: document.createElement('section'),
		noteblock: document.createElement("section"),
		timerDOM: null,
		start(){
			if(!this.here){
				this.DOM.classList.add("flex-row");
				const container = document.createElement("div");
				container.classList.add("timer");
				container.innerHTML = "<h5>timer</h5>";
				this.timer = document.createElement("h3");
				this.timer.innerHTML = Waiter.timer;
				container.appendChild(this.timer);
				this.noteblock.classList.add("pauted");
				this.DOM.appendChild(this.noteblock);
				this.DOM.appendChild(container);
				this.here = true;
			}
		},
		update(){
			if(timeCounter > 1000){
				Waiter.timer--;
				timeCounter = 0;
			}
			this.timer.innerHTML = Waiter.timer;
			//this.noteblock.innerHTML = Waiter.getOrderTexts();
		},
		end(){
			if(this.here){
				this.DOM.remove();
				this.here = false;
			}
		},
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
		this.plates = this.currentMap.updateVisibleItems(Camera, this.plates);
		this.plates = this.currentMap.cleanupItems(Camera, this.plates);
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
		this.UI.end();
		GameMoment = "mainWorld"
	},
	locateBalcons(map){
		for(let i = 0; i < map.height; i++){
			for(let j = 0; j < map.width; j++){
				if(map.items[i][j].ID == 49){
					this.balcons.push(map.items[i][j]);
					this.balcons[this.balcons.length-1].holds = this.FOODS;
				}
			}
		}
	},
	gamePlay(entity){
		if(!Scenery.hasDeclaired){
			Scenery.declair(this, this.levelNumber, WAITER_MAPS);
			this.locateBalcons(this.currentMap);
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
		this.setAndUpdateItems();
		this.events();
		Camera.moveTo(this.player.WorldPos.x, this.player.WorldPos.z, this.player.WorldPos.y);
		this.player.update();
		Col.main(this.player, this.currentMap, this.plates, this.presentNPCs);
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