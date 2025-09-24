const Scenery = {
	hasDeclaired: false,
	declair: function(nowMoment, LevelNumber, map){
		nowMoment.currentMap = new Level(map[LevelNumber]);
		nowMoment.currentMap.setBoundaries();
		nowMoment.currentMap.setNPCs(NPCS);
		nowMoment.currentMap.setWater();
		nowMoment.currentMap.setItems(ITEMS);
		this.hasDeclaired = true;
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
			currentMap.objectGridDraw(i);
		}
		
	}
}