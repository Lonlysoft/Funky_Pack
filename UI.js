const UI = {
	titleDOM: document.querySelector(".titleScreen"),
	loadDOM: document.querySelector(".container__saving"),
	charDOM: document.querySelector(".charWin"),
	charWin:{
		clockDOM: document.querySelector(".GameDate"),
		weatherDOM: document.querySelector(".weather_icon"),
		barDOM: document.querySelector(".charWin__HPbar"),
		charName: document.querySelector(".charName"),
		moneyDOM: document.querySelector(".money")
	},
	characterQuickInfoDOM: {
		hpDOM: document.querySelector(".HUD__lifeBar"),
		solitudeDOM: document.querySelector(".HUD__solitude"),
		hungerDOM: document.querySelector(".HUD__hungerBar"),
		update(entity){
			this.hpDOM.style.width = ("" + transformIntoBar(entity.hp, entity.HP)) + "%";
			this.hungerDOM.style.width = ("" + transformIntoBar(entity.hunger, entity.maxHunger)) + "%";
		}
	},
	charWinUpdate: function(clock, entity){
		let clockHourFormat = clock.getHourSummerSystem();
		this.charWin.clockDOM.innerHTML = `${clock.monthList[clock.month]}, ${clock.day} - ${(clockHourFormat.hour >= 10) ? clockHourFormat.hour : "0" + (clock.hour +"")}:${(clockHourFormat.minute >= 10) ? clockHourFormat.minute : "0" + (clockHourFormat.minute +" ")}`;
		this.charWin.clockDOM.innerHTML += clockHourFormat.late;
		this.charWin.weatherDOM.src = "src/imgs/WeatherIcon__" + Clock.currentWeather + Clock.getBinaryLateness().charAt(0).toUpperCase() + Clock.getBinaryLateness().slice(1) + ".png";
		this.charWin.moneyDOM.innerHTML = "US$" + entity.money.unit + "." + ((entity.money.cents>= 10)? entity.money.cents : "0" + (entity.money.cents + ""));
		this.characterQuickInfoDOM.update(entity);
	},
	characterMenuDOM: document.querySelector(".characterMenu"),
	characterMenuItems:{
		0: document.querySelector(".characterMenu__talkTo"),
		1: document.querySelector(".characterMenu__item"),
		2: document.querySelector(".characterMenu__look"),
		3: document.querySelector(".characterMenu__stats"),
		alt: document.querySelector(".characterMenu .description"),
		optionList: ["talk to", "items", "look at", "stats"],
		selectedOption: 0,
		optionLength: 3,
		layer: 0
	},
	characterMenuSubmenus: {
		statsDOM: document.querySelector(".extraStats"),
		itemsDOM: document.querySelector(".bags"),
		isVisible: false,
		inventoryEach: null,
		selectedInventoryIndex: 0,
		startitems(entity){
			this.itemsDOM.style.display = "flex"
			this.itemsDOM.innerHTML = "";
			let finalString = "";
			for(let i = 0; i < entity.tail.length; i++){
				if(entity.tail[i] != undefined)
					finalString += "<div class = 'bags__item'>" + entity.tail[i].name + "</div>";
				else 
					finalString += "<div class = 'bags__item'> -- </div>";
			}
			this.itemsDOM.innerHTML = finalString;
			this.inventoryEach = this.itemsDOM.querySelectorAll(".bags__item");
			if(entity.tail.length > 0){
				this.inventoryEach[this.selectedInventoryIndex].classList.add("selected");
			}
		},
		updateItems(oldIndex){
			if(this.inventoryEach != null){
				this.inventoryEach[oldIndex].classList.remove("selected");
				this.inventoryEach[this.selectedInventoryIndex].classList.add("selected");
			}
		},
		dismissitems(){
			this.itemsDOM.innerHTML = "";
			this.itemsDOM.style.display = "none";
		},
		startstats(entity){
			UI.scheduleStart();
		},
		"starttalk to": function(entity){
			return;
		},
		"dismisstalk to": function(entity){
			return;
		},
		"startlook at": function (entity){
			return;
		},
		"dismisslook at": function(entity){
			return;
		},
		dismissstats(entity){
			UI.scheduleDismiss();
		}
	},
	pauseDOM: document.querySelector(".pause"),
	jobTableDOM: document.querySelector(".schedule"),
	dialogDOM: document.querySelector(".dialogs"),
	dialogItems: {
		stackPair: 0,
		bufferAnimation: NaN,
		hasOption: false,
		object: null,
		position: {x: undefined, y: undefined},
		selectedOption: 0,
		writeText(){
			if(this.bufferAnimation < this.object.text.length){
				this.bufferAnimation++;
			}
			let stringSplice = "<div class = 'whoTalks'>"+this.object.name+"</div><div class = 'speaking'>";
			for(let i = 0; i < this.bufferAnimation; i++){
				stringSplice += this.object.text[i];
			}
			stringSplice += "</div><div class='next-symbol'></div>"
			UI.dialogDOM.style.width = "25em";
			UI.dialogDOM.style.height = Math.ceil(this.object.text.length/25) + 2 + "em";
			UI.dialogDOM.style.top = "25%"; //transformIntoBar(Game.CurrentCharacter.centralPoint[1], Game.canvas.height) + "%"
			UI.dialogDOM.style.left = "25%"
			UI.dialogDOM.innerHTML = stringSplice;
		}
	},
	statsBottomMenu: document.querySelector(".schedule_options"),
	waiterHud: 0,
	charWindowDOM: document.querySelector(".charWin"),
	milionaire: 0,
	wallCleanerHud: 0,
	jobTableDOM_options:
	{
		objs: document.querySelectorAll(".selectable"),
		optionX: 0,
		optionY: 0
	},
	title: {
		selectedOption: 0,
		options: ["newGame", "continueGame"],
		optionDOM: [document.querySelector(".new"), document.querySelector(".continue")]
	},
	loadGame: {
		selectedOption: 0,
		option: ["cookie", "sendFile"],
		optionDOM: [document.querySelector(".Cookies"), document.querySelector(".SendAFile")]
	},
	loadCookies:{
		selectedOption: 0,
		option: ["noFile"],
		DOM: document.querySelector(".loadByCookie"),
	},
	loadCookiesStart(str){
		let save = this.loadCookies.DOM.createElement("div");
		save.innerHTML = str;
	},
	titleStart(){
		this.titleDOM.style.display = "flex";
	},
	titleDismiss(){
		this.titleDOM.style.display = "none";
	},
	loadStart(){
		this.loadDOM.style.display = "flex";
	},
	loadDismiss(){
		this.loadDOM.style.display = "none";
	},
	charWinStart(){
		this.charDOM.style.display = "flex";
	},
	charWinDismiss(){
		this.charDOM.style.display = "none";
	},
	scheduleStart(){
		this.jobTableDOM.style.display = "grid";
	},
	scheduleDismiss(){
		this.jobTableDOM.style.display = "none";
	},
	dialogStart(){
		this.dialogDOM.style.display = "flex"
		this.dialogDOM.style.transform = "scale(1)"
	},
	dialogDismiss(){
		this.dialogDOM.style.transform = "scale(0)"
		this.dialogDOM.style.display = "none"
	},
	characterMenuStart(){
		this.characterMenuDOM.style.display = "flex";
	},
	characterMenuDismiss(){
		this.characterMenuDOM.style.display = "none";
	}
}