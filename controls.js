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
	draw: function(buttons, graphic){
		let button, index;
		let onOrOff = 0;
		for (index = buttons.length - 1; index > -1; --index) {
			button = buttons[index]
			if(buttons[index].type === true){
				if(buttons[index].active === true){
					onOrOff = 1;
				}
				else{
					onOrOff = 0;
				}
				this.ctx.drawImage(graphic, button.ID*button.w, onOrOff*button.h, 80, 80, button.x, button.y, button.w, button.h);
			}
		}
	},
	Btns: [new Btn(10,  controls_canvas.height - 160, 80, 80, true, 3),//⬅ 0
		new Btn(90,  controls_canvas.height- 240, 80, 80, true, 0),//⬆ 1
		new Btn(170,  controls_canvas.height - 160, 80, 80, true, 1),//➡ 2
		new Btn(90,  controls_canvas.height - 80, 80, 80, true, 2),//⬇ 3
		new Btn(10,  controls_canvas.height - 80, 80, 80, false),//↙ 4
		new Btn(170,  controls_canvas.height - 80, 80, 80, false),//↘ 5
		new Btn(170,  controls_canvas.height - 240, 80, 80, false),//↗ 6
		new Btn(10,  controls_canvas.height - 240, 80, 80, false),//↖ 7
		
		//botao
		new Btn(controls_canvas.width - 170,  controls_canvas.height-80, 80, 80 , true,6),//B 8
		new Btn(controls_canvas.width - 250,  controls_canvas.height-160, 80, 80,true, 4),//Y 9
		new Btn(controls_canvas.width - 90,  controls_canvas.height-160 ,80, 80, true, 5),//A 10
		//triggers
		new Btn(controls_canvas.width/2 - 90, 25, 80, 80, true, 11),//select 11
		new Btn(controls_canvas.width - 90, controls_canvas.height/10*0.5, 80, 80, true, 9),//z 12
		new Btn(controls_canvas.width/2 + 10, controls_canvas.height/10*0.5, 80, 80, true, 10),//start 13
		new Btn(controls_canvas.width - 170, controls_canvas.height- 240, 80, 80, true, 7),//x 14
		new Btn(16, controls_canvas.height/10*0.5, 80, 80, true, 8)//L 15
	],
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
		
		for(index0 = this.Btns.length-1; index0 > -1; index0--){
			currentBtn = this.Btns[index0];
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
	stateSave(){
		Ctrl.state.up = Ctrl.Btns[1].active;
		Ctrl.state.down = Ctrl.Btns[3].active;
		Ctrl.state.east = Ctrl.Btns[0].active;
		Ctrl.state.west = Ctrl.Btns[2].active;
		Ctrl.state.A = Ctrl.Btns[10].active;
		Ctrl.state.B = Ctrl.Btns[8].active;
		Ctrl.state.Y = Ctrl.Btns[9].active;
		Ctrl.state.start = Ctrl.Btns[13].active;
		Ctrl.state.select = Ctrl.Btns[11].active;
		Ctrl.state.zed = Ctrl.Btns[12].active;
		Ctrl.state.L = Ctrl.Btns[15].active;
		Ctrl.state.X = Ctrl.Btns[14].active;
	},
	action(argumentEntity, type){
		let contanter = 0
		switch(type){
			case "start":
				if(Ctrl.Btns[0].active){
					UI.title.optionDOM[1].classList.remove("selected");
					UI.title.selectedOption = 0;
					UI.title.optionDOM[0].classList.add("selected");
				}
				if(Ctrl.Btns[2].active){ //➡️
					UI.title.optionDOM[0].classList.remove("selected");
					UI.title.selectedOption = 1;
					UI.title.optionDOM[1].classList.add("selected");
				}
				if((Ctrl.Btns[13].active && Ctrl.state.start == false) || (Ctrl.Btns[10].active && Ctrl.state.A == false)){
					Game.requestTransition = true;
					Game.buffer = UI.title.options[UI.title.selectedOption];
				}
				
			break;
			case "load":
				if(Ctrl.Btns[0].active){
					UI.loadGame.optionDOM[1].classList.remove("selected");
					UI.loadGame.selectedOption = 0;
					UI.loadGame.optionDOM[0].classList.add("selected");
				}
				if(Ctrl.Btns[2].active){ //➡️
					UI.loadGame.optionDOM[0].classList.remove("selected");
					UI.loadGame.selectedOption = 1;
					UI.loadGame.optionDOM[1].classList.add("selected");
				}
				if((Ctrl.Btns[13].active && Ctrl.state.start == false) || (Ctrl.Btns[10].active && Ctrl.state.A == false)){
					Game.requestTransition = true;
					Game.buffer = UI.loadGame.options[UI.title.selectedOption];
				}
				if(Ctrl.Btns[8].active && Ctrl.state.B == false){
					Game.requestTransition = true;
					Game.buffer = GameMomentSav;
				}
			break;
			case "pause":
				if(Ctrl.Btns[13].active && Ctrl.state.start == false){
					GameMoment = GameMomentSav;
				}
				if(Ctrl.Btns[0].active && Ctrl.state.east == false){ //↖⬆↗
					UI.pauseItem[PauseMenu.opcaoSelecionada].classList.remove("selected");
					PauseMenu.opcaoSelecionada--;
					PauseMenu.opcaoSelecionada = PauseMenu.opcaoSelecionada%4;
					UI.pauseItem[PauseMenu.opcaoSelecionada].classList.add("selected");
				}
				else if(Ctrl.Btns[2].active && Ctrl.state.west == false){ //↙⬇↘
					UI.pauseItem[PauseMenu.opcaoSelecionada].classList.remove("selected");
					PauseMenu.opcaoSelecionada++;
					PauseMenu.opcaoSelecionada = PauseMenu.opcaoSelecionada%4;
					UI.pauseItem[PauseMenu.opcaoSelecionada].classList.add("selected");
					
				}
				else if(Ctrl.Btns[8].active && Ctrl.state.B == false){//B
					gameFeature.camada--;
					PauseMenu.regredirNaLayer();
				}
				else if(Ctrl.Btns[10].active && Ctrl.state.A == false){//A
					gameFeature.camada++;
					PauseMenu.avancarNaLayer();
				}
			break;
			
			case "character":
				if(Ctrl.Btns[0].active){//⬅
					argumentEntity.pol = -1;
					argumentEntity.walk("x");
					argumentEntity.dir = "W";
				}
				else if(Ctrl.Btns[1].active){//⬆
					argumentEntity.dir = "N";
					argumentEntity.pol = -1;
					argumentEntity.walk("z");
					
				}
				else if(Ctrl.Btns[2].active){ //➡
					argumentEntity.dir = "E"
					argumentEntity.pol = 1;
					argumentEntity.walk("x");
					
				}
				else if(Ctrl.Btns[3].active){//⬇
					argumentEntity.dir = "S"
					argumentEntity.pol = 1;
					argumentEntity.walk("z");
					
				}
				else if(Ctrl.Btns[4].active){ //↙
					argumentEntity.dir = "SW";
					argumentEntity.pol = -0.7;
					argumentEntity.walk("x");
					argumentEntity.pol = 0.7;
					argumentEntity.walk("z");
					
				}
				else if(Ctrl.Btns[5].active){ //↘
					argumentEntity.dir = "SE"
					argumentEntity.pol = 0.7;
					argumentEntity.walk("x");
					argumentEntity.pol = 0.7;
					argumentEntity.walk("z");
					
				}
				else if(Ctrl.Btns[6].active){ //↗
					argumentEntity.dir = "NE"
					argumentEntity.pol = 0.7;
					argumentEntity.walk("x");
					argumentEntity.pol = -0.7;
					argumentEntity.walk("z");
					
				}
				else if(Ctrl.Btns[7].active){ //↖
					argumentEntity.dir = "NW"
					argumentEntity.pol = -0.7;
					argumentEntity.walk("x");
					argumentEntity.pol = -0.7;
					argumentEntity.walk("z");
					
				}
				else{
					argumentEntity.stop("x");
					argumentEntity.stop("z");
				}
				
				if(Ctrl.Btns[8].active && argumentEntity.onGround == true && Ctrl.state.B == false /*&& !argumentEntity.isSwimming*/){//jumping
					argumentEntity.velocity.y += argumentEntity.JPOW;
				}
				else if(!Ctrl.Btns[8].active && !argumentEntity.onGround && !argumentEntity.jumping && Ctrl.state.B){//jump velocity basics
					argumentEntity.velocity.y = 0;
					argumentEntity.jumping = true;
				}
				else if(Ctrl.Btns[8].active && Ctrl.state.B == false && argumentEntity.isSwimming){ //jumping on water
					argumentEntity.velocity.y += argumentEntity.JPOW;
				}
				if(Ctrl.Btns[9].active){ //Y
					if(!argumentEntity.onGround && argumentEntity.skills.includes("dashDive")){
						argumentEntity.doSkill("dashDive");
						argumentEntity.atk();
					}
					else{
						argumentEntity.atk();
					}
				}
				if(Ctrl.Btns[10].active && Ctrl.state.A == false && col.interagir(argumentEntity)){ //A interação
					/*
					if(interagivel === true){
						//procurar personagem que fala ()
						//abrir diálogo ()
						//colocar o texto lá ()
					}
					else{
						
					}
					*/
				}
				if(Ctrl.Btns[14].active && Ctrl.state.X == false){
					if(argumentEntity.skills.includes("hold") && argumentEntity.skills.includes("release")){
						argumentEntity.doSkill("hold");
					}
				}
				if(Ctrl.Btns[15].active && Ctrl.state.L == false){
					if(!argumentEntity.onGround && argumentEntity.skills.includes("dashDive")){
						argumentEntity.doSkill("dashDive");
						argumentEntity.atk();
					}
				}
				if(Ctrl.Btns[11].active && Ctrl.state.select == false){
					argumentEntity.mao = (mao+1)%argumentEntity.tail.length;
				}
				if(Ctrl.Btns[13].active && Ctrl.state.start == false){//start
					gameFeature.pause = true
					gameFeature.camada = 1
				}
				
			break;
			case "wallCleaner":
				if(Ctrl.Btns[0].active){//⬅
					argumentEntity.dir = "W"
					argumentEntity.pol = -1;
					argumentEntity.walk("x");
				}
				else if(Ctrl.Btns[1].active){//⬆
					if(!WallCleaner.isControllingStrolling){
						argumentEntity.velocity.z = -10;
						WallCleaner.stroller.y = argumentEntity.boxCol.z;
					}
					else{
						
					}
				}
				else if(Ctrl.Btns[2].active){ //➡
					argumentEntity.dir = "E"
					argumentEntity.pol = 1;
					argumentEntity.walk("x");
				}
				else if(Ctrl.Btns[3].active){//⬇
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
				if(Ctrl.Btns[10].active && Ctrl.state.A == false){ //A interação 
					if(argumentEntity.pol < 0 && WallCleaner.stroller.x == argumentEntity.boxCol.x){
						WallCleaner.isControllingStroller = !WallCleaner.isControllingStroller;
					}
					else{
						WallCleaner.cleaner.x = WorldToGrid(argumentEntity.WorldPos.x, TILE_SIZE);
						WallCleaner.cleaner.y = WorldToGrid(argumentEntity.WorldPos.z - TILE_SIZE, TILE_SIZE);
					}
				}
			break;
		}
	}
}

function TouchEvent(){
	 Ctrl.canvas.addEventListener("touchstart", Ctrl.touchstart, {passive:false});
	 Ctrl.canvas.addEventListener("touchmove", Ctrl.touchmove, {passive:false});
	 Ctrl.canvas.addEventListener("touchend", Ctrl.touchend, {passive:false});
}