var client_width = Math.floor(document.documentElement.clientWidth);
var client_height = Math.floor(document.documentElement.clientHeight);
const body = document.querySelector("body");
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
	client_width = Math.floor(controls_canvas.clientWidth);
	client_height = Math.floor(controls_canvas.clientHeight);
	boundingRect = controls_canvas.getBoundingClientRect();
	aspectRatio = controls_canvas.width/client_width;
	aspectRatioHeight = controls_canvas.height/client_height;
	Ctrl.resize();
	DeviceInfo.orientation = client_width>client_height?"landscape":"portrait";
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
			x:controls_canvas.width - 180,
			y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 14
		},//z 12
		start: {
			x:controls_canvas.width/2 + 10,
			y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 10},//start 13
		
		look: {
			x: 16, y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 8
		}, //L 15
		
		run: {
			ID: 14,
			y: controls_canvas.height/10*0.5,
			x:controls_canvas.width - 90,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true
		},
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
			x:controls_canvas.width - 180,
			y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 12
		},//z 12
		start: {
			x:controls_canvas.width/2 + 10,
			y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 10},//start 13
		
		run: {
			ID: 9,
			y: controls_canvas.height/10*0.5,
			x: controls_canvas.width - 90,
			w: 80, h: CONTROLS_PORT_HEIGHT, show:true
		},
		
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
	ListProps: ["west", "up", "east", "down", "southwest", "southeast", "northeast", "northwest", "B", "Y", "A", "select", "zed", "start", "X", "look", "run"],
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
		
		look: new Btn(ControlsButtons.buttonsLandscapeParameters.look),//L 15
		run: new Btn(ControlsButtons.buttonsPortraitParameters.run)
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
		
		look: new Btn(ControlsButtons.buttonsPortraitParameters.look),//L 15
		run: new Btn(ControlsButtons.buttonsPortraitParameters.run)
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
	ListPropsMainWorld: ["eastWest", "upDown", "diagonals", "B", "A", "Y", "X", "crouch", "run", "select", "start", "zed"],
	ListPropsItemMenu: ["up", "down", "east", "A", "B"],
	ListPropsTitle: ["east", "west", "confirm", "B"],
	ListPropsPause: ["start", "directionals", "confirm", "cancel"],
	
	state: {
		A: false,
		B: false,
		Y: false,
		X: false,
		start: false,
		select: false,
		zed: false,
		run: false,
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
	
	BonanzaMiniGames: {
		
	},
	Bonanza: {
		character: {
			eastWest(entity){
				if(Ctrl.Btns.west.active){//⬅
					entity.dir = "W";
					entity.pol = -1;
					entity[entity.movementFlag]("x");
				}
				else if(Ctrl.Btns.east.active){ //➡
					entity.dir = "E"
					entity.pol = 1;
					entity[entity.movementFlag]("x");
					
				}
				else{
					entity.stop("x");				
				}
			},
			upDown: function(entity){
				if(Ctrl.Btns.up.active){//⬆
					entity.dir = "N";
					entity.pol = -1;
					entity[entity.movementFlag]("z");
				}
				else if(Ctrl.Btns.down.active){//⬇
					entity.dir = "S"
					entity.pol = 1;
					entity[entity.movementFlag]("z");
				}
				else{
					entity.stop("z");
				}
			},
			diagonals(entity){
				if((Ctrl.Btns.west.active && Ctrl.Btns.down.active) || Ctrl.Btns.southwest.active){ //↙
					Ctrl.Btns.west.active = Ctrl.Btns.down.active = true;
					entity.dir = "SW";
					entity.pol = -MAGIC_NORMALIZER;
					entity[entity.movementFlag]("x");
					entity.pol = MAGIC_NORMALIZER;
					entity[entity.movementFlag]("z");
				}
				else if((Ctrl.Btns.down.active && Ctrl.Btns.east.active) || Ctrl.Btns.southeast.active){ //↘
					Ctrl.Btns.east.active = Ctrl.Btns.down.active = true;
					entity.dir = "SE"
					entity.pol = MAGIC_NORMALIZER;
					entity[entity.movementFlag]("x");
					entity.pol = MAGIC_NORMALIZER;
					entity[entity.movementFlag]("z");
				}
				else if((Ctrl.Btns.up.active && Ctrl.Btns.east.active) || Ctrl.Btns.northeast.active){ //↗
					Ctrl.Btns.up.active = Ctrl.Btns.east.active = true;
					entity.dir = "NE"
					entity.pol = MAGIC_NORMALIZER;
					entity[entity.movementFlag]("x");
					entity.pol = -MAGIC_NORMALIZER;
					entity[entity.movementFlag]("z");
				}
				else if((Ctrl.Btns.up.active && Ctrl.Btns.west.active) || Ctrl.Btns.northwest.active){ //↖
					Ctrl.Btns.up.active = Ctrl.Btns.west.active = true;
					entity.dir = "NW"
					entity.pol = -MAGIC_NORMALIZER;
					entity[entity.movementFlag]("x");
					entity.pol = -MAGIC_NORMALIZER;
					entity[entity.movementFlag]("z");
				}
			},
			B(entity){
				if(Ctrl.Btns.B.active && entity.onGround == true && Ctrl.state.B == false /*&& !entity.isSwimming*/){//jumping 
					entity.velocity.y += entity.JPOW;
				}
				else if(!Ctrl.Btns.B.active && !entity.onGround && !entity.jumping && Ctrl.state.B && entity.velocity.y > 0){//jump velocity basics
					entity.velocity.y = 0;
					entity.jumping = true;
				}
				else if(Ctrl.Btns.B.active && Ctrl.state.B == false && entity.isSwimming){ //jumping on water
					entity.velocity.y += entity.JPOW;
				}
			},
			A(entity){
				if(Ctrl.Btns.A.active && Ctrl.state.A == false){
					entity.interact(Game.NPCarr, Game.ItemArr);
				}
			},
			zed(entity){
				
			},
			run(entity){
				if(Ctrl.Btns.run.active){
					entity.movementFlag = "run";
				} else{
					entity.movementFlag = "walk";
				}
					
			},
			Y(entity){
				if(Ctrl.Btns.Y.active && !Ctrl.state.Y){ //Y
					if(!entity.onGround && entity.skillList.includes("dashDive")){
						entity.doSkill("dashDive");
						//entity.atk();
						entity.isSpecialSkilling = true;
					}
					else{
						//entity.atk();
					}
				}
				if((Ctrl.Btns.zed.active /*!Ctrl.state.L*/) && (Ctrl.Btns.Y.active && !Ctrl.state.Y) && entity.holdingObject){
					entity.doSkill("eatAnything");
				}
				if(Ctrl.Btns.Y.active && !Ctrl.state.Y && entity.holdingObject){
					entity.doSkill("putAway");
				}
			},
			X(entity){
				if(Ctrl.Btns.X.active && Ctrl.state.X == false){
					if(entity.skillList.includes("hold") && entity.skillList.includes("release") && !entity.holdingObject){
						entity.doSkill("hold");
					}
					else if(entity.holdingObject){
						entity.doSkill("release");
					}
				}
			},
			crouch(entity){
				if(Ctrl.Btns.look.active && Ctrl.state.L == false){
					if(!entity.onGround && entity.skillList.includes("dashDive")){
						entity.doSkill("dashDive");
						//entity.atk();
					}
					else{
						entity.isCrouching = true;
					}
				}
				if(Ctrl.Btns.look.active){
					if(entity.onGround && entity.skillList.includes("feralMode")){
						entity.feralMode = true;
					}
				}
			},
			select(entity){
				if(Ctrl.Btns.select.active && !Ctrl.state.select){
					
				}
			},
			start(entity){
				if(Ctrl.Btns.start.active && Ctrl.state.start == false){//start
					UI.charWinDismiss();
					UI.characterMenuStart();
					GameMomentSav = GameMoment;
					GameMoment = 'characterMenu';
				}
			},
		}
	},
	
	BonanzaMenu: {
		itemMenu: {
			up(entity){
				if(Ctrl.Btns.up.active && !Ctrl.state.up){//⬆
					if(UI.characterMenuSubmenus.selectedInventoryIndex > 0){
						UI.characterMenuSubmenus.updateItems(UI.characterMenuSubmenus.selectedInventoryIndex);
						UI.characterMenuSubmenus.selectedInventoryIndex--;
					}
				}
			},
			down(entity){
				if(Ctrl.Btns.down.active && !Ctrl.state.down){
					UI.characterMenuSubmenus.updateItems(UI.characterMenuSubmenus.selectedInventoryIndex);
					if(UI.characterMenuSubmenus.selectedInventoryIndex < entity.tail.length-1){
						UI.characterMenuSubmenus.selectedInventoryIndex++;
					}
				}
			},
			east(entity){
				
			},
			A(entity){
				if(Ctrl.Btns.A.active && !Ctrl.state.A){
					if(entity.tail.length == 0){
						return;
					}
					entity.tail[UI.characterMenuSubmenus.selectedInventoryIndex].use(entity);
					let item = entity.tail[UI.characterMenuSubmenus.selectedInventoryIndex];
					entity.tail[UI.characterMenuSubmenus.selectedInventoryIndex] = entity.tail[entity.tail.length-1];
					entity.tail[entity.tail.length-1] = item;
					entity.tail.pop();
					if(UI.characterMenuSubmenus.selectedInventoryIndex >= entity.tail.length){
						UI.characterMenuSubmenus.selectedInventoryIndex = entity.tail.length-1;
					}
				}
			},
			B(entity){
				if(Ctrl.Btns.B.active && !Ctrl.state.B){
					UI.characterMenuItems.layer--;
				}
			}
		},
		
		
		startMenu: {
			west(){
				if(Ctrl.Btns["west"].active && !Ctrl.state.west){
					Game.audio.sfx('select');
					UI.title.optionDOM[1].classList.remove("selected");
					UI.title.selectedOption = 0;
					UI.title.optionDOM[0].classList.add("selected");
				}
			},
			east(){
				if(Ctrl.Btns.east.active && !Ctrl.state.east){ //➡️
					Game.audio.sfx('select');
					UI.title.optionDOM[0].classList.remove("selected");
					UI.title.selectedOption = 1;
					UI.title.optionDOM[1].classList.add("selected");
				}
			},
			confirm(){
				if((Ctrl.Btns.start.active && !Ctrl.state.start) || (Ctrl.Btns.A.active && !Ctrl.state.A)){
					Game.audio.sfx('confirm');
					Game.requestTransition = true;
					Game.buffer = UI.title.options[UI.title.selectedOption];
				}
			},
			B(){}
		},
		loadMenu: {
			west(){
				if(Ctrl.Btns.west.active){
					UI.loadGame.optionDOM[1].classList.remove("selected");
					UI.loadGame.selectedOption = 0;
					UI.loadGame.optionDOM[0].classList.add("selected");
				}
			},
			east(){
				if(Ctrl.Btns.east.active){ //➡️
					UI.loadGame.optionDOM[0].classList.remove("selected");
					UI.loadGame.selectedOption = 1;
					UI.loadGame.optionDOM[1].classList.add("selected");
				}
			},
			confirm(){
				if((Ctrl.Btns.start.active && Ctrl.state.start == false) || (Ctrl.Btns.A.active && Ctrl.state.A == false)){
					Game.requestTransition = true;
					Game.buffer = UI.loadGame.option[UI.loadGame.selectedOption];
				}
			},
			B(){
				if(Ctrl.Btns.B.active && !Ctrl.state.B){
					Game.requestTransition = true;
					Game.buffer = GameMomentSav;
				}
			}
		},
		charMenu: {
			start(){
				if(Ctrl.Btns.start.active && Ctrl.state.start == false){
					UI.characterMenuDismiss();
					GameMoment = GameMomentSav;
				}
			},
			directionals(){
				if(Ctrl.Btns.west.active && !Ctrl.state.west){ //right
					UI.characterMenuItems.elements[UI.characterMenuItems.selectedOption].classList.remove("selected");
					UI.characterMenuItems.selectedOption--;
					if(UI.characterMenuItems.selectedOption<0){
						UI.characterMenuItems.selectedOption = UI.characterMenuItems.optionLength;
					}
					UI.characterMenuItems.alt.innerHTML = UI.characterMenuItems.optionList[UI.characterMenuItems.selectedOption];
					UI.characterMenuItems.elements[UI.characterMenuItems.selectedOption].classList.add("selected");
				}
				if(Ctrl.Btns.east.active && !Ctrl.state.east){ //right
					
					UI.characterMenuItems.elements[UI.characterMenuItems.selectedOption].classList.remove("selected");
					UI.characterMenuItems.selectedOption++;
					if(UI.characterMenuItems.selectedOption>UI.characterMenuItems.optionLength){
						UI.characterMenuItems.selectedOption = 0;
					}
					UI.characterMenuItems.alt.innerHTML = UI.characterMenuItems.optionList[UI.characterMenuItems.selectedOption];
					UI.characterMenuItems.elements[UI.characterMenuItems.selectedOption].classList.add("selected");
					
				}
			},
			confirm(){
				if(Ctrl.Btns.A.active && !Ctrl.state.A){
					UI.characterMenuItems.layer++;
				}
			},
			cancel(){
				if(Ctrl.Btns.B.active && !Ctrl.state.B){
					
				}
			}
		},
		stats: {
			start(){
				return;
			},
			directionals(){
				if(Ctrl.Btns.west.active && !Ctrl.state.west){ //left
					if(UI.jobTable.layer == 0){
						
						UI.jobTable.optionsDOM[UI.jobTable.selectedOption].classList.remove('selected');
						if(UI.jobTable.selectedOption > 0)
							UI.jobTable.selectedOption--;
						UI.jobTable.optionsDOM[UI.jobTable.selectedOption].classList.add('selected');
					}
				}
				else if(Ctrl.Btns.up.active && !Ctrl.state.up){//⬆
					
				}
				else if(Ctrl.Btns.down.active && !Ctrl.state.down){//⬇
					
				}
				else if(Ctrl.Btns.east.active && !Ctrl.state.east){ //right
					if(UI.jobTable.layer == 0){
						UI.jobTable.optionsDOM[UI.jobTable.selectedOption].classList.remove('selected');
						if(UI.jobTable.selectedOption < UI.jobTable.optionsDOM.length-1)
							UI.jobTable.selectedOption++;
						UI.jobTable.optionsDOM[UI.jobTable.selectedOption].classList.add('selected');
					}
				}
			},
			confirm(){
				if(Ctrl.Btns.A.active && Ctrl.state.A == false){
					if(UI.jobTable.layer == 0){
						UI.jobTable.layer++;
						UI.jobTable.optionsFunctions[UI.jobTable.selectedOption]();
					} else if (Schedule.availableJobs.length > 0){
						Schedule.add(Game.CurrentCharacter, Schedule.availableJob(UI.jobTable.selectedJobIndex));
					}
					console.log(UI.jobTable.layer);
				}
			},
			cancel(){
				if(Ctrl.Btns.B.active && Ctrl.state.B == false){
					if(UI.jobTable.layer > 0 && UI.jobTable.selectedOption == 0){
						UI.jobTable.layer--;
						UI.jobTable.removalDOM[UI.jobTable.selectedOption]();
					}
					else{
						UI.characterMenuItems.layer--;
					}
				}
			}
		},
		dialogs: {
			start(){
				return;
			},
			directionals(){
				if(Ctrl.Btns.up.active && !Ctrl.state.up && UI.dialogItems.hasOption){
					UI.dialogItems.optionsDOM[UI.dialogItems.selectedOption].classList.toggle("selected");
					UI.dialogItems.selectedOption--;
					if(UI.dialogItems.selectedOption < 0){
						UI.dialogItems.selectedOption = UI.dialogItems.optionsDOM.length - 1;
					}
					UI.dialogItems.optionsDOM[UI.dialogItems.selectedOption].classList.toggle("selected");
				}
				if(Ctrl.Btns.down.active && !Ctrl.state.down && UI.dialogItems.hasOption){
					UI.dialogItems.optionsDOM[UI.dialogItems.selectedOption].classList.toggle("selected");
					UI.dialogItems.selectedOption++;
					if(UI.dialogItems.selectedOption > UI.dialogItems.optionsDOM.length-1){
						UI.dialogItems.selectedOption = 0;
					}
					UI.dialogItems.optionsDOM[UI.dialogItems.selectedOption].classList.toggle("selected");
				}
			},
			confirm(){
				if(Ctrl.Btns.A.active && Ctrl.state.A == false){
					if(UI.dialogItems.bufferAnimation < UI.dialogItems.object.text.length-1){
						UI.dialogItems.bufferAnimation = UI.dialogItems.object.text.length-1;
					}
					else{
						if(UI.dialogItems.object.next == undefined && !UI.dialogItems.hasOption){
							UI.dialogDismiss();
							Game.onDialog = false;
							UI.dialogItems.bufferAnimation = NaN;
							GameMoment = GameMomentSav;
						}
						else if(UI.dialogItems.object.next == undefined && UI.dialogItems.hasOption){
							UI.dialogItems.bufferAnimation = 0;
							UI.dialogItems.object = Dialogs[UI.dialogItems.object.ID][UI.dialogItems.object.options[UI.dialogItems.selectedOption].next];
							UI.dialogItems.selectedOption = 0;
							UI.dialogItems.hasOption = false;
							UI.dialogItems.hasOptionsLoaded = false;
						}
						else{
							UI.dialogItems.bufferAnimation = 0;
							UI.dialogItems.object = Dialogs[UI.dialogItems.object.ID][UI.dialogItems.object.next];
						}
					}
				}
			},
			cancel(){
				
			}
		}
	},
	
	Moment: {
		start: function(entity){
			for(let i = 0; i < Ctrl.ListPropsTitle.length; i++){
				Ctrl.BonanzaMenu["startMenu"][Ctrl.ListPropsTitle[i]]();
			}
		},
		load: function(entity){
			for(let i = 0; i < Ctrl.ListPropsTitle.length; i++){
				Ctrl.BonanzaMenu["loadMenu"][Ctrl.ListPropsTitle[i]]();
			}
		},
		characterMenu: function(entity){
			for(let i = 0; i < Ctrl.ListPropsPause.length; i++){
				Ctrl.BonanzaMenu["charMenu"][Ctrl.ListPropsPause[i]]();
			}
		},
		
		stats: function(entity){
			for(let i = 0; i < Ctrl.ListPropsPause.length; i++){
				Ctrl.BonanzaMenu["stats"][Ctrl.ListPropsPause[i]]();
			}
		},
		
		"look at": function(entity){
			if(Ctrl.Btns.B.active && !Ctrl.state.B){
				UI.characterMenuItems.layer--;
			}
		},
		
		items: function(entity){
			for(let i = 0; i < Ctrl.ListPropsItemMenu.length; i++){
				Ctrl.BonanzaMenu["itemMenu"][Ctrl.ListPropsItemMenu[i]](entity);
			}
		},
		
		dialogs: function(entity){
			for(let i = 0; i < Ctrl.ListPropsPause.length; i++){
				Ctrl.BonanzaMenu["dialogs"][Ctrl.ListPropsPause[i]]();
			}
		},
		
		character: function(entity){
			for(let i = 0; i < Ctrl.ListPropsMainWorld.length; i++){
				Ctrl.Bonanza["character"][Ctrl.ListPropsMainWorld[i]](entity);
			}
		},
		warning(entity){
			for(let i = 0; i < Ctrl.ListProps.length; i++){
				if(Ctrl.Btns[Ctrl.ListProps[i]].active){
					Game.requestTransition = true;
				}
			}
		}
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
	action(entity, type){
		Ctrl.Moment[type](entity);
	}
}

function TouchEvent(){
	 Ctrl.canvas.addEventListener("touchstart", Ctrl.touchstart, {passive:false});
	 Ctrl.canvas.addEventListener("touchmove", Ctrl.touchmove, {passive:false});
	 Ctrl.canvas.addEventListener("touchend", Ctrl.touchend, {passive:false});
}