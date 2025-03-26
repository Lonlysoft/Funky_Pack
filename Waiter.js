const Waiter = {
	player: null,
	day: 0,
	isPlayerThere: false,
	tablesCoords: [],
	map: null,
	start: function(entity){
		if(!isPlayerThere){
			player = entity;
			this.setTableID();
			
		}
	},
	end: function(){
		if(day % 28 == 0){
			this.player.money += this.salary;
		}
		this.player.money += this.bonusTips;
		this.bonusTips = 0;
		GameMoment = "mainWorld"
	},
	gamePlay(){
		this.map[this.tablesCoords[randomNumber(0, this.tablesCoords.length)][0]] = 2;
		
		Col.main(player);
	},
	setTableID(){
		for(let i = 0; i < waiter.map.length; i++){
			for(let j = 0; j < waiter.map[i].length; j++){
				if(Waiter.map[i][j] == 1){
					tablesCoords.push([i, j]);
				}
			}
		}
	}
	
}