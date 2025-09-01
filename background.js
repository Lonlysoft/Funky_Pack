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
	},
	twoTransition: function(stackingNumbers, type, frameSpeed){
		switch(type){
			case "coming":
				BG.ctx.fillStyle = "#000";
				BG.ctx.fillRect(0, stackingNumbers, canvas.width, canvas.height);
				BG.ctx.fillRect(0, 0, canvas.width, stackingNumbers);
				return stackingNumbers - frameSpeed;
			break;
			case "going":
				BG.ctx.fillStyle = "#000";
				BG.ctx.fillRect(0, stackingNumbers, canvas.width, canvas.height);
				BG.ctx.fillRect(0, 0, canvas.width, stackingNumbers);
				return al + frameSpeed;
			break;
		}
	}
}

const errorScreen = {
	icon: "<svg class = 'icon-big' viewbox = '0 0 100 140' fill = 'var(--bg-color)'><path d = 'M 0 0 h 60 v 10 h -60z'/><path d = 'M 60 10 h 10 v 10 h -10z'/><path d = 'M 70 20 h 10 v 10 h -10z'/><path d = 'M 80 30 h 10 v 10 h -10z'/><path d = 'M 90 40 h 10 v 140 h -10z'/><path d = 'M 10 130 h 90 v 10 h -90z'/><path d = 'M 0 10 h 10 v 120 h -10z'/><path d = 'M 30 60 h 10 v 20 h -10z'/><path d = 'M 60 60 h 10 v 20 h -10z'/><path d = 'M 20 110 h 10 v 10 h -10z m 10 0 v -10 h 40 v 10z m 40 0 h 10 v 10 h-10z'/><path d = 'M 50 10 v 40 h 40 v-10 h -30 v -30z'></svg><br/>",
	text: "<h1>ERROR!</h1>"
}