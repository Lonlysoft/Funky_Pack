//append de Vore
const charactersImageData = {
	Nukko: new Image().src = "image/data",
	Dynny: new Image().src = "image/data"
}

function activateVoreMode(game, ctrl, skillset){
	Characters.Dynny.grapho = charactersImageData.Dynny;
	Characters[1].grapho = charactersImageData.Nukko;
	Characters[0].belly = [];
	Characters[1].belly = [];
	Characters[0].bellyMax = 4;
	Characters[0].bellyMax = 8;
	//add struggling animation.
	//add to the skill object the vore skill 
	return true;
}