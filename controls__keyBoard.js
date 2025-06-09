const keyBoardControls = {
	touchEquiv: ["west", "up", "east", "down", "B", "Y", "A", "select", "zed", "start", "X", "look"],
	keyboardID: ["39", "38", "37", "40", "87", "67", "90", "32", "89", "13", "83", "82"]
}

function KeyBoardEvent(){
	window.addEventListener(
		"keydown",
		e => {
			e.preventDefault();
			for(let i = 0; i < keyBoardControls.touchEquiv.length; i++){
				if(e.keyCode == keyBoardControls.keyBoardID[i]){
					Ctrl.Btns[keyBoardControls.touchEquiv[i]].active = true;
				}
			}
		}
	);
	window.addEventListener(
		"keyup",
		e => {
			e.preventDefault();
			for(let i = 0; i < keyBoardControls.touchEquiv.length; i++){
				if(e.keyCode == keyBoardControls.keyBoardID[i]){
					Ctrl.Btns[keyBoardControls.touchEquiv[i]].active = false;
				}
			}
		}
	);
}