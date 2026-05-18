const Scenery = {
	hasDeclaired: false,
	declair: async function(nowMoment, LevelNumber, itemAssets = ITEMS, entityAssets = NPCS){
		if(LevelNumber.startsWith("AmericanCity")){
			nowMoment.currentMap = new SuperMap("AmericanCity");
			this.hasDeclaired = true;
			return;
		}
		await loadMap(LevelNumber).then(
			mapData => {
				nowMoment.currentMap = new Level(mapData);
				nowMoment.currentMap.initialize(itemAssets, entityAssets);
				this.hasDeclaired = true;
			}
		);
	},
	draw: function(currentMap, currChar, items, NPCs){
		let layers = [];
		let trueMap = currentMap;
		if(currentMap.isChunkedMap){
			for(let pieces in currentMap.pieces){
				//pick only the first one, cuz it has the map in there
				trueMap = currentMap.pieces[pieces];
				break;
			}
		}
		for(let i = 0; i < trueMap.objectGrid.length; i++){
			layers.push(new Array());
		}
		let maxLayer = trueMap.objectGrid.length-1
		maxLayer = maxLayer < 0? 0 : maxLayer;
		for(let i = 0; i < NPCs.length; i++){
			const wantedLayer = NPCs[i].layer <= maxLayer ? NPCs[i].layer: maxLayer;
			layers[wantedLayer].push(NPCs[i]);
		}
		for(let i = 0; i < items.length; i++){
			const wantedLayer = items[i].layer <= maxLayer ? items[i].layer: maxLayer;
			layers[wantedLayer].push(items[i]);
		}
		currentMap.drawFloor();
		const wantedLayer = currChar.layer <= maxLayer ? currChar.layer : maxLayer;
		layers[wantedLayer].push(currChar);
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