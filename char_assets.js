const Characters = [
	new Protagonist(
		"Dynny",
		20,
		2,
		8,
		40,
		8,
		TILE_SIZE,
		TILE_SIZE*0.5,
		TILE_SIZE*0.5,
		["hold", "release", "hi-jump", "eatAnything"],
		"#dynnySpriteSheet",
		{
			walk: ["infinite", 1, 1, 1, 1, 1, 0, 0, 0, 0, "m", 1, "m", 1, "m", 1, "m", 1, "m", 1, 0, 0, 0, 0],
			walkDifferent: ["infinite", 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2],
			still: ["infinite", 0],
			jump: ["linear", 2, 2, 1, 1, 1, 1, 1]
		}
	),
	new Protagonist(
		"Nukko",
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