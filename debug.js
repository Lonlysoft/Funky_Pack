function debug(){
	ctx.fillStyle = "#fff";
	ctx.font = "10px sans-serif"
	
	ctx.fillText(Clock.lateness, 360, 100);
	for(let i = 0; i < Game.NPCarr.length; i++){
		ctx.fillText(Game.NPCarr[i].name, 300, 162+(32*i));
	}
	let entity = Game.CurrentCharacter;
	ctx.fillText(transformIntoBar(entity.hunger, entity.maxHunger) , 360, 162);
	for(let i = 0; i < Game.CurrentCharacter.tail.length; i++){
		ctx.fillText(Game.CurrentCharacter.tail[i].name, 200, 162+(32*i));
	}
	
}