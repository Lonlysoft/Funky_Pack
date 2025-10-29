
const Game = {
	canvas: canvas,
	ctx: ctx,
	SCREEN_CENTER: [canvas.width*0.5, canvas.height*0.5],
	currentMap: null,
	levelName: "amCity",
	LocationsProps: [null, undefined, "amCity", "Qmart", "nukkoHouse", "houseVariation"],
	CurrentCharacter: null,
	ItemArr: [],
	NPCarr: [],
	TrigArr: [],
	hasLoadedITEMs: false,
	hasLoadedNPCs: false,
	tileSetGraphics: document.getElementById("tilemap"),
	buffer: undefined,
	onDialog: false,
	currentDialogType: 'none',
	storyMoment: 0,
	ischaracterMenud: false,
	placeBuffer: 0,
	requestTransition: true,
	appearScreen: false,
	alpha: 1,
	setAndUpdateTriggers(){
		if(!this.hasLoadedTriggers){
			Col.loadEntities("triggers", this.TrigArr);
		}
		Col.checkEntities(this.TrigArr);
	},
	setAndUpdateItems(){
		this.ItemArr = this.currentMap.cleanupItems(Camera, this.ItemArr);
		this.ItemArr = this.currentMap.updateVisibleItems(Camera, this.ItemArr);
		for(let i = 0; i < this.ItemArr.length; i++){
			this.ItemArr[i].update();
		}
	},
	setAndUpdateNPCs(){
		this.currentMap.cleanupNPCs(Camera, this.NPCarr);
		this.currentMap.updateNPCs(Camera);
		for(let i = 0; i < this.NPCarr.length; i++){
			this.NPCarr[i].update();
		}
	},
	moment: {
		0: function(){
			if(controls_canvas.width >= controls_canvas.height){
				GameMoment = GameMomentSav;
			}
		},
		characterMenu: function(){
			//Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			switch(UI.characterMenuItems.layer){
				case 0: Ctrl.action(Game.CurrentCharacter, "characterMenu");
				UI.characterMenuSubmenus["dismiss" + UI.characterMenuItems.optionList[UI.characterMenuItems.selectedOption] + ""](Game.CurrentCharacter);
					break;
				case 1:
					Ctrl.action(Game.CurrentCharacter, UI.characterMenuItems.optionList[UI.characterMenuItems.selectedOption]);
					UI.characterMenuSubmenus["start" + UI.characterMenuItems.optionList[UI.characterMenuItems.selectedOption] + ""](Game.CurrentCharacter);
				break;
			}
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			Ctrl.stateSave();
			Scenery.draw(Game.currentMap, Game.CurrentCharacter, Game.ItemArr, Game.NPCarr);
			
			Game.ctx.globalAlpha = 0.5;
			Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
			Game.ctx.globalAlpha = 1;
		},
		preTile: function(){
			
		},
		title:function(){
			if(Game.requestTransition && !Game.appearScreen){
				Game.alpha = BG.transition(Game.alpha, "coming", 0.1);
				if(Game.alpha < 0){
					Game.requestTransition = false;
					Game.appearScreen = true;
				}
			}
			UI.titleStart();
			Game.ctx.fillStyle = "#000"
			Game.ctx.fillRect(0,0,Game.canvas.width, Game.canvas.height);
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			Ctrl.action(null, "start");
			Ctrl.stateSave();
			if(Game.requestTransition && Game.appearScreen){
				Game.alpha = BG.transition(Game.alpha, "going", 0.1);
				if(Game.alpha >= 1){
					Game.alpha = 1;
					GameMomentSav = GameMoment;
					GameMoment = Game.buffer;
					Game.appearScreen = false;
					UI.titleDismiss();
				}
			}
		},
		pause: function(){
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			Scenery.draw(Game.CurrentCharacter, Game.currentMap, Game.ItemArr, Game.NPCarr)
			Ctrl.action(null, "pause");
			Ctrl.stateSave();
			Game.ctx.globalAlpha = 0.3;
			Game.ctx.fillStyle = "#000";
			Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
			Game.ctx.globalAlpha = 1;
		},
		selectFunction: function(){
			UI.scheduleStart();
		},
		newGame: function(){
			GameMoment = "mainWorld";
		},
		resultsScreen: function(){
			UI.results[GameMomentSav].start();
			Ctrl.action(Null, "accept");
		},
		mainWorld: function(){
			if(Game.requestTransition && !Game.appearScreen){
				Game.alpha = BG.transition(Game.alpha, "coming", 0.1);
				if(Game.alpha < 0){
					Game.requestTransition = false;
					Game.appearScreen = true;
				}
			}
			UI.charWinStart();
			if(!Scenery.hasDeclaired){
				Scenery.declair(Game, Game.levelName, MAPS);
				Game.CurrentCharacter = new Protagonist(Characters.Dynny);
				Scenery.hasDeclaired = true;
			}
			if(!Game.CurrentCharacter.isSpawn && Scenery.hasDeclaired){
				Game.CurrentCharacter.isSpawn = Game.CurrentCharacter.spawn(Game.currentMap);
			}
			if(Game.ischaracterMenud){
				GameMomentSav = GameMoment;
				GameMoment = "characterMenu";
			}
			Game.setAndUpdateNPCs();
			Game.setAndUpdateItems();
			Scenery.draw(Game.currentMap, Game.CurrentCharacter, Game.ItemArr, Game.NPCarr);
			if(Game.onDialog){
				GameMomentSav = GameMoment;
				GameMoment = "dialog"
			}
			Camera.moveTo(Game.CurrentCharacter.WorldPos.x, Game.CurrentCharacter.WorldPos.z, Game.CurrentCharacter.WorldPos.y);
			Ctrl.action(Game.CurrentCharacter, "character");
			Ctrl.stateSave();
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			Game.CurrentCharacter.update();
			Col.main(Game.CurrentCharacter, Game.currentMap, Game.ItemArr, Game.NPCarr -1);
			UI.charWinUpdate(Clock, Game.CurrentCharacter);
			if(timeCounter>=2000){
				Clock.passTime();
				timeCounter = 0;
			}
			debug();
		},
		cooking(){
			UI.cookingStart();
			Scenery.draw(Game.currentMap, Game.CurrentCharacter, Game.ItemArr, Game.NPCarr);
			Ctrl.action(null, "cooking");
			Ctrl.stateSave();
			Game.ctx.globalAlpha = 0.3;
			Game.ctx.fillStyle = "#000";
			Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
			Game.ctx.globalAlpha = 1;
		},
		waiter(){
			if(Game.CurrentCharacter == null){
				Game.CurrentCharacter = new Protagonist(Characters.Dynny);
			}
			Waiter.gamePlay(Game.CurrentCharacter);
		},
		dialog: function(){
			Scenery.draw(Game.currentMap, Game.CurrentCharacter, Game.ItemArr, Game.NPCarr);
			Ctrl.action(Game.dialogBox, "dialogs");
			Ctrl.stateSave();
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			UI.dialogItems.writeText();
		},
		continueGame: function(){
			if(Game.requestTransition && !Game.appearScreen){
				Game.alpha = BG.transition(Game.alpha, "coming", 0.1);
				if(Game.alpha < 0){
					Game.requestTransition = false;
					Game.appearScreen = true;
				}
			}
			UI.loadStart();
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			
			Ctrl.action(null, "load");
			Ctrl.stateSave();
			Game.ctx.fillStyle = "#000"
			Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
			if(Game.requestTransition && Game.appearScreen){
				Game.alpha = BG.transition(Game.alpha, "going", 0.1);
				if(Game.alpha >= 1){
					Game.alpha = 1;
					GameMomentSav = "title";
					GameMoment = Game.buffer;
					Game.appearScreen = false;
					UI.loadDismiss();
				}
			}
		},
		cookie: () => {
			if(Game.requestTransition && !Game.appearScreen){
				Game.alpha = BG.transition(Game.alpha, "coming", 0.1);
				if(Game.alpha < 0){
					Game.requestTransition = false;
					Game.appearScreen = true;
				}
			}
			let saveDataBriefing = getCookies();
			UI.cookiesStart(saveDataBriefing);
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			//Ctrl.action(null, "loadCookies");
			Ctrl.stateSave();
			
			if(Game.requestTransition && Game.appearScreen){
				Game.alpha = BG.transition(Game.alpha, "going", 0.1);
				if(Game.alpha >= 1){
					Game.alpha = 1;
					GameMomentSav = "title";
					GameMoment = Game.buffer;
					Game.appearScreen = false;
					UI.loadCookiesDismiss();
				}
			}
		},
		sendFile: () => {
			Ctrl.action(this.player, "load");
			Ctrl.stateSave();
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
		}
	}
}

