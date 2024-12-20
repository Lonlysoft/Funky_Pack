function debug(){
	ctx.fillStyle = "#fff";
	ctx.font = "32px sans-serif"
	ctx.fillText(""+ Game.CurrentCharacter.WorldPos.x, 34, 56);
	ctx.fillText(""+ Game.CurrentCharacter.WorldPos.z, 34, 73);
}