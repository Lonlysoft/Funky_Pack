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
	timer: 400,
	currentMap: null,
	levelNumber: "lv1",
	orders: [],
	ITEM_ASSETS: {
		1: {
			name: "hamburger Balcon",
			timer: 0,
			timerMax: 8,
			value: function(entity){
				if(this.holds.length > 0){
					entity.hand = this.holds.pop();
				}
				if(entity.hand.name == "patatoSack"){
					this.holds = entity.hand;
					entity.hand = 0;
				}
			},
			timerFunction(){
				this.holds = 0;
			}
		},
		2: {
			name: "fryier",
			timer: 0,
			timerMax: 4,
			value: function(entity){
				if(this.holds.length > 0){
					entity.hand = this.holds.pop();
				}
				if(entity.hand.name == "patatoSack"){
					this.holds = entity.hand;
					entity.hand = 0;
				}
			},
		},
		3: {
			name: "burger stove",
			timer: 0,
			timerMax: 4,
			value: function(entity){
				if(this.holds.length > 0){
					entity.hand = this.holds.pop();
				}
				if(entity.hand.name == "burger"){
					entity.hand = 0;
				}
			}
		}
	},
	FOODS: ["burger", "fries", "meal level 1", "mealLevel2", "meal level 3"],
	recipeOrder: [
		["bread", "lettuce", "burger meat", "cheese", "tomato", "pickle", "bread"],
	],
	presentNPCs: [],
	presentNPCsHavePendingRequests: [],
	items: [],
	UI: {
		inGameUI: document.querySelector("#dynamicPlacement"),
		here: false,
		DOM: document.createElement('section'),
		noteblock: document.createElement("section"),
		timer: null,
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
				this.inGameUI.appendChild(this.DOM);
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
	npcRequest: function(){
		for(let i = 0; this.presentNPCs[i].length; i++){
			if(!this.presentNPCs[i].request){
				this.presentNPCs[i].request = random(0, this.FOODS.length);
			}
		}
	},
	setAndUpdateItems(){
		this.items = this.currentMap.updateVisibleItems(Camera, this.items);
		this.items = this.currentMap.cleanupItems(Camera, this.items);
		for(let i = 0; i < this.items.length; i++){
			this.items[i].update();
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
	buildBurger(){
		
	},
	gamePlay(entity){
		if(!Scenery.hasDeclaired){
			Scenery.declair(this, this.levelNumber, WAITER_MAPS);
			this.start(entity);
			this.UI.start();
		}
		if(!this.player.isSpawn && Scenery.hasDeclaired){
			this.player.isSpawn = this.player.spawn(this.currentMap);
			this.player.update();
		}
		Scenery.draw(this.currentMap, this.player, this.presentNPCs, this.items);
		if(this.getWinningCondition()){
			this.end();
		}
		Camera.moveTo(this.player.WorldPos.x, this.player.WorldPos.z, this.player.WorldPos.y);
		this.setAndUpdateItems();
		this.events();
		this.player.update();
		Col.main(this.player, this.currentMap, this.items, this.presentNPCs);
		
		this.UI.update();
		this.debug();
	},
	getWinningCondition: function(){
		if(this.timer <= 0){
			this.timer = this.timerConfig.max;
			return true;
		}
		return false;
	},
	end(){
		GameMoment = "MainWorld";
	},
	debug(){
		for(let i = 0; i < this.orders.length; i++){
			Game.ctx.fillText(this.orders[i].id, 200, 100+16*i);
			Game.ctx.fillText(this.orders[i].food, 220, 100+16*i);
			Game.ctx.fillText(this.orders[i].tolerance, 240, 100+16*i);
		}
	}
}