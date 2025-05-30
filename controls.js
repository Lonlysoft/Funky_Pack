var client_width = Math.floor(document.documentElement.clientWidth);
var client_height = Math.floor(document.documentElement.clientHeight);
var boundingRect = undefined
var aspectRatio = 1;
const CONTROLS_LAND_HEIGHT = 80;
const CONTROLS_PORT_HEIGHT = 40;

class Btn{
	constructor(constructObj){
		this.active = false;
		this.h = constructObj.h;
		this.w = constructObj.w;
		this.x = constructObj.x;
		this.y = constructObj.y;
		this.ID = constructObj.ID;
		this.type = constructObj.show;
		
	}
	hasPoint(x,y){
		if(x < this.x || x > this.x + this.w || y < this.y || y > this.y + this.h){
			return false;
		}
		return true;
	}
}

function resize(){
	client_width = Math.floor(document.documentElement.clientWidth);
	client_height = Math.floor(document.documentElement.clientHeight);
	boundingRect = controls_canvas.getBoundingClientRect();
	aspectRatio = controls_canvas.width/client_width;
	aspectRatioHeight = controls_canvas.height/client_height;
	Ctrl.resize();
}

const ControlsButtons = {
	buttonsLandscapeParameters: {
		west: {
			x: 10,
			y: controls_canvas.height - 160,
			w: 80,
			h: CONTROLS_LAND_HEIGHT,
			show: true,
			ID: 3
		},//⬅
		up: {
			x: 90,
			y: controls_canvas.height- 240,
			w: 80,
			h: CONTROLS_LAND_HEIGHT,
			show: true,
			ID: 0
		},//⬆
		east: {
			x: 170,
			y: controls_canvas.height - 160,
			w: 80,
			h: CONTROLS_LAND_HEIGHT,
			show: true,
			ID: 1
		},//➡ 2
		down: {
			x: 90, y: controls_canvas.height - 80, w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 2
		},//⬇ 3
		
		southwest: {
			x: 10, y: controls_canvas.height - 80, w: 80, h: CONTROLS_LAND_HEIGHT, show: false
		},//↙ 4
		southeast: {
			x: 170, y: controls_canvas.height - 80, w: 80, h: CONTROLS_LAND_HEIGHT, show: false
		},//↘ 5
		northeast: {
			x: 170, y: controls_canvas.height - 240, w: 80, h: CONTROLS_LAND_HEIGHT,
			show: false
		},//↗ 6
		northwest: {
			x: 10, y: controls_canvas.height - 240, w: 80, h: CONTROLS_LAND_HEIGHT, show: false
		},//↖ 7
		//botao
		B: {
			x: controls_canvas.width - 170,
			y: controls_canvas.height-80,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 6
		},//B 8
		Y: {
			x:controls_canvas.width - 250,
			y: controls_canvas.height-160,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 4
		},//Y 9
		A: {
			x:controls_canvas.width - 90,
			y: controls_canvas.height-160,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 5
		},//A 10
		X: {
			x:controls_canvas.width - 170,
			y: controls_canvas.height- 240, 
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 7
		},//x 14
		//triggers
		select: {
			x:controls_canvas.width/2 - 90,
			y: 25, w: CONTROLS_LAND_HEIGHT, h: 80, show: true, ID: 11
		},//select 11
		zed: {
			x:controls_canvas.width - 90,
			y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 9
		},//z 12
		start: {
			x:controls_canvas.width/2 + 10,
			y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 10},//start 13
		
		look: {
			x: 16, y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 8
		}//L 15
	},
	buttonsPortraitParameters: {
		west: {
			x: 10,
			y: controls_canvas.height - CONTROLS_PORT_HEIGHT*2 -20,
			w: 80,
			h: CONTROLS_PORT_HEIGHT,
			show: true,
			ID: 3
		},//⬅
		up: {
			x: 90,
			y: controls_canvas.height- CONTROLS_PORT_HEIGHT*3 -20,
			w: 80,
			h: CONTROLS_PORT_HEIGHT,
			show: true,
			ID: 0
		},//⬆
		east: {
			x: 170,
			y: controls_canvas.height - CONTROLS_PORT_HEIGHT*2 -20,
			w: 80,
			h: CONTROLS_PORT_HEIGHT,
			show: true,
			ID: 1
		},//➡ 2
		down: {
			x: 90, y: controls_canvas.height - CONTROLS_PORT_HEIGHT - 20, w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 2
		},//⬇ 3
		
		southwest: {
			x: 10, y: controls_canvas.height - CONTROLS_PORT_HEIGHT -20, w: 80, h: CONTROLS_PORT_HEIGHT, show: false
		},//↙ 4
		southeast: {
			x: 170, y: controls_canvas.height - CONTROLS_PORT_HEIGHT -20, w: 80, h: CONTROLS_PORT_HEIGHT, show: false
		},//↘ 5
		northeast: {
			x: 170, y: controls_canvas.height - CONTROLS_PORT_HEIGHT*3 -20, w: 80, h: CONTROLS_PORT_HEIGHT,
			show: false
		},//↗ 6
		northwest: {
			x: 10, y: controls_canvas.height - CONTROLS_PORT_HEIGHT*3 -20, w: 80, h: CONTROLS_PORT_HEIGHT, show: false
		},//↖ 7
		//botao
		B: {
			x: controls_canvas.width - 170,
			y: controls_canvas.height - CONTROLS_PORT_HEIGHT -20,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 6
		},//B 8
		Y: {
			x:controls_canvas.width - 250,
			y: controls_canvas.height- CONTROLS_PORT_HEIGHT*2 -20,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 4
		},//Y 9
		A: {
			x:controls_canvas.width - 90,
			y: controls_canvas.height- CONTROLS_PORT_HEIGHT*2 -20,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 5
		},//A 10
		X: {
			x:controls_canvas.width - 170,
			y: controls_canvas.height- CONTROLS_PORT_HEIGHT*3 -20, 
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 7
		},//x 14
		//triggers
		select: {
			x:controls_canvas.width/2 - 90,
			y: 25, w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 11
		},//select 11
		zed: {
			x:controls_canvas.width - 90,
			y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 9
		},//z 12
		start: {
			x:controls_canvas.width/2 + 10,
			y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 10},//start 13
		
		look: {
			x: 16, y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 8
		}//L 15
	}
}

