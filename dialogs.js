class Dialog{
	constructor(){
		this.stackPair = 0
		this.boxes = document.createElement("div");
		this.boxes.style.display = 'none'
		this.bufferAnimation = 0;
	}
	
	draw(text){
		this.boxes.classList.add("dialogBox");
		this.boxes.style.width = "90%";
		this.boxes.style.display = "flex";
		
		if(this.bufferAnimation < text.length){
			this.bufferAnimation++;
		}
		let stringSplice = "<p class = 'speaking'>";
		for(let i = 0; i < Dialog.bufferAnimation; i++){
			stringSplice += text[i];
		}
		stringSplice += "</p>"
		this.boxes.innerHTML = stringSplice;
	}
	end(){
		this.boxes.style.display = "none";
	}
}