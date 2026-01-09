const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800; canvas.height = 800;
const controls_canvas = document.getElementById("ctrl");
const ctrl_ctx = controls_canvas.getContext("2d");
controls_canvas.width = 800; controls_canvas.height = 400;
const BG__canvas = document.getElementById("tra");
const BG__ctx = BG__canvas.getContext("2d");
BG__canvas.width = 800; BG__canvas.height = 800;

function transformIntoBar(current, max){
	return (current*100)/max;
}

function transformIntoCircularBar(current, max){
	return Number.parseInt((current*360)/max);
}

function DRAW__Grid(context, cam, grid2Draw, gridImage, tileSize, tileImageSize = tileSize){
	let x_grid = Math.floor((cam.x)/tileSize);
	let x_endGrid = Math.ceil((cam.x+cam.w)/tileSize);
	let y_grid = Math.floor((cam.y)/tileSize);
	let y_endGrid = Math.ceil((cam.y+cam.h)/tileSize);
		
	if(x_grid < 0) x_grid = 0;
	if(y_grid < 0) y_grid = 0;
	if(x_endGrid > grid2Draw[0].length) x_endGrid = grid2Draw[0].length;
	if(y_endGrid > grid2Draw.length) y_endGrid = grid2Draw.length;
	
	for(let i = x_grid; i < x_endGrid; i++){
		let renderPlusX = i * tileSize - cam.x + Game.canvas.width*0.5 - cam.w*0.5;
		for(let j = y_grid; j < y_endGrid; j++){
			let renderPlusY = j * tileSize - cam.y + Game.canvas.height*0.5 - cam.h*0.5;
			context.drawImage(
				gridImage, grid2Draw[j][i]*tileImageSize % gridImage.width,
				Number.parseInt(grid2Draw[j][i]/WorldToGrid(gridImage.width, tileImageSize))* tileImageSize,
				tileImageSize, tileImageSize,
				
				renderPlusX, renderPlusY,
				tileSize, tileSize
			);
		}
	}
}

function clear(screen, context){
	context.clearRect(0, 0, screen.width, screen.height)
}
function zero(screen, context){
	context.fillStyle = "#000"
	context.fillRect(0, 0, screen.width, screen.height);
}

const setUsingTools = {
	mainWorld: "use",
	wallCleaner: "clean",
	waiter: "serve",
	boxPusher: "push",
	tacticArmer: "confirm",
	frontArmy: "shoot"
}

function displayAnim(Character){
	if(Character.onGround){
		Character.doing = "still";
		if(Character.isWalking.x || Character.isWalking.z){
			Character.doing = "walkDifferent";
			if(Character.dir == "S" || Character.dir == "N"){
				Character.doing = "walk"
			}
		}
	}
	else{
		Character.doing = "jump";
	}
	
	if(Character.isUsingTools){
		Character.doing = setUsingTools[GameMoment];
	}
	
	if(Character.holdingObject){
		Character.doing += "Hold"
	}
	
	if(Character.isSpecialSkilling){
		Character.doing = "diving"
	}
	
	if(Character.animationIndex < Character.anim[Character.doing].imageX.length-1){
		Character.animTimer++;
		if(Character.animTimer >= Character.anim[Character.doing].timing[Character.animationIndex]){
			Character.animationIndex++;
			Character.animTimer = 0;
		}
	}
	else{
		if(Character.anim[Character.doing].type == "infinite"){
			Character.animationIndex = 0;
		}
		else{
			Character.animationIndex = Character.anim[Character.doing].imageX.length-1;
		}
	}
	if(Character.anim[Character.doing].isMirrored && Character.anim[Character.doing].isMirrored[Character.animationIndex] == 1){
		Character.isMirrored = true;
		mirrorateToAPoint(Game.ctx, Character.centralPoint[0], Character.centralPoint[1]);
	}
	return Character.anim[Character.doing].imageX[Character.animationIndex];
}