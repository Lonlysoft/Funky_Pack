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
		TILE_SIZE,
		TILE_SIZE*0.5,
		TILE_SIZE*0.5,
		["hold", "release", "hi-jump", "eatAnything"],
		"#dynnySpriteSheet",
		{
			walk: [0, 1, 0, "m", 1],
			walkDifferent: [0, 1, 0, 2],
			still: [0],
			jump: [0, 1]
		}
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
		TILE_SIZE*2.5,
		TILE_SIZE+6,
		TILE_SIZE+6,
		["objectTransformation", "bellyflop", "eatAnything"],
		"#NukkoSpriteSheet"
	)
]