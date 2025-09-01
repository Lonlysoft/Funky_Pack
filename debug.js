function debug(){
	ctx.fillStyle = "#fff";
	ctx.font = "20px sans-serif"
	
	ctx.fillText(Game.CurrentCharacter.velocity.x, 360, 100);
	ctx.fillText(Game.CurrentCharacter.velocity.z, 360, 120);
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