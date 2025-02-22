const BG = {
	canvas: BG__canvas,
	ctx: BG__ctx,
	transition: function(al, type, frameSpeed){
		switch(type){
			case "coming":
				BG.ctx.globalAlpha = al;
				BG.ctx.fillStyle = "#000";
				BG.ctx.fillRect(-1000, -1000, 2000, 2000);
				//BG.ctx.globalAlpha = 1;
				return al - frameSpeed;
			break;
			case "going":
				BG.ctx.globalAlpha = al;
				BG.ctx.fillStyle = "#000";
				BG.ctx.fillRect(-1000, -1000, 2000, 2000);
				//BG.ctx.globalAlpha = 1;
				return al + frameSpeed;
			break;
		}
	}
}
