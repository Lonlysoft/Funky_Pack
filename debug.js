function debug(){
	ctx.save();
	ctx.fillStyle = "#fff";
	ctx.font = "20px sans-serif"
	
	/*
	ctx.fillText(Game.CurrentCharacter.name, 100, 80);
	ctx.fillText("vx " + Game.CurrentCharacter.velocity.x, 100, 100);
	ctx.fillText("vz " + Game.CurrentCharacter.velocity.z, 100, 120);
	ctx.fillText("x "+Game.CurrentCharacter.WorldPos.x, 100, 140);
	ctx.fillText("y "+Game.CurrentCharacter.WorldPos.y, 100, 160);
	ctx.fillText("z "+Game.CurrentCharacter.WorldPos.z, 100, 180);
	ctx.fillText("imgX "+Game.CurrentCharacter.centralPoint[0], 100, 220);
	ctx.fillText("imgY "+Game.CurrentCharacter.centralPoint[1], 100, 240);
	ctx.fillText("dir "+Game.CurrentCharacter.dir, 100, 200);
	*/
	/*
	for(let i = 0; i < Game.ImportantNPCsOnScreenArr.length; i++){
		let npc = Game.ImportantNPCsOnScreenArr[i];
		ctx.fillText(npc.name + " x" + npc.centralPoint[0] + " y" + npc.centralPoint[0], 100, 162+(32*i));
	}
	*/
	let entity = Game.CurrentCharacter;
	ctx.fillText("x "+WorldToGrid(Game.CurrentCharacter.WorldPos.x, TILE_SIZE), 100, 140);
	ctx.fillText("y "+WorldToGrid(Game.CurrentCharacter.WorldPos.z, TILE_SIZE), 100, 160);
	ctx.fillText(entity.doing, 100, 100);
	ctx.fillText(entity.isSpecialSkilling, 100, 162)
	for(let i = 0; i < Game.CurrentCharacter.tail.length; i++){
		ctx.fillText(entity.isSpecialSkilling, 100, 162+(32*i));
	}
	
	
	ctx.restore();
	
}

function debugCollision(varName, text, num = 0){
	ctx.fillStyle = "#fff";
	ctx.font = "20px sans-serif"
	ctx.fillText(varName + " " + text, 100, 160 + 20*num);
}