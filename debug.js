function debug(){
	ctx.fillStyle = "#fff";
	ctx.font = "8px sans-serif"
	for(let i = 0; i < Game.ItemArr.length; i++){
		ctx.fillText("" + Game.ItemArr[i].name, 20, 162+(32*i));
		ctx.fillText(Game.ItemArr[i].centralPoint[1] +"z", 100, 162+(32*i));
	}
	for(let i = 0; i < Game.NPCarr.length; i++){
		ctx.fillText(Game.NPCarr[i].name, 300, 162+(32*i));
	}
}