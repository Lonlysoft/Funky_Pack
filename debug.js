function debug(){
	ctx.fillStyle = "#fff";
	ctx.font = "32px sans-serif"
	ctx.fillText(Game.CurrentCharacter.WorldPos.z +"z", 20, 162+(32*1));
	ctx.fillText(Camera.y +"z", 100, 162+(32*2));
	for(let i = 0; i < Game.NPCarr.length; i++){
		ctx.fillText(Game.NPCarr[i].boxCol.x +"x", 20, 162+(32*i));
		ctx.fillText(Game.NPCarr[i].boxCol.z +"z", 100, 162+(32*i));
		ctx.fillText(Game.NPCarr[i].boxCol.w, 300, 162+(32*i));
	}
}