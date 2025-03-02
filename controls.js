var client_width = Math.floor(document.documentElement.clientWidth);
var client_height = Math.floor(document.documentElement.clientHeight);
var boundingRect = undefined
var aspectRatio = 1;

class Btn{
	constructor(x, y, w, h, show, ID = 14){
		this.active = false;
		this.h = h;
		this.w = w;
		this.x = x;
		this.y = y;
		this.ID = ID;
		this.type = show;
		
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
				this.ctx.drawImage(graphic, button.ID*button.w, onOrOff*button.h, 80, 80, button.x, button.y, button.w, button.h);
			}
		}
	},
	ListProps: ["west", "up", "east", "down", "southwest", "southeast", "northeast", "northwest", "B", "Y", "A", "select", "zed", "start", "X", "look"],
	Btns: {
		west: new Btn(10,  controls_canvas.height - 160, 80, 80, true, 3),//⬅ 0
		up: new Btn(90,  controls_canvas.height- 240, 80, 80, true, 0),//⬆ 1
		east: new Btn(170,  controls_canvas.height - 160, 80, 80, true, 1),//➡ 2
		down: new Btn(90,  controls_canvas.height - 80, 80, 80, true, 2),//⬇ 3
		southwest: new Btn(10,  controls_canvas.height - 80, 80, 80, false),//↙ 4
		southeast: new Btn(170,  controls_canvas.height - 80, 80, 80, false),//↘ 5
		northeast: new Btn(170,  controls_canvas.height - 240, 80, 80, false),//↗ 6
		northwest: new Btn(10,  controls_canvas.height - 240, 80, 80, false),//↖ 7
		//botao
		B: new Btn(controls_canvas.width - 170,  controls_canvas.height-80, 80, 80 , true,6),//B 8
		Y: new Btn(controls_canvas.width - 250,  controls_canvas.height-160, 80, 80,true, 4),//Y 9
		A: new Btn(controls_canvas.width - 90,  controls_canvas.height-160 ,80, 80, true, 5),//A 10
		X: new Btn(controls_canvas.width - 170, controls_canvas.height- 240, 80, 80, true, 7),//x 14
		//triggers
		select: new Btn(controls_canvas.width/2 - 90, 25, 80, 80, true, 11),//select 11
		zed: new Btn(controls_canvas.width - 90, controls_canvas.height/10*0.5, 80, 80, true, 9),//z 12
		start: new Btn(controls_canvas.width/2 + 10, controls_canvas.height/10*0.5, 80, 80, true, 10),//start 13
		
		look: new Btn(16, controls_canvas.height/10*0.5, 80, 80, true, 8)//L 15
	},
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
			if(Ctrl.Btns.B.active && Ctrl.state.B == false){
				Game.requestTransition = true;
				Game.buffer = GameMomentSav;
			}
		},
		pause: function(argumentEntity){
			if(Ctrl.Btns.start.active && Ctrl.state.start == false){
				UI.pauseDismiss();
				GameMoment = GameMomentSav;
			}
			
			if(Ctrl.Btns.west.active && !Ctrl.state.west){ //right
				UI.pauseItems[UI.pauseItems.selectedOption].classList.remove("selected");
				UI.pauseItems.selectedOption++;
				if(UI.pauseItems.selectedOption>UI.pauseItems.optionLength){
					UI.pauseItems.selectedOption = 0;
				}
				UI.pauseItems.alt.innerHTML = UI.pauseItems.optionList[UI.pauseItems.selectedOption];
				UI.pauseItems[UI.pauseItems.selectedOption].classList.add("selected");
				
			}
			if(Ctrl.Btns.east.active && !Ctrl.state.east){ //right
				UI.pauseItems[UI.pauseItems.selectedOption].classList.remove("selected");
				UI.pauseItems.selectedOption--;
				if(UI.pauseItems.selectedOption<0){
					UI.pauseItems.selectedOption = UI.pauseItems.optionLength;
				}
				UI.pauseItems.alt.innerHTML = UI.pauseItems.optionList[UI.pauseItems.selectedOption];
				UI.pauseItems[UI.pauseItems.selectedOption].classList.add("selected");
			}
			if(Ctrl.Btns.A.active && Ctrl.state.A == false){
				UI.pauseItems.layer++;
				
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
				UI.pauseItems.layer--;
			}
		},
		
		dialogs: function(argumentEntity){
			if(Ctrl.Btns.A.active && Ctrl.state.A == false){
				Game.dialogBox.buffer++;
				if(Game.dialogBox.buffer == undefined){
					Game.dialogBox.buffer = 0;
					Game.dialogBox.end();
				}
			}
			
		},
		
		character: function(argumentEntity){
			
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
			if(Ctrl.Btns.Y.active){ //Y
				if(!argumentEntity.onGround && argumentEntity.skills.includes("dashDive")){
					argumentEntity.doSkill("dashDive");
					argumentEntity.atk();
				}
				else{
					argumentEntity.atk();
				}
			}
			if(Ctrl.Btns.A.active && Ctrl.state.A == false){ //A interação
				argumentEntity.interact(Game.NPCarr);
			}
			if(Ctrl.Btns.X.active && Ctrl.state.X == false){
				if(argumentEntity.skills.includes("hold") && argumentEntity.skills.includes("release")){
					argumentEntity.doSkill("hold");
				}
			}
			if(Ctrl.Btns.look.active && Ctrl.state.L == false){
				if(!argumentEntity.onGround && argumentEntity.skills.includes("dashDive")){
					argumentEntity.doSkill("dashDive");
					argumentEntity.atk();
				}
			}
			if(Ctrl.Btns.select.active && Ctrl.state.select == false){
				argumentEntity.mao = (mao+1)%argumentEntity.tail.length;
			}
			if(Ctrl.Btns.start.active && Ctrl.state.start == false){//start
				UI.charWinDismiss();
				UI.pauseStart();
				GameMomentSav = GameMoment;
				GameMoment = 'pause';
			}
			
		},
		wallCleaner: function(argumentEntity){
			if(Ctrl.Btns.west.active){//⬅
				argumentEntity.dir = "W"
				argumentEntity.pol = -1;
				argumentEntity.walk("x");
			}
			else if(Ctrl.Btns.up.active){//⬆
				if(!WallCleaner.isControllingStrolling){
					argumentEntity.velocity.z = -10;
					WallCleaner.stroller.y = argumentEntity.boxCol.z;
				}
				else{
					
				}
			}
			else if(Ctrl.Btns.east.active){ //➡
				argumentEntity.dir = "E"
				argumentEntity.pol = 1;
				argumentEntity.walk("x");
			}
			else if(Ctrl.Btns.dowm.active){//⬇
				if(!WallCleaner.isControllingStrolling){
					argumentEntity.velocity.z = 10;
					WallCleaner.stroller.y = argumentEntity.boxCol.z;
				}
				else{
					
				}
			}
			else{
				argumentEntity.stop("x");
				argumentEntity.stop("z");
			}
			if(Ctrl.Btns.A.active && Ctrl.state.A == false){ //A interação 
				if(argumentEntity.pol < 0 && WallCleaner.stroller.x == argumentEntity.boxCol.x){
					WallCleaner.isControllingStroller = !WallCleaner.isControllingStroller;
				}
				else{
					WallCleaner.cleaner.x = WorldToGrid(argumentEntity.WorldPos.x, TILE_SIZE);
					WallCleaner.cleaner.y = WorldToGrid(argumentEntity.WorldPos.z - TILE_SIZE, TILE_SIZE);
				}
			}
		}//fim wallcleaner action
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