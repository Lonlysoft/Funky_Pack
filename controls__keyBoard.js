const keyBoardControls = {
	touchEquiv: [
		"west", "west", "up", "up", "east", "east", "down", "down",
		"B", "Y", "A", "select", "zed", "start", "X", "look"
	],
	keyboardID: [
		"37", "65", "87", "38", "39", "68", "83", "40",
		"32", "81", "69", "51", "20", "13", "50", "16"
	]
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