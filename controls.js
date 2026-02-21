var client_width = Math.floor(document.documentElement.clientWidth);
var client_height = Math.floor(document.documentElement.clientHeight);
const body = document.querySelector("body");
var boundingRect = undefined
var aspectRatio = 1;

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
	
	Bonanza: {
		character: {
			props: ["eastWest", "upDown", "diagonals", "B", "A", "Y", "X", "crouch", "run", "select", "start", "zed"],
			eastWest(entity){
				if(Ctrl.Btns.west.active){//⬅
					entity.dir = "W";
					directions.walk[entity.dir](entity);
				}
				else if(Ctrl.Btns.east.active){ //➡
					entity.dir = "E"
					directions.walk[entity.dir](entity);
				}
				else{
					entity.stop("x");				
				}
			},
			upDown: function(entity){
				if(Ctrl.Btns.up.active){//⬆
					entity.dir = "N";
					directions.walk[entity.dir](entity);
				}
				else if(Ctrl.Btns.down.active){//⬇
					entity.dir = "S"
					directions.walk[entity.dir](entity);
				}
				else{
					entity.stop("z");
				}
			},
			diagonals(entity){
				if((Ctrl.Btns.west.active && Ctrl.Btns.down.active) || Ctrl.Btns.southwest.active){ //↙
					Ctrl.Btns.west.active = Ctrl.Btns.down.active = true;
					entity.dir = "SW";
					directions.walk[entity.dir](entity);
				}
				else if((Ctrl.Btns.down.active && Ctrl.Btns.east.active) || Ctrl.Btns.southeast.active){ //↘
					Ctrl.Btns.east.active = Ctrl.Btns.down.active = true;
					entity.dir = "SE"
					directions.walk[entity.dir](entity);
				}
				else if((Ctrl.Btns.up.active && Ctrl.Btns.east.active) || Ctrl.Btns.northeast.active){ //↗
					Ctrl.Btns.up.active = Ctrl.Btns.east.active = true;
					entity.dir = "NE"
					directions.walk[entity.dir](entity);
				}
				else if((Ctrl.Btns.up.active && Ctrl.Btns.west.active) || Ctrl.Btns.northwest.active){ //↖
					Ctrl.Btns.up.active = Ctrl.Btns.west.active = true;
					entity.dir = "NW"
					
					directions.walk[entity.dir](entity);
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
				entity.isCrouching = false;
				if(Ctrl.Btns.look.active){
					
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
					UI.characterHUD.end();
					UI.charMenuManager.push(UI.characterMenu);
					GameMomentSav = GameMoment;
					GameMoment = 'characterMenu';
				}
			},
		},
		
		characterMenu: {
			props: ["start", "directionals", "confirm", "cancel"],
			start(){
				if(Ctrl.Btns.start.active && Ctrl.state.start == false){
					UI.charMenuManager.pop();
					GameMoment = GameMomentSav;
				}
			},
			directionals(){
				if(Ctrl.Btns.west.active && !Ctrl.state.west){ //left
					UI.characterMenu.elements[UI.characterMenu.selected].classList.remove("selected");
					UI.characterMenu.selected--;
					if(UI.characterMenu.selected < 0){
						UI.characterMenu.selected = UI.characterMenu.length;
					}
					UI.characterMenu.altText.innerHTML = UI.characterMenu.optionList[UI.characterMenu.selected];
					UI.characterMenu.elements[UI.characterMenu.selected].classList.add("selected");
				}
				if(Ctrl.Btns.east.active && !Ctrl.state.east){ //right
					
					UI.characterMenu.elements[UI.characterMenu.selected].classList.remove("selected");
					UI.characterMenu.selected++;
					if(UI.characterMenu.selected>UI.characterMenu.length){
						UI.characterMenu.selected = 0;
					}
					UI.characterMenu.altText.innerHTML = UI.characterMenu.optionList[UI.characterMenu.selected];
					UI.characterMenu.elements[UI.characterMenu.selected].classList.add("selected");
					
				}
			},
			confirm(){
				if(Ctrl.Btns.A.active && !Ctrl.state.A){
					UI.charMenuManager.push(UI.characterMenu.submenus[UI.characterMenu.optionList[UI.characterMenu.selected]]);
				}
			},
			cancel(){
				if(Ctrl.Btns.B.active && !Ctrl.state.B){
					UI.charMenuManager.pop();
					GameMoment = GameMomentSav;
				}
			}
		},
		itemMenu: {
			props: ["up", "down", "A", "B"],
			up(entity){
				if(Ctrl.Btns.up.active && !Ctrl.state.up){//⬆
					if(UI.characterMenuSubmenus.selectedInventoryIndex > 0){
						UI.characterMenuSubmenus.items.update(UI.characterMenuSubmenus.selectedInventoryIndex);
						UI.characterMenuSubmenus.selectedInventoryIndex--;
					}
				}
			},
			down(entity){
				if(Ctrl.Btns.down.active && !Ctrl.state.down){
					UI.characterMenuSubmenus.items.update(UI.characterMenuSubmenus.selectedInventoryIndex);
					if(UI.characterMenuSubmenus.selectedInventoryIndex < entity.tail.length-1){
						UI.characterMenuSubmenus.selectedInventoryIndex++;
					}
				}
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
					UI.charMenuManager.pop();
				}
			}
		},
		warning: {
			props: ["all"],
			all(entity){
				for(let i = 0; i < Ctrl.ListProps.length; i++){
					if(Ctrl.Btns[Ctrl.ListProps[i]].active){
						Game.requestTransition = true;
					}
				}
			}
		},
		
		startMenu: {
			props: ["west", "east", "confirm"],
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
		},
		loadMenu: {
			props: ["west", "east", "confirm", "back"],
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
			back(){
				if(Ctrl.Btns.B.active && !Ctrl.state.B){
					Game.requestTransition = true;
					Game.buffer = GameMomentSav;
				}
			}
		},
		stats: {
			props: ["goBack"],
			goBack(){
				if(Ctrl.Btns.B.active && !Ctrl.state.B){
					UI.charMenuManager.pop()
				}
			}
		},
		//it's referring to the toolbar.
		schedule: {
			props: ["directionals", "confirm", "cancel"],
			directionals(){
				if(Ctrl.Btns.west.active && !Ctrl.state.west){ //left
					
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
						Schedule.add(Game.CurrentCharacter, Schedule.availableJobs[UI.jobTable.selectedJobIndex]);
						
					}
					//console.log(UI.jobTable.layer);
				}
			},
			cancel(){
				if(Ctrl.Btns.B.active && Ctrl.state.B == false){
					UI.charMenuManager.pop();
				}
			}
		},
		scheduleList: {
			//to control the schedule list of available jobs
			props: ["confirm", "cancel", "direcionals"],
			
		},
		scheduleTable: {
			//to control the table in a singular level. removing or adding things to the table
			props: ["confirm", "cancel", "direcionals"],
		},
		dialogs: {
			props: ["directionals", "confirm"],
			//no cancel because there's no right answer here
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
		for(let i = 0; i < Ctrl.Bonanza[type].props.length; i++)
			Ctrl.Bonanza[type][Ctrl.Bonanza[type].props[i]](entity);
	}
}

function TouchEvent(){
	 Ctrl.canvas.addEventListener("touchstart", Ctrl.touchstart, {passive:false});
	 Ctrl.canvas.addEventListener("touchmove", Ctrl.touchmove, {passive:false});
	 Ctrl.canvas.addEventListener("touchend", Ctrl.touchend, {passive:false});
}