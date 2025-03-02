const Waiter = {
	player: null, 
	tablesCoords: [],
	map: null,
	start: function(){
		
	},
	end: function(){
		GameMoment = "mainWorld"
	},
	gamePlay(){
		
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