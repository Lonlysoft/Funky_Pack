const MAX_DROPLET_RAIN = 500;

const BG = {
	canvas: BG__canvas,
	ctx: BG__ctx,
	dayAndNight: {
		//dawn
		colors: {
			0: "#0D0A26df",
			1: "#13113Edf",
			2: "#1E224Fdf",
			3: "#353C5Cdf",
			4: "#475C73df",
			5: "#387DA4df",
			6: "#259CD6df",
			7: "#26AEE2df",
			8: "#22B0E6df",
			9: "#1AAFEFdf",
			10: "#36B4DAdf",
			11: "#5BB9BBdf",
			12: "#82BF9Bdf",
			13: "#B4BE75df",
			14: "#D5B45Bdf",
			15: "#E6A64Ddf",
			16: "#EA9445df",
			17: "#E28144df",
			18: "#C66845df",
			19: "#9F5049df",
			20: "#4E2653df",
			21: "#23123Cdf",
			22: "#160D30df",
			23: "#0D0A26df",
		}
	},
	weather: {
		dropletArray: [],
		windVelocity: 0,
		rainStrength: 12,
		initParticles: function(amount = MAX_DROPLET_RAIN){
			//be careful here. this game already consumes lots of ram, we don't want to leak memory.
			this.dropletArray = [];
			for(let i = 0; i < amount; i++){
				this.dropletArray.push(this.createDrop(random(0, Game.canvas.height)));
			}
		},
		createDrop(y){
			return {
				x: random(0, Game.canvas.width),
				y: y,
				velocity: {x: this.windVelocity + (Math.random() * 1 - 0.5) , y: this.rainStrength + Math.random() * 5},
				length: 10 + random(0, 10)
			};
		},
		clear: function(){
			return;
		},
		rain: function(windSpeed, strength, intensity = MAX_DROPLET_RAIN){
			intensity = limitateUp(intensity, MAX_DROPLET_RAIN);
			
			Game.ctx.strokeStyle = 'rgba(174, 194, 224, 0.6)';
			Game.ctx.lineWidth = 1;
			//Game.ctx.beginPath();
			for(let i = 0; i < intensity; i++){
				let drop = this.dropletArray[i];
				//Game.ctx.moveTo(drop.x, drop.y);
				//Game.ctx.lineTo(drop.x + drop.velocity.x, drop.y + length);
				Game.ctx.fillRect(drop.x, drop.y, 1, 10);
				drop.velocity.x = windSpeed + (Math.random() * 1 - 0.5);
				drop.velocity.y = strength + random(0, 5);
				drop.x += drop.velocity.x;
				drop.y += drop.velocity.y;
				if(drop.x > Game.canvas.width || drop.y > Game.canvas. height || drop.x < 0){
					const newDrop = this.createDrop(random(0, Game.canvas.height));
					this.dropletArray[i] = newDrop;
					drop = newDrop;
				}
			}
			//Game.ctx.stroke();
		},
		snow: function(windSpeed, strength, intensity = MAX_DROPLET_RAIN){
			
		},
	},
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
	},
	CRTfilter(){
		Game.ctx.globalAlpha = 0.25;
		Game.ctx.fillStyle = "#000";
		for(let i = 0; i < BG.canvas.height; i+=4){
			Game.ctx.fillRect(0, i, canvas.width, 1);
		}
		Game.ctx.globalAlpha = 1;
	},
	dayAndNightFilter(hoursRightNow){
		Game.ctx.save();
		
		Game.ctx.globalCompositeOperation = "multiply";
		
		Game.ctx.fillStyle = this.dayAndNight.colors[hoursRightNow];
		Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
		
		
		Game.ctx.restore();
	}
}

const errorScreen = {
	icon: "<svg class = 'icon-big' viewbox = '0 0 100 140' fill = 'var(--bg-color)'><path d = 'M 0 0 h 60 v 10 h -60z'/><path d = 'M 60 10 h 10 v 10 h -10z'/><path d = 'M 70 20 h 10 v 10 h -10z'/><path d = 'M 80 30 h 10 v 10 h -10z'/><path d = 'M 90 40 h 10 v 140 h -10z'/><path d = 'M 10 130 h 90 v 10 h -90z'/><path d = 'M 0 10 h 10 v 120 h -10z'/><path d = 'M 30 60 h 10 v 20 h -10z'/><path d = 'M 60 60 h 10 v 20 h -10z'/><path d = 'M 20 110 h 10 v 10 h -10z m 10 0 v -10 h 40 v 10z m 40 0 h 10 v 10 h-10z'/><path d = 'M 50 10 v 40 h 40 v-10 h -30 v -30z'></svg><br/>",
	text: "<h1>ERROR!</h1>"
}