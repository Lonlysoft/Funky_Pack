
let timerplay = 0;
let timeGame = 0;
let GameMoment = 0;
let GameMomentSav = 'warningScreen';
//let GameMomentSav = "mainWorld";
let frame = 0
let frameaux = 0
let fps = 30, timeFrequency = 1000/fps;
let timeCounter = 0, deltaTime = 0;

const Game = {
	canvas: canvas,
	ctx: ctx,
	SCREEN_CENTER: [canvas.width*0.5, canvas.height*0.5],
	audio: Music,
	currentMap: null,
	levelName: "testRoom",
	LocationsProps: [],
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
			this.ItemArr[i].setLayer(Game.currentMap);
		}
		this.GrassArr = this.currentMap.updateGrass(Camera, this.GrassArr);
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
			GameMoment = GameMomentSav;
		},
		characterMenu: function(){
			//Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			switch(UI.characterMenu.layer){
				case 0: Ctrl.action(Game.CurrentCharacter, "characterMenu");
				UI.characterMenuSubmenus["dismiss" + UI.characterMenu.optionList[UI.characterMenu.selected] + ""](Game.CurrentCharacter);
					break;
				case 1:
					Ctrl.action(Game.CurrentCharacter, UI.characterMenu.optionList[UI.characterMenu.selected]);
					UI.characterMenuSubmenus["start" + UI.characterMenu.optionList[UI.characterMenu.selected] + ""](Game.CurrentCharacter);
				break;
			}
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			Ctrl.stateSave();
			Scenery.draw(Game.currentMap, Game.CurrentCharacter, Game.ItemArr, Game.NPCarr);
			
			Game.ctx.globalAlpha = 0.5;
			Game.ctx.fillStyle = "#000000"
			Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
			Game.ctx.globalAlpha = 1;
		},
		warningScreen: function(){
			//add a warning screen saying some shit like if you feel nauseated or something like this.
			if(Game.requestTransition && !Game.appearScreen){
				Game.alpha = BG.transition(Game.alpha, "coming", 0.1);
				if(Game.alpha < 0){
					Game.requestTransition = false;
					Game.appearScreen = true;
				}
			}
			ctx.fillStyle = "#000";
			ctx.fillRect(0,0,Game.canvas.width, Game.canvas.height);
			UI.warningScreen.start();
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			Ctrl.action(null, "warning");
			if(Game.requestTransition && Game.appearScreen){
				Game.alpha = BG.transition(Game.alpha, "going", 0.1);
				if(Game.alpha >= 1){
					Game.alpha = 1;
					UI.warningScreen.end();
					GameMomentSav = GameMoment;
					GameMoment = "preTitle";
					Game.appearScreen = false;
				}
			}
		},
		preTitle: function(){
			let lonlysoft = document.getElementById("lonlysoft-logo");
			if(Game.requestTransition && !Game.appearScreen){
				Game.alpha = BG.transition(Game.alpha, "coming", 0.07);
				if(Game.alpha < 0){
					Game.requestTransition = false;
					Game.appearScreen = true;
					timeCounter = 0;
					//Game.audio.play("ident", false);
				}
			}
			ctx.fillStyle = "#000000"
			ctx.fillRect(0,0,Game.canvas.width, Game.canvas.height)
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			ctx.drawImage(lonlysoft, 0, 0, canvas.width, canvas.height)
			if(timeCounter >= 5000){
				Game.requestTransition = true;
			}
			if(Game.requestTransition && Game.appearScreen){
				Game.alpha = BG.transition(Game.alpha, "going", 0.1);
				if(Game.alpha >= 1){
					Game.alpha = 1;
					GameMomentSav = GameMoment;
					GameMoment = "title";
					Game.appearScreen = false;
				}
			}
		},
		title:function(){
			if(Game.requestTransition && !Game.appearScreen){
				Game.alpha = BG.transition(Game.alpha, "coming", 0.1);
				if(Game.alpha < 0){
					Game.requestTransition = false;
					Game.appearScreen = true;
					if(Game.audio.currentMusic !== "title"){
						Game.audio.play('title');
					}
					//Ctrl.canvas.classList.add('notHere');
					BG.canvas.classList.add('notHere');
					
				}
			}
			UI.title.start();
			Game.ctx.fillStyle = "#000"
			Game.ctx.fillRect(0,0,Game.canvas.width, Game.canvas.height);
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			Ctrl.action(null, "start");
			Ctrl.stateSave();
			if(Game.requestTransition && Game.appearScreen){
				BG.canvas.classList.remove('notHere');
				Game.alpha = BG.transition(Game.alpha, "going", 0.1);
				if(Game.alpha >= 1){
					Game.alpha = 1;
					GameMomentSav = GameMoment;
					GameMoment = Game.buffer;
					Game.appearScreen = false;
					UI.title.end();
					//Ctrl.canvas.classList.remove('notHere');
				}
			}
		},
		pause: function(){
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			Scenery.draw(Game.CurrentCharacter, Game.currentMap, Game.ItemArr, Game.NPCarr, Game.GrassArr)
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
					Game.audio.stop();
					Game.requestTransition = false;
					Game.appearScreen = true;
					
				}
			}
			UI.characterHUD.start();
			if(!Scenery.hasDeclaired){
				Scenery.declair(Game, Game.levelName, MAPS);
				Game.CurrentCharacter = new Protagonist(Characters.Dynny);
				Scenery.hasDeclaired = true;
			}
			if(!Game.CurrentCharacter.isSpawn && Scenery.hasDeclaired){
				Game.CurrentCharacter.isSpawn = Game.CurrentCharacter.spawn(Game.currentMap);
				Game.CurrentCharacter.update();
			}
			if(Game.ischaracterMenud){
				GameMomentSav = GameMoment;
				GameMoment = "characterMenu";
			}
			Game.setAndUpdateNPCs();
			Game.setAndUpdateItems();
			Scenery.draw(Game.currentMap, Game.CurrentCharacter, Game.ItemArr, Game.NPCarr, Game.GrassArr);
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
			
			UI.characterHUD.update(Clock, Game.CurrentCharacter);
			if(timeCounter>=2000){
				Clock.passTime();
				timeCounter = 0;
			}
			BG.dayAndNightFilter(Clock.hour);
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
			UI.characterHUD.end();
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
			UI.loadGame.start();
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
					UI.loadGame.end();
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
			
			UI.loadMenu.sendFile.render();
			Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
			
		}
	}
}

