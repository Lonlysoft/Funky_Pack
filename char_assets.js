const Characters = {
	Dynny:{
		name: "Dynny",
		age: 20,
		min_speed: 2,
		max_speed: 8,
		jump_power: 40,
		inventory: 8,
		height: TILE_SIZE,
		width: TILE_SIZE*0.5,
		dept: TILE_SIZE*0.5,
		skills: ["hold", "release", "hi-jump", "dashDive", "eatAnything", "putAway"],
		htmlSrc: "#dynnySpriteSheet",
		animations: {
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
			crouch: ["linear", 9],
			eating: ["linear", 8, 8, 8, 8, 8, 8, 8, 8, 0]
		},
		relationships: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	},
	Nukko: {
		name: "Nukko",
		age: 26,
		min_speed: 2,
		max_speed: 6,
		jump_power: 35,
		inventory: 20,
		height: TILE_SIZE*2,
		width: TILE_SIZE*2,
		dept: TILE_SIZE*2,
		skills: ["hold", "release", "dashDive", "eatAnything", "putAway", "bellyPound"],
		htmlSrc: "#nukkoSpriteSheet",
		animations: {
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
			crouch: ["linear", 9],
			eating: ["linear", 8, 8, 8, 8, 8, 8, 8, 8, 0]
		}
	}
}