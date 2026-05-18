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
function DRAW__chunkedGrid(context, cam, type, pieces, gridImage, tileSize, tileImageSize = tileSize, layer = -1){
	const chunkPixelSize = tileSize * CHUNK_SIZE;
	let startCX = Math.floor(cam.x / chunkPixelSize);
	let endCX   = Math.ceil((cam.x + cam.w) / chunkPixelSize);
	let startCY = Math.floor(cam.y / chunkPixelSize);
	let endCY   = Math.ceil((cam.y + cam.h) / chunkPixelSize);
	for (let cx = startCX; cx < endCX; cx++) {
		for (let cy = startCY; cy < endCY; cy++) {
			const idChunk = `${cx}_${cy}`;
			let chunkAtual = pieces[idChunk];
			
			if (chunkAtual) {
				//made to handle objGrid;
				if(layer < 0)
					chunkAtual = pieces[idChunk][type]
				else
					chunkAtual = pieces[idChunk][type][layer]
					
				if(chunkAtual.length <= 0) return;
				
				for (let ty = 0; ty < CHUNK_SIZE; ty++) {
					for (let tx = 0; tx < CHUNK_SIZE; tx++) {
						const tileID = chunkAtual[ty][tx];
						if (tileID < 0) continue; 
						let worldX = (cx * CHUNK_SIZE + tx) * tileSize;
						let worldY = (cy * CHUNK_SIZE + ty) * tileSize;
						let renderX = worldX - cam.x + Game.canvas.width * 0.5 - cam.w * 0.5;
						let renderY = worldY - cam.y + Game.canvas.height * 0.5 - cam.h * 0.5;

				   
						if (renderX + tileSize > 0 && renderX < Game.canvas.width &&
							renderY + tileSize > 0 && renderY < Game.canvas.height) {
							context.drawImage(gridImage,
								(tileID * tileImageSize) % gridImage.width,
								Math.floor((tileID * tileImageSize) / gridImage.width) * tileImageSize,
								tileImageSize, tileImageSize,
								renderX, renderY,
								tileSize, tileSize
							);
						}
					}
				}
			}
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
		if(Character.velocity.x !== 0 || Character.velocity.z !== 0){
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