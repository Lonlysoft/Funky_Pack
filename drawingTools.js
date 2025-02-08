const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800; canvas.height = 800;
const controls_canvas = document.getElementById("ctrl");
const ctrl_ctx = controls_canvas.getContext("2d");
controls_canvas.width = 800; controls_canvas.height = 400;
const BG__canvas = document.getElementById("tra");
const BG__ctx = BG__canvas.getContext("2d");
BG__canvas.width = 800; BG__canvas.height = 800;

function DRAW__Grid(context, cam, grid2Draw, gridImage, tileSize, tileImageSize = tileSize){
	let x_grid = Math.floor((cam.x)/tileSize);
	let x_endGrid = Math.floor((cam.x+cam.w)/tileSize);
	let y_grid = Math.floor((cam.y)/tileSize)-Math.floor((cam.y)/tileSize);
	let y_endGrid = Math.floor((cam.y+cam.h)/tileSize)-Math.floor((cam.y)/tileSize);
		
	if(x_grid < 0) x_grid = 0;
	if(y_grid < 0) y_grid = 0;
	if(x_endGrid > grid2Draw[0].length) x_endGrid = grid2Draw[0].length;
	if(y_endGrid > grid2Draw.length) y_endGrid = grid2Draw.length;
	
	for(let i = x_grid; i < x_endGrid; i++){
		for(let j = y_grid; j < y_endGrid; j++){
			let renderPlusX = i * TILE_SIZE - cam.x + Game.canvas.width*0.5 - cam.w*0.5;
			let renderPlusY = j * TILE_SIZE - cam.y + Game.canvas.height*0.5 - cam.h*0.5;
			context.drawImage(
				gridImage, grid2Draw[j][i]*tileImageSize % gridImage.width,
				Math.floor(grid2Draw[j][i]/WorldToGrid(gridImage.width, tileImageSize) * tileImageSize),
				tileImageSize, tileImageSize,
				renderPlusX, renderPlusY,
				tileSize, tileSize
			);
		}
	}
}

function displayAnim(Character){
	if(Character.animationIndex < Character.anim[Character.doing].length){
		Character.animationIndex++;
	}
	else{
		Character.animationIndex = 0;
	}
	if(Character.anim[Character.doing][Character.animationIndex] == "m"){
		Character.mirrored = true;
		Character.animationIndex++;
	}
	fr = Character.anim[Character.doing][Character.animationIndex];
	return fr;
}