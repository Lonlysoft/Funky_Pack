//WARNING: gamepads weren't tested throughout the development of this game. if you experience any button misarrangement or input fail, please send a feedback.

const gamepadControls = {
	touchEquiv: [],
	buttonsID: [],
	
	update(){
		const pads = navigator.getGamepads();
		if(pads[0]){
			const gp = pads[0];
		}
		for(let i = 0; i < gp.buttons.length; i++){
			
		}
		//axisMovement...
		
	}
};

function GamePadEvent(){
	window.addEventListener("gamepadconnected",
		e => {
			gamepadControls.update();
		}
	);
}

function remap(gamePadControls){
	
}