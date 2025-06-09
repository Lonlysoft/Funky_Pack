function save(characterName, inventory, coords, levelName, currentMoment){
	let finalString = "{"
	finalString += "character: " + characterName + ", ";
	finalString += "inventory: ["
	for(let i = 0; i < inventory.length; i++){
		finalString += "" + inventory.ID + (i < inventory.length - 1)? ", " : "";
	}
	finalString += "], "
	finalString += "moment: " + currentMoment + ", "
	finalString += "}";
	//Crypt the JSON string
	saveAs([finalString], {type: "text;charset=utf-8"});
}

function load(){
	const reader = new FileReader();
	//get the textStream 
	//decrypt the stream (still laughing because it's JavaScript. this shit is not secure at all lol)
	//receive this as JSON and convert to an object
	/*
	Game.levelName = SavedData.levelName;
	Game.currentCharacter = Character[SavedData.character];
	GameMoment = SavedData.moment
	Game.storyPoints = SavedData.
	*/
} 

function saveCookies(characterName, inventory, coords, levelName, currentMoment){
	let finalString = "savefile1 = {"
	finalString += "character: ";
	finalString += "inventory: ["
	for(let i = 0; i < inventory.length; i++){
		finalString += "" + inventory.ID + (i < inventory.length - 1)? ", " : "";
	}
	finalString += "]"
	
	finalString += "}"
	document.cookies = finalString;
}

function loadCookies(){
	let data = document.cookies.parseJSON();
}