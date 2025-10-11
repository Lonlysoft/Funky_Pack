const UI = {
	titleDOM: document.querySelector(".titleScreen"),
	loadDOM: document.querySelector(".container__saving"),
	charDOM: document.querySelector(".charWin"),
	charWin:{
		clockDOM: [document.querySelector(".GameDate"), document.querySelector(".GameHour")],
		weatherDOM: document.querySelector(".weather_icon"),
		barDOM: document.querySelector(".charWin__HPbar"),
		charName: document.querySelector(".charName"),
		moneyDOM: document.querySelector(".money")
	},
	characterQuickInfoDOM: {
		hpDOM: document.querySelector(".HUD__HPnumber"),
		solitudeDOM: document.querySelector(".HUD__solitude"),
		hungerDOM: document.querySelector(".HUD__hungerBar"),
		update(entity){
			//this.hpDOM.style.width = ("" + transformIntoBar(entity.hp, entity.HP)) + "%";
			this.hungerDOM.style.width = ("" + transformIntoBar(entity.hunger, entity.maxHunger)) + "%";
		}
	},
	charWinUpdate: function(clock, entity){
		let clockHourFormat = clock.getHourSummerSystem();
		this.charWin.clockDOM[0].innerHTML = `${clock.monthList[clock.month]}, ${clock.day}`;
		this.charWin.clockDOM[1].innerHTML = `${(clockHourFormat.hour >= 10) ? clockHourFormat.hour : "0" + (clock.hour +"")}:${(clockHourFormat.minute >= 10) ? clockHourFormat.minute : "0" + (clockHourFormat.minute +" ")}`;
		this.charWin.clockDOM[1].innerHTML += clockHourFormat.late;
		this.charWin.weatherDOM.src = "src/imgs/WeatherIcon__" + Clock.currentWeather + Clock.getBinaryLateness().charAt(0).toUpperCase() + Clock.getBinaryLateness().slice(1) + ".png";
		this.charWin.moneyDOM.innerHTML = "US$" + entity.money.unit + "." + ((entity.money.cents>= 10)? entity.money.cents : "0" + (entity.money.cents + ""));
		this.characterQuickInfoDOM.update(entity);
	},
	characterMenuDOM: document.querySelector(".characterMenu"),
	characterMenuItems:{
		elements: document.querySelectorAll(".it"),
		alt: document.querySelector(".characterMenu .description"),
		optionList: ["items", "look at", "stats"],
		selectedOption: 0,
		optionLength: 2,
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
			if(entity.tail.length == 0){
				this.itemsDOM.innerHTML = "empty inventory"
				return;
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
	dialogDOM: document.querySelector("#dialogs"),
	dialogItems: {
		stackPair: 0,
		bufferAnimation: NaN,
		object: null,
		position: {x: undefined, y: undefined},
		selectedOption: 0,
		optionsDOM: [],
		hasOption: false,
		hasOptionsLoaded: false,
		writeText(){
			if(this.bufferAnimation < this.object.text.length){
				this.bufferAnimation++;
			}
			let stringSplice = "<div class = 'whoTalks'>"+this.object.name+"</div><div class = 'speaking'>";
			let heightSplice = 0;
			for(let i = 0; i < this.bufferAnimation; i++){
				stringSplice += this.object.text[i];
			}

			
			UI.dialogDOM.style.width = "25em";
			heightSplice = Math.ceil(this.object.text.length/25) + 3;
			UI.dialogDOM.style.top = "5%";
			//transformIntoBar(Game.CurrentCharacter.centralPoint[1], Game.canvas.height) + "%";
			UI.dialogDOM.style.left = "5%"
			
			UI.dialogDOM.innerHTML = stringSplice;
			if(this.object.options && this.bufferAnimation >= this.object.text.length-1 && !this.hasOptionsLoaded){
				this.hasOption = true;
				for(let i = 0; i < this.object.options.length; i++){
					this.optionsDOM.push(document.createElement("div"));
					this.optionsDOM[i].textContent = this.object.options[i].text;
					this.optionsDOM[i].setAttribute("class", "dialog-option");
					if(i === 0){
						this.optionsDOM[i].classList.add("selected");
					}
					UI.dialogDOM.insertBefore(this.optionsDOM[i], null);
				}
				this.hasOptionsLoaded = true;
			}
			if(this.object.options && this.bufferAnimation >= this.object.text.length-1){
				for(let i = 0; i < this.object.options.length; i++){
					heightSplice += Math.ceil(this.object.options[i].text.length/25)+1;
					UI.dialogDOM.insertBefore(this.optionsDOM[i], null);
				}
			}
			heightSplice += "em"
			UI.dialogDOM.style.height = heightSplice;
		}
	},
	waiterHud: 0,
	charWindowDOM: document.querySelector(".charWin"),
	milionaire: 0,
	wallCleanerHud: 0,
	jobTable:
	{
		objs: document.querySelectorAll(".selectable"),
		optionX: 0,
		optionY: 0,
		statsBottomMenu: document.querySelector(".schedule_options"),
		layer: 0,
		//layer = 0 -> the cursor is in the bottom menu 
		//layer = 1 -> the cursor controling the schedule
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
	cooking: {
		selectedOption: 0,
		currentLayer: 0,
		
		option: [],
		items: [],
		DOM: document.querySelector(".cooking"),
		toolsDOM: document.querySelector(".cooking__tools"),
	},
	loadCookiesStart(str){
		let save = this.loadCookies.DOM.createElement("div");
		save.innerHTML = str;
	},
	cookingStart(entity){
		//get the cooking tools the object represents.
		//stoves have: oven and the upper part, for testing manners I'll put anything here
		this.cooking.option = ["stove", "oven", "freeze"];
		//so you'll push the 
		this.cooking.DOM.style.display = "flex";
	},
	cookingDismiss(){
		this.loadDOM.style.display = "none";
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
		this.dialogDOM.style.display = "block"
		setTimeout(()=>{this.dialogDOM.style.transform = "scale(1)"}, 304)
	},
	dialogDismiss(){
		this.dialogDOM.style.transform = "scale(0)"
		setTimeout(()=>{
			this.dialogDOM.style.display = "none";
			this.dialogItems.optionsDOM = [];
			this.dialogItems.hasOption = false;
			this.dialogItems.hasOptionsLoaded = false;
		}, 304)
	},
	characterMenuStart(){
		this.characterMenuDOM.style.display = "flex";
	},
	characterMenuDismiss(){
		this.characterMenuDOM.style.display = "none";
	}
}