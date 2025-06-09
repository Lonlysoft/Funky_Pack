function debug(){
	ctx.fillStyle = "#fff";
	ctx.font = "10px sans-serif"
	
	ctx.fillText(Clock.lateness, 360, 100);
	for(let i = 0; i < Game.NPCarr.length; i++){
		ctx.fillText(Game.NPCarr[i].name, 300, 162+(32*i));
	}
	ctx.fillText(Game.CurrentCharacter.hand, 360, 162);
}