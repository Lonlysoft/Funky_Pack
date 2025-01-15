const Scenery = {
	hasDeclaired: false,
	declair: function(LevelNumber){
		Game.currentMap = new Level(MAPS[LevelNumber]["width"],
			MAPS[LevelNumber]["height"], MAPS[LevelNumber]["name"], 
			MAPS[LevelNumber]["hasWater"], MAPS[LevelNumber]["groundTileSet"], 
			MAPS[LevelNumber]["structureTileSet"], MAPS[LevelNumber]["shadowGrid"],
			MAPS[LevelNumber]["ang"], MAPS[LevelNumber]["groundElevation"], 
			MAPS[LevelNumber]["beingGrid"], MAPS[LevelNumber]["itemsGrid"],
			MAPS[LevelNumber]["triggerGrid"], MAPS[LevelNumber]["waterGrid"]
		);
		Game.currentMap.setBoundaries();
		//Game.currentMap.setNPCs(NPCS);
		Game.currentMap.setWater();
		Game.currentMap.setItems(ITEMS);
		this.hasDeclaired = true;
	},
	draw: function(currChar, items, NPCs){
		let layers = [];
		for(let i = 0; i < Game.currentMap.objectGrid.length; i++){
			layers.push(new Array());
		}
		for(let i = 0; i < NPCs.length; i++){
			layers[NPCs[i].layer].push(NPCs[i]);
		}
		for(let i = 0; i < items.length; i++){
			layers[items[i].layer].push(items[i]);
		}
		Game.currentMap.drawFloor(2);
		layers[currChar.layer].push(currChar);
		
		//this.rearrangeSubInlayer(); //feito pro player também se mover atrás dos inimigos 
		for(let i = 0; i < layers.length; i++){
			for(let j = 0; j < layers[i].length; j++){
				layers[i][j].draw();
			}
			Game.currentMap.objectGridDraw(i);
		}
	}
}