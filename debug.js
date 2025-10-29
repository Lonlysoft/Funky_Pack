function debug(){
	ctx.fillStyle = "#fff";
	ctx.font = "20px sans-serif"
	
	ctx.fillText(Game.CurrentCharacter.name, 100, 80);
	ctx.fillText("vx " + Game.CurrentCharacter.velocity.x, 100, 100);
	ctx.fillText("vz " + Game.CurrentCharacter.velocity.z, 100, 120);
	ctx.fillText("x "+Game.CurrentCharacter.WorldPos.x, 100, 140);
	ctx.fillText("y "+Game.CurrentCharacter.WorldPos.y, 100, 160);
	ctx.fillText("z "+Game.CurrentCharacter.WorldPos.z, 100, 180);
	ctx.fillText("dir "+Game.CurrentCharacter.dir, 100, 200);
	/*
	for(let i = 0; i < Game.NPCarr.length; i++){
		ctx.fillText(Game.NPCarr[i].name, 300, 162+(32*i));
	}
	*/
	/*
	let entity = Game.CurrentCharacter;
	ctx.fillText(transformIntoBar(entity.hunger, entity.maxHunger) , 360, 162);
	for(let i = 0; i < Game.CurrentCharacter.tail.length; i++){
		ctx.fillText(Game.CurrentCharacter.tail[i].name, 200, 162+(32*i));
	}
	*/
	ctx.fillText(Clock.currentWeather, 200, 162);
	
}