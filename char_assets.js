const Characters = {
	Dynny:{
		name: "Dynny",
		age: 20,
		min_speed: 6,
		max_speed: 6,
		jump_power: TILE_SIZE*0.7,
		inventory: 8,
		height: TILE_SIZE*1.5,
		width: TILE_SIZE*0.5,
		dept: TILE_SIZE*0.5,
		skills: ["hold", "release", "hi-jump", "dashDive", "eatAnything", "putAway"],
		htmlSrc: "#dynnySpriteSheet",
		animations: {
			walk: {
				type: "infinite",
				imageX: [1, 2, 1, 0, 1, 2, 1, 0],
				timing: [3, 3, 3, 3, 3, 3, 3, 3],
				isMirrored: [0, 0, 0, 0, 1, 1, 1, 1]
			},
			walkDifferent: {
				type: "infinite",
				imageX: [1, 2, 1, 0, 3, 4, 3, 0],
				timing: [3, 3, 3, 3, 3, 3, 3, 3],
				isMirrored: null
			},
			still: {
				type: "infinite",
				imageX: [0],
				timing: [3],
				isMirrored: null
			},
			jumpLanding: {
				type: "linear",
				imageX: [10, 11, 10],
				timing: [2, 4, 4],
				isMirrored: null
			},
			jump: {
				type: "linear",
				imageX: [1, 2],
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
				imageX: [10, 11, 12, 13, 14, 15],
				timing: [2, 2, 2, 2, 2, 12],
				isMirrored: null
			},
			diving: {
				type: "linear",
				imageX: [12, 13, 15],
				timing: [4, 4, 4],
				isMirrored: null
			}
		},
		relationships: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	},
	Nukko: {
		name: "Nukko",
		age: 26,
		min_speed: 2,
		max_speed: 5,
		jump_power: TILE_SIZE*0.5,
		inventory: 20,
		height: TILE_SIZE*2,
		width: TILE_SIZE*2,
		dept: TILE_SIZE,
		skills: ["hold", "release", "eatAnything", "putAway", "bellyPound"],
		htmlSrc: "#nukkoSpriteSheet",
		animations: {
			walk: {
				type: "infinite",
				imageX: [0, 1, 2, 1, 0, 1, 2, 1],
				timing: [3, 3, 3, 3, 3, 3, 3, 3],
				isMirrored: [0, 0, 0, 0, 1, 1, 1, 1]
			},
			walkDifferent: {
				type: "infinite",
				imageX: [0, 1, 2, 1, 0, 3, 4, 3],
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
		}
	}
}