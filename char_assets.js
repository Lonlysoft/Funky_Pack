const Characters = {
	Dynny:{
		name: "Dynny",
		age: 20,
		min_speed: 4,
		max_speed: 7,
		jump_power: 40,
		inventory: 8,
		height: TILE_SIZE*1.5,
		width: TILE_SIZE*0.5,
		dept: TILE_SIZE*0.5,
		skills: ["hold", "release", "hi-jump", "dashDive", "eatAnything", "putAway"],
		htmlSrc: "#dynnySpriteSheet",
		animations: {
			walk: {
				type: "infinite",
				imageX: [3, 4, 3, 0, 3, 4, 3, 0],
				timing: [3, 3, 3, 3, 3, 3, 3, 3],
				isMirrored: [0, 0, 0, 0, 1, 1, 1, 1]
			},
			walkDifferent: {
				type: "infinite",
				imageX: [3, 4, 3, 0, 5, 6, 5, 0],
				timing: [3, 3, 3, 3, 3, 3, 3, 3],
				isMirrored: null
			},
			still: {
				type: "infinite",
				imageX: [0],
				timing: [3],
				isMirrored: null
			},
			jump: {
				type: "linear",
				imageX: [3, 4],
				timing: [2, 4],
				isMirrored: null
			},
			stillHold:{
				type: "infinite",
				imageX: [5],
				timing: [3],
				isMirrored: null
			},
			walkHold:{
				type: "infinite",
				imageX: [5, 6, 7, 6, 5, 6, 7, 6],
				timing: [3, 3, 3, 3, 3, 3, 3, 3],
				isMirrored: [0, 0, 0, 0, 1, 1, 1, 1]
			},
			walkDifferentHold:{
				type: "infinite",
				imageX: [7, 8, 9, 8, 7],
				timing: [3, 3, 3, 3, 3],
				isMirrored: null,
			},
			jumpHold: {
				type: "linear",
				imageX: [8, 9],
				timing: [2, 4],
				isMirrored: null
			},
			crouch: {
				type: "linear",
				imageX: [10],
				timing: [12],
				isMirrored: null
			},
			diving: {
				type: "linear",
				imageX: [10],
				timing: [12],
				isMirrored: null
			}
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