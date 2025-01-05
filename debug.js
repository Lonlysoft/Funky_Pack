function debug(){
	ctx.fillStyle = "#fff";
	ctx.font = "32px sans-serif"
	ctx.fillText(""+ Game.CurrentCharacter.velocity.y, 34, 56);
	ctx.fillText(""+ Game.CurrentCharacter.JPOW, 34, 73);
	ctx.fillText(""+ Game.CurrentCharacter.WorldPos.y, 34, 98);
}