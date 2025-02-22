function save(characterName, inventory, coords, map){
	saveAs([finalString], {type: "text;charset=utf-8"})
}

function load(){
	const reader = new FileReader();
	
} 

function saveCookies(){
	let finalString = "";
	finalString += 0
	finalString += " "
	finalString += " "
	document.cookies = finalString;
}

function loadCookies(){
	let data = document.cookies.parseJSON();
}