const Ctrl = {
	canvas: controls_canvas,
	ctx: ctrl_ctx,
	draw: function(aditives, buttons, graphic){
		let button, index;
		let onOrOff = 0;
		for (index = aditives.length - 1; index > -1; --index) {
			button = buttons[aditives[index]]
			if(buttons[aditives[index]].type){
				if(buttons[aditives[index]].active){
					onOrOff = 1;
				}
				else{
					onOrOff = 0;
				}
				this.ctx.globalAlpha = 0.5
				this.ctx.drawImage(graphic, button.ID*button.w, onOrOff*button.w, 80, 80, button.x, button.y, button.w, button.h);
				this.ctx.globalAlpha = 1;
			}
		}
	},
	ListProps: ["west", "up", "east", "down", "southwest", "southeast", "northeast", "northwest", "B", "Y", "A", "select", "zed", "start", "X", "look"],
	BtnsLandscape: {
		west: new Btn(ControlsButtons.buttonsLandscapeParameters.west),//⬅ 0
		up: new Btn(ControlsButtons.buttonsLandscapeParameters.up),//⬆ 1
		east: new Btn(ControlsButtons.buttonsLandscapeParameters.east),//➡ 2
		down: new Btn(ControlsButtons.buttonsLandscapeParameters.down),//⬇ 3
		southwest: new Btn(ControlsButtons.buttonsLandscapeParameters.southwest),//↙ 4
		southeast: new Btn(ControlsButtons.buttonsLandscapeParameters.southeast),//↘ 5
		northeast: new Btn(ControlsButtons.buttonsLandscapeParameters.northeast),//↗ 6
		northwest: new Btn(ControlsButtons.buttonsLandscapeParameters.northwest),//↖ 7
		//botao
		B: new Btn(ControlsButtons.buttonsLandscapeParameters.B),//B 8
		Y: new Btn(ControlsButtons.buttonsLandscapeParameters.Y),//Y 9
		A: new Btn(ControlsButtons.buttonsLandscapeParameters.A),//A 10
		X: new Btn(ControlsButtons.buttonsLandscapeParameters.X),//x 14
		//triggers
		select: new Btn(ControlsButtons.buttonsLandscapeParameters.select),//select 11
		zed: new Btn(ControlsButtons.buttonsLandscapeParameters.zed),//z 12
		start: new Btn(ControlsButtons.buttonsLandscapeParameters.start),//start 13
		
		look: new Btn(ControlsButtons.buttonsLandscapeParameters.look)//L 15
	},
	BtnsPortrait: {
		west: new Btn(ControlsButtons.buttonsPortraitParameters.west),//⬅ 0
		up: new Btn(ControlsButtons.buttonsPortraitParameters.up),//⬆ 1
		east: new Btn(ControlsButtons.buttonsPortraitParameters.east),//➡ 2
		down: new Btn(ControlsButtons.buttonsPortraitParameters.down),//⬇ 3
		southwest: new Btn(ControlsButtons.buttonsPortraitParameters.southwest),//↙ 4
		southeast: new Btn(ControlsButtons.buttonsPortraitParameters.southeast),//↘ 5
		northeast: new Btn(ControlsButtons.buttonsPortraitParameters.northeast),//↗ 6
		northwest: new Btn(ControlsButtons.buttonsPortraitParameters.northwest),//↖ 7
		//botao
		B: new Btn(ControlsButtons.buttonsPortraitParameters.B),//B 8
		Y: new Btn(ControlsButtons.buttonsPortraitParameters.Y),//Y 9
		A: new Btn(ControlsButtons.buttonsPortraitParameters.A),//A 10
		X: new Btn(ControlsButtons.buttonsPortraitParameters.X),//x 14
		//triggers
		select: new Btn(ControlsButtons.buttonsPortraitParameters.select),//select 11
		zed: new Btn(ControlsButtons.buttonsPortraitParameters.zed),//z 12
		start: new Btn(ControlsButtons.buttonsPortraitParameters.start),//start 13
		
		look: new Btn(ControlsButtons.buttonsPortraitParameters.look)//L 15
	},
	Btns: undefined,
	//turn every input false
	falsify(){
		if(this.Btns == undefined){
			return;
		}
		for(let i = 0; i < this.ListProps.length; i++){
			this.Btns[this.ListProps[i]].active = false;
		}
	},
	resize(){
		if(client_width < client_height){
			this.falsify();
			this.Btns = this.BtnsPortrait;
		}
		else{
			this.falsify();
			this.Btns = this.BtnsLandscape;
		}
	},
	
	ListProps4WallCleaner: ["eastNwest", "upNdown", "A", "B", "start"],
	ListPropsMainWorld: ["eastWest", "upDown", "diagonals", "B", "A", "Y", "X", "crouch", "select", "start"],
	state: {
		A: false,
		B: false,
		Y: false,
		X: false,
		start: false,
		select: false,
		zed: false,
		up: false,
		down: false,
		east: false,
		west: false
	},
	graph: document.getElementById("CNTRLS"),
	testBtns: function(target_touches){
		let currentBtn, index0, index1, touch;
		
		for(index0 = this.ListProps.length-1; index0 > -1; index0--){
			currentBtn = this.Btns[this.ListProps[index0]];
			currentBtn.active = false;
			
			for(index1 = target_touches.length-1;index1 > -1;index1--){
				touch = target_touches[index1];
				if(currentBtn.hasPoint((touch.clientX - boundingRect.left)*aspectRatio, (touch.clientY - boundingRect.top)*aspectRatioHeight)){
					currentBtn.active = true;
					break;
				}
			}
		}
	},
	
	touchend:function(event) {
		event.preventDefault();
		Ctrl.testBtns(event.targetTouches);
    },

	touchmove:function(event) {
		event.preventDefault();
		Ctrl.testBtns(event.targetTouches);
    },

    touchstart:function(event) {
		event.preventDefault();
		Ctrl.testBtns(event.targetTouches);
	},
	
	Bonanza: {
		wallCleaner: {
			eastNwest: function(argumentEntity){
				if(Ctrl.Btns.west.active){//⬅
					argumentEntity.dir = "NW"
					argumentEntity.pol = -1;
					argumentEntity.walk("x");
				}
				else if(Ctrl.Btns.east.active){ //➡
					argumentEntity.dir = "NE"
					argumentEntity.pol = 1;
					argumentEntity.walk("x");
				}
				else{
					argumentEntity.stopAbsolute("x");
				}
			},
			upNdown: function(argumentEntity){
				if(Ctrl.Btns.up.active){//⬆
					if(!WallCleaner.isControllingStrolling){
						argumentEntity.velocity.z = -10;
						WallCleaner.stroller.y = argumentEntity.boxCol.z;
					}
					else{
						
					}
				}
				else if(Ctrl.Btns.down.active){//⬇
					if(!WallCleaner.isControllingStrolling){
						argumentEntity.velocity.z = 10;
						WallCleaner.stroller.y = argumentEntity.boxCol.z;
					}
					else{
					
					}
				}
				else{ argumentEntity.stopAbsolute("z"); }
			},
			A: function(argumentEntity){
				if(Ctrl.Btns.A.active && Ctrl.state.A == false){ //A interação 
					if(argumentEntity.pol < 0 && WallCleaner.stroller.x == argumentEntity.boxCol.x){
						WallCleaner.isControllingStroller = !WallCleaner.isControllingStroller;
					}
					else{
						WallCleaner.cleaner.x = WorldToGrid(argumentEntity.WorldPos.x, TILE_SIZE);
						WallCleaner.cleaner.y = WorldToGrid(argumentEntity.WorldPos.z - TILE_SIZE, TILE_SIZE);
					}
				}
			},
			B: function(){
				if(Ctrl.Btns.B.active && Ctrl.state.B == false){ //A interação 
					WallCleaner.clean();
				}
			},
			start: function(){
				if(Ctrl.Btns.start.active && Ctrl.state.start == false){//start
					UI.charWinDismiss();
					GameMomentSav = GameMoment;
					GameMoment = 'pause';
				}
			}
		},
		character: {
			eastWest(argumentEntity){
				if(Ctrl.Btns.west.active){//⬅
					argumentEntity.dir = "W";
					argumentEntity.pol = -1;
					argumentEntity.walk("x");
				}
				else if(Ctrl.Btns.east.active){ //➡
					argumentEntity.dir = "E"
					argumentEntity.pol = 1;
					argumentEntity.walk("x");
					
				}
				else{
					argumentEntity.stop("x");				
				}
			},
			upDown: function(argumentEntity){
				if(Ctrl.Btns.up.active){//⬆
					argumentEntity.dir = "N";
					argumentEntity.pol = -1;
					argumentEntity.walk("z");
				}
				else if(Ctrl.Btns.down.active){//⬇
					argumentEntity.dir = "S"
					argumentEntity.pol = 1;
					argumentEntity.walk("z");
				}
				else{
					argumentEntity.stop("z");
				}
			},
			diagonals(argumentEntity){
				if((Ctrl.Btns.west.active && Ctrl.Btns.down.active) || Ctrl.Btns.southwest.active){ //↙
					Ctrl.Btns.west.active = Ctrl.Btns.down.active = true;
					argumentEntity.dir = "SW";
					argumentEntity.pol = -0.7;
					argumentEntity.walk("x");
					argumentEntity.pol = 0.7;
					argumentEntity.walk("z");
				}
				else if((Ctrl.Btns.down.active && Ctrl.Btns.east.active) || Ctrl.Btns.southeast.active){ //↘
					Ctrl.Btns.east.active = Ctrl.Btns.down.active = true;
					argumentEntity.dir = "SE"
					argumentEntity.pol = 0.7;
					argumentEntity.walk("x");
					argumentEntity.pol = 0.7;
					argumentEntity.walk("z");
				}
				else if((Ctrl.Btns.up.active && Ctrl.Btns.east.active) || Ctrl.Btns.northeast.active){ //↗
					Ctrl.Btns.up.active = Ctrl.Btns.east.active = true;
					argumentEntity.dir = "NE"
					argumentEntity.pol = 0.7;
					argumentEntity.walk("x");
					argumentEntity.pol = -0.7;
					argumentEntity.walk("z");
				}
				else if((Ctrl.Btns.up.active && Ctrl.Btns.west.active) || Ctrl.Btns.northwest.active){ //↖
					Ctrl.Btns.up.active = Ctrl.Btns.west.active = true;
					argumentEntity.dir = "NW"
					argumentEntity.pol = -0.7;
					argumentEntity.walk("x");
					argumentEntity.pol = -0.7;
					argumentEntity.walk("z");
				}
			},
			B(argumentEntity){
				if(Ctrl.Btns.B.active && argumentEntity.onGround == true && Ctrl.state.B == false /*&& !argumentEntity.isSwimming*/){//jumping 
					argumentEntity.velocity.y += argumentEntity.JPOW;
				}
				else if(!Ctrl.Btns.B.active && !argumentEntity.onGround && !argumentEntity.jumping && Ctrl.state.B){//jump velocity basics
					argumentEntity.velocity.y = 0;
					argumentEntity.jumping = true;
				}
				else if(Ctrl.Btns.B.active && Ctrl.state.B == false && argumentEntity.isSwimming){ //jumping on water
					argumentEntity.velocity.y += argumentEntity.JPOW;
				}
			},
			A(argumentEntity){
				if(Ctrl.Btns.A.active && Ctrl.state.A == false){ //A interação
					argumentEntity.interact(Game.NPCarr);
				}
			},
			Y(argumentEntity){
				if(Ctrl.Btns.Y.active){ //Y
					if(!argumentEntity.onGround && argumentEntity.skillList.includes("dashDive")){
						argumentEntity.doSkill("dashDive");
						//argumentEntity.atk();
					}
					else{
						//argumentEntity.atk();
					}
				}
			},
			X(argumentEntity){
				if(Ctrl.Btns.X.active && Ctrl.state.X == false){
					if(argumentEntity.skillList.includes("hold") && argumentEntity.skillList.includes("release")){
						argumentEntity.doSkill("hold");
					}
				}
			},
			crouch(argumentEntity){
				if(Ctrl.Btns.look.active && Ctrl.state.L == false){
					if(!argumentEntity.onGround && argumentEntity.skills.includes("dashDive")){
						argumentEntity.doSkill("dashDive");
						argumentEntity.atk();
					}
				}
			},
			select(argumentEntity){
				if(Ctrl.Btns.select.active && !Ctrl.state.select){
					UI.charWinDismiss();
					UI.characterMenuStart();
					GameMomentSav = GameMoment;
					GameMoment = 'characterMenu';
				}
			},
			start(argumentEntity){
				if(Ctrl.Btns.start.active && Ctrl.state.start == false){//start
					UI.charWinDismiss();
					GameMomentSav = GameMoment;
					GameMoment = 'pause';
				}
			}
		}
	},
	Moment: {
		start: function(argumentEntity){
			if(Ctrl.Btns["west"].active){
				UI.title.optionDOM[1].classList.remove("selected");
				UI.title.selectedOption = 0;
				UI.title.optionDOM[0].classList.add("selected");
			}
			if(Ctrl.Btns.east.active){ //➡️
				UI.title.optionDOM[0].classList.remove("selected");
				UI.title.selectedOption = 1;
				UI.title.optionDOM[1].classList.add("selected");
			}
			if((Ctrl.Btns.start.active && Ctrl.state.start == false) || (Ctrl.Btns.A.active && Ctrl.state.A == false)){
				Game.requestTransition = true;
				Game.buffer = UI.title.options[UI.title.selectedOption];
			}
		},
		load: function(argumentEntity){
			if(Ctrl.Btns.west.active){
				UI.loadGame.optionDOM[1].classList.remove("selected");
				UI.loadGame.selectedOption = 0;
				UI.loadGame.optionDOM[0].classList.add("selected");
			}
			if(Ctrl.Btns.east.active){ //➡️
				UI.loadGame.optionDOM[0].classList.remove("selected");
				UI.loadGame.selectedOption = 1;
				UI.loadGame.optionDOM[1].classList.add("selected");
			}
			if((Ctrl.Btns.start.active && Ctrl.state.start == false) || (Ctrl.Btns.A.active && Ctrl.state.A == false)){
				Game.requestTransition = true;
				Game.buffer = UI.loadGame.options[UI.title.selectedOption];
			}
			if(Ctrl.Btns.B.active && !Ctrl.state.B){
				Game.requestTransition = true;
				Game.buffer = GameMomentSav;
			}
		},
		characterMenu: function(argumentEntity){
			if(Ctrl.Btns.select.active && Ctrl.state.select == false){
				UI.characterMenuDismiss();
				GameMoment = GameMomentSav;
			}
			
			if(Ctrl.Btns.west.active && !Ctrl.state.west){ //right
				UI.characterMenuItems[UI.characterMenuItems.selectedOption].classList.remove("selected");
				UI.characterMenuItems.selectedOption++;
				if(UI.characterMenuItems.selectedOption>UI.characterMenuItems.optionLength){
					UI.characterMenuItems.selectedOption = 0;
				}
				UI.characterMenuItems.alt.innerHTML = UI.characterMenuItems.optionList[UI.characterMenuItems.selectedOption];
				UI.characterMenuItems[UI.characterMenuItems.selectedOption].classList.add("selected");
				
			}
			if(Ctrl.Btns.east.active && !Ctrl.state.east){ //right
				UI.characterMenuItems[UI.characterMenuItems.selectedOption].classList.remove("selected");
				UI.characterMenuItems.selectedOption--;
				if(UI.characterMenuItems.selectedOption<0){
					UI.characterMenuItems.selectedOption = UI.characterMenuItems.optionLength;
				}
				UI.characterMenuItems.alt.innerHTML = UI.characterMenuItems.optionList[UI.characterMenuItems.selectedOption];
				UI.characterMenuItems[UI.characterMenuItems.selectedOption].classList.add("selected");
			}
			if(Ctrl.Btns.A.active && Ctrl.state.A == false){
				UI.characterMenuItems.layer++;
				
			}
			if(Ctrl.Btns.A.active && Ctrl.state.B == false){
				
			}
			
		},
		
		stats: function(argumentEntity){
			UI.scheduleStart();
			if(Ctrl.Btns.west.active && !Ctrl.state.west){ //right
				
			}
			else if(Ctrl.Btns.up.active && !Ctrl.state.up){//⬆
				
			}
			else if(Ctrl.Btns.down.active && !Ctrl.state.down){//⬇
				
			}
			if(Ctrl.Btns.west.active && !Ctrl.state.east){ //left
				
			}
			if(Ctrl.Btns.A.active && Ctrl.state.A == false){
				
			}
			if(Ctrl.Btns.B.active && Ctrl.state.B == false){
				UI.characterMenuItems.layer--;
			}
		},
		
		dialogs: function(argumentEntity){
			if(Ctrl.Btns.A.active && Ctrl.state.A == false){
				//Game.dialogBox.buffer++;
				//if(Game.dialogBox.buffer == undefined){
					UI.dialogDismiss();
					Game.onDialog = false;
					UI.dialogItems.bufferAnimation = NaN;
					GameMoment = GameMomentSav;
				//}
			}
			
		},
		
		character: function(argumentEntity){
			for(let i = 0; i < Ctrl.ListPropsMainWorld.length; i++){
				Ctrl.Bonanza["character"][Ctrl.ListPropsMainWorld[i]](argumentEntity);
			}
		},
		pause: function(){
			if(Ctrl.Btns.start.active && !Ctrl.state.start){
				GameMoment = GameMomentSav;
			}
		},//pause action End
		wallCleaner: function(argumentEntity){
			for(let i = 0; i < Ctrl.ListProps4WallCleaner.length; i++){
				Ctrl.Bonanza["wallCleaner"][Ctrl.ListProps4WallCleaner[i]](argumentEntity);
			}
		}//wallcleaner action end
	},
	stateSave(){
		Ctrl.state.up = Ctrl.Btns.up.active;
		Ctrl.state.down = Ctrl.Btns.down.active;
		Ctrl.state.west = Ctrl.Btns.west.active;
		Ctrl.state.east = Ctrl.Btns.east.active;
		Ctrl.state.A = Ctrl.Btns.A.active;
		Ctrl.state.B = Ctrl.Btns.B.active;
		Ctrl.state.Y = Ctrl.Btns.Y.active;
		Ctrl.state.start = Ctrl.Btns.start.active;
		Ctrl.state.select = Ctrl.Btns.select.active;
		Ctrl.state.zed = Ctrl.Btns.zed.active;
		Ctrl.state.L = Ctrl.Btns.look.active;
		Ctrl.state.X = Ctrl.Btns.X.active;
	},
	action(argumentEntity, type){
		let contanter = 0
		//pre-config
		Ctrl.Moment[type](argumentEntity);
	}
}

function TouchEvent(){
	 Ctrl.canvas.addEventListener("touchstart", Ctrl.touchstart, {passive:false});
	 Ctrl.canvas.addEventListener("touchmove", Ctrl.touchmove, {passive:false});
	 Ctrl.canvas.addEventListener("touchend", Ctrl.touchend, {passive:false});
}