let GameMoment = 0;
let GameMomentSav = 'title';
let frame = 0
let frameaux = 0

let fps = 30, timeFrequency = 1000/fps;
let timeCounter = 0, intervalSav = 0, deltaTime = 0;
let intervalID;

const SideBar = {
	fullDOM: body.querySelector(".fullSideBar"),
	DOM: body.querySelector(".sidebar"),
	isHere: false,
	fullScreenBtn: document.getElementById("fullscreen"),
	musicVolume: document.querySelector("#music-volume"),
	sfxVolume: document.querySelector("#sfx-volume"),
	bringSideBar: document.getElementById("bring-sidebar"),
	blankSpace: document.querySelector(".sidebar-blank-space")
}

function GameBonanza(){
	TouchEvent();
	GamePadEvent();
	const fullScreenBtn = document.getElementById("fullscreen");
	const fullScreenBtnIcon = fullScreenBtn.querySelector("svg");
	SideBar.bringSideBar.addEventListener("click",
		(event)=>{
			SideBar.isHere = !SideBar.isHere;
			if(SideBar.isHere){
				SideBar.fullDOM.classList.remove("notHere");
				setTimeout(()=>{SideBar.DOM.style.bottom = "0"}, 100);
			}else{
				SideBar.fullDOM.classList.add("notHere");
				SideBar.DOM.style.bottom = "-40%"
			}
		}
	);
	SideBar.fullScreenBtn.addEventListener("click",
		(event)=>{
			SideBar.fullScreenBtn.classList.toggle("active");
			if(DeviceInfo.fullScreen){
				fullScreenBtnIcon.viewBox.baseVal.x = 0;
				if(document.exitFullscreen)
					document.exitFullscreen();
				else if(document.webkitExitFullscreen)
					document.webkitExitFullscreen();
				else if(document.msExitFullscreen)
					document.msExitFullscreen();
				else if(document.mozExitFullscreen)
					document.mozExitFullscreen();
			} else {
				fullScreenBtnIcon.viewBox.baseVal.x = 110;
				if(body.requestFullscreen)
					body.requestFullscreen();
				else if(body.webkitRequestFullscreen)
					body.webkitRequestFullscreen();
				else if(body.msRequestFullscreen)
					body.msRequestFullscreen();
				else if(body.mozRequestFullscreen)
					body.mozRequestFullscreen();
			}
			DeviceInfo.fullScreen = !DeviceInfo.fullScreen;
		}
	);
	SideBar.blankSpace.addEventListener("click",
		event => {
			SideBar.DOM.style.bottom = "-40%";
			SideBar.isHere = false;
			setTimeout(()=>{ SideBar.fullDOM.classList.add("notHere") },900);
		}
	);
	window.addEventListener("resize", resize);
	resize();
	//GamePlayLoop();
	//intervalID = setInterval(GamePlayLoop, timeFrequency);
	setTimeout(GamePlayLoop, timeFrequency);
	//window.requestAnimationFrame(GamePlayLoop2);
}