const SideBar = {
	fullDOM: body.querySelector(".fullSideBar"),
	DOM: body.querySelector(".sidebar"),
	isHere: false,
	fullScreenBtn: document.getElementById("fullscreen"),
	musicBtn: document.querySelector("#music"),
	musicMuted: false,
	sfxVolume: document.querySelector("#sfx-volume"),
	bringSideBar: document.getElementById("bring-sidebar"),
	blankSpace: document.querySelector(".sidebar-blank-space"),
	musicMeter: document.querySelector(".music-slider .meter"),
	sfxMeter: document.querySelector(".sfx-slider .meter")
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
				setTimeout(()=>{SideBar.DOM.style.opacity = "100%"}, 10);
			}else{
				SideBar.fullDOM.classList.add("notHere");
				
				SideBar.DOM.style.opacity = "0%";
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
	const musicIcon = SideBar.musicBtn.querySelector("svg");
	SideBar.musicBtn.addEventListener("click",
		event => {
			if(!SideBar.musicMuted){
				musicIcon.viewBox.baseVal.x = 100;
				Game.audio.setVolume(0);
				SideBar.musicMuted = true;
				return
			}
			musicIcon.viewBox.baseVal.x = 0;
			Game.audio.setVolume(1);
			SideBar.musicMuted = false;
		}
	);
	SideBar.blankSpace.addEventListener("click",
		event => {
			SideBar.DOM.style.opacity = "0%";
			SideBar.isHere = false;
			setTimeout(()=>{ SideBar.fullDOM.classList.add("notHere") },10);
		}
	);
	
	window.addEventListener("resize", resize);
	resize();
	window.requestAnimationFrame(GamePlayLoop);
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

function GamePlayLoop(timestamp){
	try{
		deltaTime = timestamp - timerplay;
		timerplay = timestamp
		timeCounter += deltaTime;
		timeGame += deltaTime;
		if(timeGame >= timeFrequency){
			deltaTime = 1;
			timeGame = 0;
			GamePlay();
		}
		window.requestAnimationFrame(GamePlayLoop)
	} catch (error){
		Game.audio.stop();
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