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
		["hold", "release", "hi-jump", "dashDive", "eatAnything", "putAway"],
		"#dynnySpriteSheet",
		{
			walk: ["infinite", 1, 1, 1, 1, 1, 0, 0, 0, 0, "m", 1, "m", 1, "m", 1, "m", 1, "m", 1, 0, 0, 0, 0],
			walkDifferent: ["infinite", 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
			still: ["infinite", 0],
			jump: ["linear", 2, 2, 1, 1, 1, 1, 1],
			clean: ["linear", 3, 3, 3, 3, 4, 4, 4, 4],
			stillHold: ["infinite", 4],
			walkHold: ["infinite", 4, 4, 4, 4, 5, 5, 5, 5, 4, 4, 4, 4, "m", 5, "m", 5, "m", 5, "m", 5],
			walkDifferentHold: ["infinite", 5, 5, 5, 5, 5, 4, 4, 4, 4, 6, 6, 6, 6, 6, 4, 4, 4, 4],
			jumpHold: ["linear", 5],
			diving: ["linear", 9],
			crouch: ["linear", 9]
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