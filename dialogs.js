class Dialog{
	constructor(){
		this.stackPair = 0
		this.boxes = document.createElement("div");
		this.bufferAnimation = 0;
	}
	draw(text, animation){
		boxes.classList.add("dialogBox");
		boxes.style.width = "30%";
		
		if(this.bufferAnimation <= text.length){
			this.bufferAnimation++;
		}
		let stringSplice;
		for(let i = 0; i < Dialog.bufferAnimation; i++){
			stringSplice += text[i];
		}
		this.boxes.innerHTML = stringSplice;
	}
	end(){
		
	}
}