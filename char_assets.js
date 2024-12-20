const Characters = [
	new Protagonist(
		"Dynny",
		200,
		20,
		20,
		3,
		15,
		40,
		8,
		TILE_SIZE+(TILE_SIZE*0.5),
		TILE_SIZE*0.5,
		TILE_SIZE*0.5,
		["hold", "release", "hi-jump", "eatAnything"],
		document.getElementById("DynnySpriteSheet")
	),
	new Protagonist(
		"Nukko",
		260,
		26,
		26,
		2,
		20,
		33,
		8,
		TILE_SIZE*2,
		TILE_SIZE+4,
		TILE_SIZE+4,
		["objectTransformation", "bellyflop", "eatAnything"],
		document.getElementById("NukkoSpriteSheet")
	)
]