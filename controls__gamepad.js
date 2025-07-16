//WARNING: gamepads weren't tested throughout the development of this game. if you experience any button misarrangement or input fail, please send a feedback.

const gamepadControls = {
	touchEquiv: ["B", "A", "Y", "X", "look", "run", "zed", "select", "start", "select", "start", "up", "down", "west", "east", "extrasOption"],
	
	update(){
		const pads = navigator.getGamepads();
		if(pads[0]){
			const gp = pads[0];
		}
		for(let i = 0; i < gp.buttons.length; i++){
			if(gp.buttons[i].pressed){
				Ctrl.Btns[touchEquiv[i]].active = true;
			}
		}
		//axisMovement...
		
	}
};

function GamePadEvent(){
	window.addEventListener("gamepadconnected",
		e => {
			gamepadControls.update();
			Ctrl.canvas.style.display = "none";
		}
	);
}

function remap(gamePadControls){
	
}