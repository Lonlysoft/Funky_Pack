function save(character, levelName, currentMoment){
	let dto = turnDto(character);
	let finalString = "{"
	finalString += 'header: ' 
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

function readFile(e){
	const arq = e.target.files[0];
	const leitor = new FileReader();
	leitor.onload = function(e){
		return JSON.parse(decrypt(e.target.result));
	}
	leitor.readAsDataURL(file);
}

function load(){
	const reader = new FileReader();
	const stream;
	//get the textStream as a string because it's """""encrypted""""""
	//decrypt the stream 
	const decryptedStream = decrypt(stream);
	//receive this as JSON and convert to an object. THAT MEANS: PUT THE BOXES INTO their respective box.
	const SavedData = decryptedStream.parseJSON();
	Game.levelName = SavedData.levelName;
	Game.currentCharacter = Character[SavedData.character];
	GameMoment = SavedData.moment;
	Game.storyPoints = SavedData.storyPoints;
} 

function saveCookies(characterName, inventory, coords, levelName, currentMoment){
	let finalString = "savefile1 = {"
	finalString += "character: " + characterName + ", ";
	finalString += "inventory: ["
	for(let i = 0; i < inventory.length; i++){
		finalString += "" + inventory.ID + (i < inventory.length - 1)? ", " : "";
	}
	finalString += "]"
	finalString += "}"
	finalString = encrypt(finalString);
	document.cookies = finalString;
}

function getCookies(){
	return document.cookies;
}

function loadCookies(){
	let data = decrypt(document.cookies);
	injectData(Game, JSON.parse(data));
}

function injectData(game, dataParsed){ 
	game.currentCharacter = new Protagonist(dataParsed.character);
	game.currentCharacter.hp = dataParsed.character.currentHp;
	game.currentCharacter.hunger = dataParsed.character.currentHunger;
	game.currentCharacter.joy = dataParsed.characterInfo.currentJoy;
	game.currentCharacter.tail = dataParsed.characterInfo.tail;
	game.storyMoment = dataParsed.storyMoment;
	Clock.month = dataParse.clock.month;
	Clock.day = dataParse.clock.day;
	Clock.year = dataParse.clock.year;
	Clock.hour = dataParse.clock.hour;
}

//the basic AES system to encrypt the save system
function encrypt(message){
	const key = "Rest in peace CreatureUnknown..."
	const IV = CryptoJS.lib.WordArray.random(16);
	
	const encrypted = CryptoJS.AES.encrypt(
		message,
		key,
		{
			iv: IV,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.pkcs7
		}
	);
	
	const encryptedMessage = encrypted.toString();
	const ivHex = CryptoJS.enc.Hex.stringify(IV);
	const combinedMessage = ivHex + encryptedMessage;
	
	return combinedMessage;
}

function decrypt(cryptedMessage){
	const key = "Rest in peace CreatureUnknown...";
	const combinedMessage = cryptedMessage;
	const ivHex = combinedMessage.substring(0, 32);
	const encryptedMessage = combinedMessage.substring(32);
	
	const iv = CryptoJS.enc.Hex.parse(ivHex);
	
	const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, {
	    iv: iv,
	    mode: CryptoJS.mode.CBC,
	    padding: CryptoJS.pad.Pkcs7
	});
	
	return decrypted.toString(CryptoJS.enc.Utf8);
}