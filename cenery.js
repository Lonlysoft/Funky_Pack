const Scenery = {
	hasDeclaired: false,
	declair: async function(nowMoment, LevelNumber, itemAssets = ITEMS, entityAssets = NPCS){
		await loadMap(LevelNumber).then(
			mapData => {
				if(LevelNumber == "AmericanCity"){
					nowMoment.currentMap = new SuperMap(16, mapData)
					this.hasDeclaired = true;
					return;
				}
				nowMoment.currentMap = new Level(mapData);
				nowMoment.currentMap.initialize(itemAssets, entityAssets);
				this.hasDeclaired = true;
			}
		);
	},
	draw: function(currentMap, currChar, items, NPCs){
		let layers = [];
		for(let i = 0; i < currentMap.objectGrid.length; i++){
			layers.push(new Array());
		}
		for(let i = 0; i < NPCs.length; i++){
			layers[NPCs[i].layer].push(NPCs[i]);
		}
		for(let i = 0; i < items.length; i++){
			layers[items[i].layer].push(items[i]);
		}
		currentMap.drawFloor();
		layers[currChar.layer].push(currChar);
		for(let i = 0; i < layers.length; i++){
			layers[i] = mergeSort(layers[i]);
			for(let j = 0; j < layers[i].length; j++){
				layers[i][j].draw(currentMap);
			}
			if(i < layers.length-1)
				currentMap.objectGridDraw(i);
		}
		BG.weather[Clock.currentWeather](0, 20);
		BG.dayAndNightFilter(Clock.hour);
	}
}