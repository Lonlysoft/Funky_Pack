
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
		this.currentMap.cleanupItems(Camera);
		this.currentMap.updateVisibleItems(Camera);
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
			Scenery.draw(Game.CurrentCharacter, Game.ItemArr, Game.NPCarr);
			
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
				Game.CurrentCharacter.isSpawn = Game.CurrentCharacter.spawn();
			}
			if(Game.ischaracterMenud){
				GameMomentSav = GameMoment;
				GameMoment = "characterMenu";
			}
			Game.setAndUpdateNPCs();
			Game.setAndUpdateItems();
			Scenery.draw(Game.CurrentCharacter, Game.ItemArr, Game.NPCarr);
			if(Game.onDialog){
				GameMomentSav = GameMoment;
				GameMoment = "dialog"
			}
			Camera.moveTo(Game.CurrentCharacter.WorldPos.x, Game.CurrentCharacter.WorldPos.z, Game.CurrentCharacter.WorldPos.y);
			Ctrl.action(Game.CurrentCharacter, "character");
			Ctrl.stateSave();
			Ctrl.draw(Ctrl.ListProps, Ctrl.Btns, Ctrl.graph);
			Game.CurrentCharacter.update();
			Col.main(Game.CurrentCharacter, Game.currentMap, -1);
			UI.charWinUpdate(Clock, Game.CurrentCharacter);
			if(frame > fps){
				Clock.passTime();
				Game.CurrentCharacter.hunger+=1;
			}
			debug();
		},
		waiter(){
			if(Game.CurrentCharacter == null){
				Game.CurrentCharacter = new Protagonist(Characters.Dynny);
			}
			Waiter.gamePlay(Game.CurrentCharacter);
		},
		dialog: function(){
			Scenery.draw(Game.CurrentCharacter, Game.ItemArr, Game.NPCarr);
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
		}
	}
}

let GameMoment = 0;
let GameMomentSav = 'mainWorld';
let frame = 0
let frameaux = 0

const fps = 50, timeFrequency = 1000/fps;
let INTERVAL_ID;

function GameBonanza(){
	TouchEvent();
	GamePadEvent();
	//
	window.addEventListener("resize", resize);
	resize();
	INTERVAL_ID = setInterval(GamePlay, timeFrequency);
	//GamePlayLoop();
}

const DeviceInfo = {
	isMobile: false,
	orientation: "landscape"
}

document.addEventListener("DOMContentLoaded", function(){
	DeviceInfo.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	if (!DeviceInfo.isMobile)
		Ctrl.canvas.style.display = "none";
		KeyBoardEvent();
})

function GamePlay(){
	try{
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
	} catch (error){
		clearInterval(INTERVAL_ID);
		console.log(error);
		body.innerHTML = error.message;
		/*
		ctx.fillStyle = "#fff";
		ctx.font = "48px serif"
		ctx.fillText(":'/", 20, 48+1*24);
		ctx.font = "24px monospace"
		ctx.fillText(error.message, 20, 30+4*24);
		ctx.font = "24px sans-serif"
		ctx.fillText("game terminated, reload page to reset", 20, 30+5*24);
		*/
		
		
	}
}

function GamePlayLoop(){
	GamePlay();
	window.requestAnimationFrame(GamePlayLoop);
}