function debug(){
	ctx.fillStyle = "#fff";
	ctx.font = "32px sans-serif"
	ctx.fillText(""+ Game.CurrentCharacter.dir, 134, 56);
	ctx.fillText(""+ Game.CurrentCharacter.doing, 134, 73);
	ctx.fillText(""+ Game.CurrentCharacter.WorldPos.y, 134, 98);
}