const DeviceInfo = {
	isMobile: false,
	orientation: "landscape",
	fullScreen: false
}

document.addEventListener("DOMContentLoaded", function(){
	DeviceInfo.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	if (!DeviceInfo.isMobile)
		Ctrl.canvas.style.display = "none";
		KeyBoardEvent();
})

function GamePlay(){
	clear(Game.canvas, Game.ctx);
	clear(BG.canvas, BG.ctx);
	clear(Ctrl.canvas, Ctrl.ctx);
	Game.moment[GameMoment]();
	if(frame > fps){
		frame = 0;
	}
	else{
		frame++;
	}
}

function GamePlayLoop(){
	try{
		deltaTime = 1;
		timeCounter += timeFrequency;
		setTimeout(GamePlayLoop, timeFrequency);
		GamePlay();
	} catch (error){
		//clearInterval(intervalID);
		console.log(error);
		body.innerHTML = errorScreen.icon;
		body.innerHTML += errorScreen.text;
		body.innerHTML += error.message;
		body.innerHTML += "<a href = ''><button>reset game</button></a>";
		body.style.color = "var(--bg-color)";
		body.style.display = "flex";
		body.style.flexDirection = "column";
		body.style.justifyContent = "center";
		body.style.alignItems = "flex-start";
		body.style.padding = "20%"
		body.style.boxSizing = "border-box"
		body.style.height = "100vh";
		
	}
}

let timerplay = 0;

function GamePlayLoop2(timestamp){
	try{
		
		timerplay += timestamp
		if(timerplay >= timeFrequency){
			timerplay = 0;
			deltaTime = 1;
			timeCounter += timeFrequency;
			GamePlay();
		}
		window.requestAnimationFrame(GamePlayLoop2)
	} catch (error){
		console.log(error);
		body.innerHTML = errorScreen.icon;
		body.innerHTML += errorScreen.text;
		body.innerHTML += error.message;
		body.innerHTML += "<a href = ''><button>reset game</button></a>";
		body.style.color = "var(--bg-color)";
		body.style.display = "flex";
		body.style.flexDirection = "column";
		body.style.justifyContent = "center";
		body.style.alignItems = "flex-start";
		body.style.padding = "20%"
		body.style.boxSizing = "border-box"
		body.style.height = "100vh";
		
	}
}