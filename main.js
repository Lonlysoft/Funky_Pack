
const Game = {
	canvas: canvas,
	ctx: ctx,
	SCREEN_CENTER: [canvas.width*0.5, canvas.height*0.5],
	currentMap: null,
	CurrentCharacter: null,
	ItemArr: [],
	NPCarr: [],
	tileSetGraphics: document.getElementById("tilemap"),
	buffer: undefined,
	isPaused: false,
	placeBuffer: 0,
	requestTransition: true,
	appearScreen: false,
	alpha: 1,
	moment: {
		
		0: function(){
			if(controls_canvas.width >= controls_canvas.height){
				GameMoment = GameMomentSav;
			}
		},
		pause: function(){
			
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
			Game.ctx.fillRect(0,0,800, 800);
			Ctrl.draw(Ctrl.Btns, Ctrl.graph);
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
		selectFunction: function(){
			UI.scheduleStart();
		},
		wallCleaner: function(){
			Game.CurrentCharacter = Characters[0];
			WallCleaner.start(Game.CurrentCharacter);
			debug();
		},
		newGame: function(){
			GameMoment = "mainWorld";
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
			if(!Scenery.hasDeclair){
				Scenery.declair("amCity");
				CurrentChar = Characters[0];
				Scenery.hasDeclair = true;
			}
			if(Game.isPaused){
				GameMomentSav = GameMoment;
				GameMoment = "pause";
			}
			Scenery.draw(Game.CurrentCharacter, Game.ItemArr, Game.NPCarr);
			Ctrl.stateSave(); 
			Ctrl.action(Game.CurrentCharacter, "character");
			Camera.moveTo(Game.CurrentChararcter.WorldPos.x, Game.CurrentChararcter.WorldPos.z, Game.CurrentChararcter.WorldPos.y);
			Col.main(Game.CurrentCharacter, -1);
			if(frame > fps){
				Clock.passTime();
				UI.charWinUpdate(Clock);
			}
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
			Ctrl.draw(Ctrl.Btns, Ctrl.graph);
			Ctrl.action(null, "load");
			Ctrl.stateSave();
			Game.ctx.fillStyle = "#000"
			Game.ctx.fillRect(0, 0, 800, 800);
			if(Game.requestTransition && Game.appearScreen){
				Game.alpha = BG.transition(Game.alpha, "going", 0.1);
				if(Game.alpha >= 1){
					Game.alpha = 1;
					GameMomentSav = GameMoment;
					GameMoment = Game.buffer;
					Game.appearScreen = false;
					UI.loadDismiss();
				}
			}
		}
	}
}

let GameMoment = 0;
let GameMomentSav = 'title';
let frame = 0
let frameaux = 0

const fps = 60, timeFrequency = 1000/fps;


function clear(context){
	context.clearRect(0, 0, 1000, 1000)
}
function zero(context){
	context.fillStyle = "#000"
	context.fillRect(-1000, -1000, 2000, 2000);
}

function GameBonanza(){
	TouchEvent();
	//KeyBoardEvent();
	window.addEventListener("resize", resize);
	resize();
	setInterval(GamePlay, timeFrequency);
}

function GamePlay(){
	clear(Game.ctx);
	clear(BG.ctx);
	clear(Ctrl.ctx);
	if(GameMoment != 0 && Ctrl.canvas.width < Ctrl.canvas.height){
		GameMomentSav = GameMoment;
		GameMoment = 0;
	}
	Game.moment[GameMoment]();
	if(frame > fps){
		frame = 0;
	}
	else{
		frame++;
	}
}