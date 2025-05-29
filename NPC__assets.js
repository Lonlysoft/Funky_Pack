var NPCS = [
	"NPCS",
	{
		name: "JSON FOLF",
		age: 8,
		height: TILE_SIZE,
		width: TILE_SIZE,
		dept: TILE_SIZE,
		dialogs: ["hey man¶", "hru doing?"],
		pathArr: [["nothing", 20], ["nothing", 40], ["nothing", 30]],
		HTMLsrc: "#ultraNPC",
		animations: {
			still: ["infinite", 0],
			walk: ["infinite", 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0]
		}
	},
	
	{
		name: "Rodney",
		age: 26,
		height: TILE_SIZE*1.5,
		width: TILE_SIZE*0.5,
		dept: TILE_SIZE*0.5,
		dialogs: [["Oh, Hello Dynny.", "do you need anything?"], ["You certainly need to communicate better. I'm also in a need for that, but ... I'm not indebted to my doctor."], ["I've been reading a book that looks a lot like your story. It is even interesting how much people here are indebted to stupid things, especially health."]],
		pathArr: [["goto", 20], ["nothing", 40], ["nothing", 30]],
		HTMLsrc: "#ultraNPC",
		animations: {
			still: ["infinite", 0],
			walk: ["infinite", 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0]
		}
	}
	
];
