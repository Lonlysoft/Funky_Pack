const UI = {
	inGameUI: body.querySelector("#dynamicPlacement"),
	characterHUD: {
		isHere: false,
		quickStats: null,
		clockDOM: [], //respectively date, hour
		weatherDOM: null,
		charName: null,
		moneyDOM: null,
		hungerDOM: null,
		start(){
			if(!this.isHere){
				const fullContainer = document.createElement('main');
				fullContainer.classList.add('quickstats');
				fullContainer.classList.add('absolute');
				
				this.weatherDOM = document.createElement('img');
				this.weatherDOM.classList.add('weather_icon');
				this.weatherDOM.classList.add('icon');
				fullContainer.appendChild(this.weatherDOM);
				
				const dateContainer = document.createElement('section');
				dateContainer.classList.add('flex-column');
				this.clockDOM = [];
				this.clockDOM.push(document.createElement('div'));
				this.clockDOM.push(document.createElement('div'));
				this.clockDOM[0].classList.add('gameDate');
				this.clockDOM[1].classList.add('gameHour');
				
				dateContainer.appendChild(this.clockDOM[0]);
				dateContainer.appendChild(this.clockDOM[1]);
				fullContainer.appendChild(dateContainer);
				
				const moneyHungerContainer = document.createElement('div');
				moneyHungerContainer.classList.add('flex-column');
				const hungerBar = document.createElement('div');
				hungerBar.classList.add('horizontal-bar');
				hungerBar.classList.add('hunger-bar');
				
				this.hungerDOM = document.createElement('div');
				this.hungerDOM.classList.add('HUD__hungerBar');
				hungerBar.appendChild(this.hungerDOM);
				this.moneyDOM = document.createElement('div');
				this.moneyDOM.classList.add('money');
				moneyHungerContainer.appendChild(hungerBar);
				moneyHungerContainer.appendChild(this.moneyDOM);
				fullContainer.appendChild(moneyHungerContainer);
				this.quickstats = fullContainer;
				UI.inGameUI.appendChild(this.quickstats);
				this.isHere = true;
				return;
			}
			
		},
		update(clock, entity){
			if(!this.isHere){
				return;
			}
			this.hungerDOM.style.width = ("" + transformIntoBar(entity.hunger, entity.maxHunger)) + "%";
			const clockHourFormat = clock.getHourSummerSystem();
			this.clockDOM[0].innerHTML = `${clock.monthList[clock.month]}, ${clock.day}`;
			this.clockDOM[1].innerHTML = `${(clockHourFormat.hour >= 10) ? clockHourFormat.hour : "0" + (clockHourFormat.hour +"")}:${(clockHourFormat.minute >= 10) ? clockHourFormat.minute : "0" + (clockHourFormat.minute +" ")}`;
			this.weatherDOM.src = "src/imgs/WeatherIcon__" + clock.currentWeather + clock.getBinaryLateness().charAt(0).toUpperCase() + clock.getBinaryLateness().slice(1) + ".png";
			this.moneyDOM.innerHTML = "US$" + entity.money.unit + "." + ((entity.money.cents>= 10)? entity.money.cents : "0" + (entity.money.cents + ""));
		},
		end(){
			if(this.isHere){
				this.quickstats.remove();
				this.isHere = false;
			}
		}
	},
	charMenuManager: {
		stack: [],
		currentName: null,
		current(){
			return this.stack[this.stack.length-1];
		},
		push(menuObj){
			if(this.current()){
				
				//this.current().end();
				//we can actually blur that, but not now;
			}
			this.stack.push(menuObj);
			this.currentName = menuObj.name;
			menuObj.start(Game.CurrentCharacter);
		},
		pop(){
			const dropped = this.stack.pop();
			if(dropped){
				dropped.end();
			}
			if(this.current()){
				this.current().start(Game.CurrentCharacter);
				this.currentName = this.current().name;
				//might implement unblur here
			}
			
		},
		update(){
			const active = this.current();
			if(active && active.update){
				active.update();
			}
		}
	},
	characterMenu: {
		here: false,
		name: "characterMenu",
		DOM: document.createElement("section"),
		elements: null,
		optionList: ["items", "stats", "schedule"],
		optionImageryTitle: ["item", "check", "stats"],
		altText: document.createElement("aside"),
		selected: 0,
		length: 2,
		start(){
			if(!this.here){
				this.elements = [];
				for(let i = 0; i < this.optionList.length; i++){
					this.elements.push(document.createElement("div"));
					const img = document.createElement("img");
					img.classList.add("icon-menu");
					img.src = "src/imgs/CharacterMenuIcon_" + this.optionImageryTitle[i] + ".png";
					this.elements[i].classList.add("it");
					this.elements[i].appendChild(img);
					this.DOM.appendChild(this.elements[i]);
				}
				this.altText.innerHTML = "items"
				this.elements[0].classList.add("selected");
				this.DOM.classList.add("characterMenu");
				this.DOM.classList.add("absolute");
				this.altText.classList.add("description");
				this.DOM.appendChild(this.altText);
				UI.inGameUI.appendChild(this.DOM);
				this.here = true;
			}
		},
		end(){
			if(this.here){
				for(let i = 0; i < this.optionList.length; i++){
					this.elements[i].remove();
				}
				this.elements = null;
				this.DOM.remove();
				this.here = false;
			}
		},
		submenus: {
			isVisible: false,
			selectedInventoryIndex: 0,
			items: {
				name: "itemMenu",
				itemsDOM: document.querySelector(".bags"),
				inventoryEach: null,
				index: 0,
				start(entity){
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
				update(){
					if(this.inventoryEach != null){
						this.inventoryEach[this.index].classList.remove("selected");
						this.inventoryEach[this.selectedInventoryIndex].classList.add("selected");
					}
				},
				end(){
					this.itemsDOM.innerHTML = "";
					this.itemsDOM.style.display = "none";
				}
			},
			schedule: {
				name: "schedule",
				here: false,
				selectedOption: 0,
				options: ["add job", "remove job", "go with figurines"],
				jobTableDOM: null,
				start(entity){
					if(!this.here){
						this.jobTableDOM = document.createElement("section");
						//this.jobTableDOM.classList.add('flat');
						const dayThings = ["late night", "dawn", "morning", "afternoon", "night"];
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
									
								if(i < 0 && j < 0){
									td.innerHTML = Schedule.matrix[week[i]];
								}
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
				end(){
					if(this.jobTableDOM)
						this.jobTableDOM.remove();
					this.jobTableDOM = null;
					this.here = false;
				}
			},
			stats: {
				name: "stats",
				here: false,
				start(entity){
					if(!this.here){
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
				end(){
					if(this.statsDOM)
						this.statsDOM.remove();
					this.statsDOM = null;
					this.here = false;
					return;
				}
			}
		}
	},
	jobTableJobList: {
		listIndex: 0,
		name: "scheduleList",
		optionsDOM: null,
		jobListDOM: null,
		isListHere: false,
		start(){
			if(!this.isListHere){
				const jobDOM = document.createElement('section');
				jobDOM.classList.add('flex-column');
				jobDOM.classList.add('flat');
				const listDOM = [];
				for(let i = 0; i < Schedule.availableJobs.length; i++){
					const newElement = document.createElement('section');
					newElement.classList.add('job');
					newElement.innerHTML = Schedule.availableJobs[i].name;
					listDOM.push(newElement);
					jobDOM.appendChild(listDOM[i]);
				}
				if(listDOM.length <= 0){
					jobDOM.innerHTML = "There's no jobs to apply"
				}
				this.jobListDOM = jobDOM;
				UI.inGameUI.appendChild(this.jobListDOM);
				this.isListHere = true;
			}
		},
		end(){
			if(this.isListHere){
				this.jobListDOM.remove();
				this.jobListDOM = null;
				this.isListHere = false;
			}
		}
	},
	jobTableAdd: {
		
	},
	jobTableDelete: {
		
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
	title: {
		DOM: document.createElement('div'),
		selectedOption: 0,
		options: ["newGame", "continueGame"],
		optionsText: ["new game", "continue"],
		titleImagery: null,
		optionDOM: [],
		optionDOMhere: false,
		start(){
			if(!this.optionDOMhere){
				this.titleImagery = document.createElement('img');
				this.titleImagery.alt = "title_screen_image";
				this.titleImagery.src = "src/imgs/TitleLogo.png";
				for(let i = 0; i < this.options.length; i++){
					this.optionDOM.push(document.createElement('button'));
					this.optionDOM[i].innerHTML = this.optionsText[i];
					this.optionDOM[i].addEventListener("click", ()=>{
						this.selectedOption = i;
						Game.audio.sfx('confirm');
						Game.requestTransition = true;
						Game.buffer = this.options[this.selectedOption];
					});
					this.optionDOM[i].addEventListener("hover", ()=>{
						Game.audio.sfx('select');
						for(let j = 0; j < this.options.length; j++){
							this.optionDOM[i].classList.remove("selected")
						}
						this.optionDOM[i].classList.add("selected");
					});
					this.optionDOM[i].classList.add('titleCommand');
					this.DOM.classList.add('titleOptions');
					this.DOM.classList.add('flex-row');
					this.DOM.appendChild(this.optionDOM[i]);
				}
				UI.inGameUI.classList.add('titleScreen');
				UI.inGameUI.appendChild(this.titleImagery);
				UI.inGameUI.appendChild(this.DOM);
				this.optionDOMhere = true;
				this.optionDOM[this.selectedOption].classList.add('selected');
			}
		},
		end(){
			if(this.optionDOMhere){
				for(let i = 0; i < this.options.length; i++){
					this.optionDOMhere = false;
					this.optionDOM[i].remove();
					this.titleImagery.remove();
				}
				UI.inGameUI.classList.remove('titleScreen');
				this.optionDOM = [];
			}
			
		},
	},
	
	loadGame: {
		container: document.createElement('section'),
		selectedOption: 0,
		option: ["cookie", "sendFile"],
		optionDOM: [],
		isOptionDOMhere: false,
		optionText: ["Continue by cookies", "Continue by a file"],
		start(){
			if(!this.isOptionDOMhere){
				this.container.classList.add("container__saving");
				
				this.container.classList.add("flex-row");
				for(let i = 0; i < this.option.length; i++){
					this.optionDOM.push(document.createElement('button'));
					this.optionDOM[i].innerHTML = this.optionText[i];
					
					this.container.appendChild(this.optionDOM[i]);
				}
				this.isOptionDOMhere = true;
				UI.inGameUI.appendChild(this.container);
			}
		},
		end(){
			if(this.isOptionDOMhere){
				this.container.remove();
				this.isOptionDOMhere = false;
			}
		}
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
	warningScreen: {
		isHere: false,
		message: "<h1>WARNING!</h1>",
		text: "<p>this game is still unfinished reach for landing page for more information</p>",
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