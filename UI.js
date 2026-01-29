const UI = {
	inGameUI: body.querySelector("#dynamicPlacement"),
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
			this.hungerDOM.style.width = ("" + transformIntoBar(entity.hunger, entity.maxHunger)) + "%";
		}
	},
	charWinUpdate: function(clock, entity){
		let clockHourFormat = clock.getHourSummerSystem();
		this.charWin.clockDOM[0].innerHTML = `${clock.monthList[clock.month]}, ${clock.day}`;
		this.charWin.clockDOM[1].innerHTML = `${(clockHourFormat.hour >= 10) ? clockHourFormat.hour : "0" + (clockHourFormat.hour +"")}:${(clockHourFormat.minute >= 10) ? clockHourFormat.minute : "0" + (clockHourFormat.minute +" ")}`;
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
		statsDOM: null,
		itemsDOM: document.querySelector(".bags"),
		jobTableDOM: null,
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
				this.itemsDOM.innerHTML = "empty inventory";
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
			if(!this.hasLoadedCharacterMenuUI){
				this.jobTableDOM = document.createElement("section");
				//this.jobTableDOM.classList.add('flat');
				const dayThings = ["dawn", "early morning", "morning", "day", "noon", "afternoon", "evening", "night", "midnight"];
				const week = ['week', 'sun', "mon", "tue", "wed", 'thu', 'fri', 'sat'];
				const table = document.createElement('table');
				table.classList.add('schedule');
				
				for(let i = 0; i < dayThings.length; i++){
					const tr = document.createElement("tr");
					for(let j = 0; j < week.length; j++){
						const td = document.createElement('td');
						if(j == 0)
							td.innerHTML = dayThings[i];
						if(i == 0)
							td.innerHTML = week[j];
						tr.appendChild(td);
					}
					table.appendChild(tr);
				}
				this.jobTableDOM.appendChild(table);
				const toolBar = document.createElement('div');
				toolBar.classList.add('flex-row');
				toolBar.classList.add('absolute');
				toolBar.classList.add('bottom');
				let option = [];
				for(let i = 0; i < 3; i++){
					option.push(document.createElement('div'));
					option[i].classList.add('schedule_option');
					option[i].innerHTML = UI.jobTable.options[i];
					if(i == 0){
						option[i].classList.add('selected');
					}
					toolBar.appendChild(option[i]);
				}
				UI.jobTable.optionsDOM = option;
				this.jobTableDOM.appendChild(toolBar);
				UI.inGameUI.appendChild(this.jobTableDOM);
				this.hasLoadedCharacterMenuUI = true;
			}
		},
		"starttalk to": function(entity){
			return;
		},
		"dismisstalk to": function(entity){
			return;
		},
		hasLoadedCharacterMenuUI: false,
		"startlook at": function (entity){
			if(!this.hasLoadedCharacterMenuUI){
				this.statsDOM = document.createElement('section');
				this.statsDOM.classList.add('flat');
				this.statsDOM.classList.add('statusWindow');
				this.statsDOM.classList.add('flex-row');
				this.statsDOM.classList.add('absolute');
				const dynnyImage = document.createElement('img');
				dynnyImage.src = "src/imgs/dynnyImage.png";
				const status = document.createElement('div');
				let finalStr = "<h2>"+entity.name+" status</h2><ul>"
				const info = ["hp: ", "hunger: ", "jobs: ", "stamina: "]
				for(let i = 0; i < info.length; i++){
					finalStr += "<li>"+info[i] + entity[info[i]] + "</li>"
				}
				finalStr += "</ul>"
				status.innerHTML = finalStr;
				this.statsDOM.appendChild(dynnyImage);
				this.statsDOM.appendChild(status);
				UI.inGameUI.appendChild(this.statsDOM);
				this.hasLoadedCharacterMenuUI = true;
			}
		},
		"dismisslook at": function(entity){
			if(this.statsDOM)
				this.statsDOM.remove();
			this.statsDOM = null;
			this.hasLoadedCharacterMenuUI = false;
			return;
		},
		dismissstats(entity){
			if(this.jobTableDOM)
				this.jobTableDOM.remove();
			this.jobTableDOM = null;
			this.hasLoadedCharacterMenuUI = false;
		}
	},
	pauseDOM: document.querySelector(".pause"),
	jobTable:
	{
		layer: 0, //define if you're controlling the toolbar, or the schedule table
		selectedOption: 0,
		options: ["add job", "remove job", "go with figurines"],
		selectedJobIndex: 0,
		optionsDOM: null,
		jobListDOM: null,
		openAvailableJobsList(){
			if(!this.jobListDOM){
				const jobDOM = document.createElement('section');
				jobDOM.classList.add('flex-column');
				jobDOM.classList.add('flat');
				const listDOM = [];
				for(let i = 0; i < Schedule.availableJobs.length; i++){
					const newElement = document.createElement('section');
					newElement.classList.add('job');
					listDOM.push(newElement);
					jobDOM.appendChild(listDOM[i]);
				}
				if(listDOM.length <= 0){
					jobDOM.innerHTML = "There's no jobs to apply"
				}
			}
			UI.inGameUI.appendChild(jobDOM);
		},
		closeAvailableJobsList(){
			if(this.jobListDOM){
				this.jobListDOM.remove();
				this.jobListDOM = null;
			}
		},
		optionsFunctions: {
			0: function(){
				UI.jobTable.openAvailableJobsList();
			},
			1: function(){
				
			}
		}
		//layer = 0 -> the cursor is in the bottom menu 
		//layer = 1 -> the cursor controling the schedule
	},
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
			let stringSplice = "<div class = 'whoTalks comic'>"+this.object.name+"</div><div class = 'speaking comic'>";
			let heightSplice = 0;
			for(let i = 0; i < this.bufferAnimation; i++){
				stringSplice += this.object.text[i];
			}
			UI.dialogDOM.style.width = "70%";
			heightSplice = Math.ceil(this.object.text.length/25) + 3;
			UI.dialogDOM.style.top = "5%";
			UI.dialogDOM.style.right = "5%";
			stringSplice += "</div>"
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
	title: {
		DOM: document.querySelector(".titleScreen"),
		selectedOption: 0,
		options: ["newGame", "continueGame"],
		optionDOM: [document.querySelector(".new"), document.querySelector(".continue")],
		start(){
			this.DOM.style.display = "flex";
		},
		dismiss(){
			this.DOM.style.display = "none";
		},
	},
	
	loadGame: {
		selectedOption: 0,
		option: ["cookie", "sendFile"],
		optionDOM: [document.querySelector(".Cookies"), document.querySelector(".SendAFile")]
	},
	loadMenu:{
		option: ["load", "cancel"],
		saveStream: null,
		DOM: null,
		readSaveFile(event){
			let save = document.createElement('section');
			this.saveStream = readFile(event);
			if(this.DOM){
				save.innerHTML = saveStream.header;
				this.DOM.appendChild(save);
			}
		},
		hasRendered: false,
		sendFile: {
			render(){
				if(!this.hasRendered){
					this.DOM = document.createElement("section");
					this.DOM.classList.add('flex-column');
					this.DOM.classList.add('absolute');
					this.DOM.classList.add('centered');
					let fileSend = document.createElement('input');
					fileSend.type = "file"
					fileSend.placeholder = "your saved save here";
					fileSend.classList.add("files");
					fileSend.addEventListener("change", UI.loadMenu.readSaveFile);
					this.DOM.appendChild(fileSend);
					Ctrl.canvas.style.display = "none";
					BG.canvas.style.display = "none";
					UI.inGameUI.appendChild(this.DOM);
					this.hasRendered = true;
				}
				
			}
		}
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
	},
	warningScreen: {
		isHere: false,
		message: "<h1>WARNING!</h1>",
		text: "<p>This game is still in its initial state, please be aware of bugs and random crashes.</p><p>... anyway</p>",
		command: "<h2 class = 'blink-anim'>press any BUTTON to continue</h2>",
		element: null,
		start(){
			if(!this.isHere){
				this.element = document.createElement('section');
				this.element.classList.add('warning-screen');
				this.element.innerHTML = this.message + this.text + this.command;
				UI.inGameUI.appendChild(this.element);
				this.isHere = true;
			}
		},
		end(){
			if(this.element)
				this.element.remove();
			this.element = null;
			this.isHere = false;
		}
	}
}