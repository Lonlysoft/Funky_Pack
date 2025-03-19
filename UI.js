const UI = {
	titleDOM: document.querySelector(".titleScreen"),
	loadDOM: document.querySelector(".container__saving"),
	charDOM: document.querySelector(".charWin"),
	charWin:{
		clockDOM: document.querySelector(".GameDate"),
		weatherDOM: document.querySelector(".weather_icon"),
		barDOM: document.querySelector(".charWin__HPbar"),
		charName: document.querySelector(".charName")
	},
	pauseDOM: document.querySelector(".pauseMenu"),
	pauseItems:{
		0: document.querySelector(".pauseMenu__talkTo"),
		1: document.querySelector(".pauseMenu__item"),
		2: document.querySelector(".pauseMenu__look"),
		3: document.querySelector(".pauseMenu__stats"),
		alt: document.querySelector(".pauseMenu .description"),
		optionList: ["talk to", "items", "look at", "stats"],
		selectedOption: 0,
		optionLength: 3,
		layer: 0
	},
	jobTableDOM: document.querySelector(".schedule"),
	dialogDOM: document.querySelector(".dialogs"),
	dialogItems: {
		stackPair: 0,
		bufferAnimation: NaN,
		text: null,
		writeText(){
			if(this.bufferAnimation < this.text.length){
				this.bufferAnimation++;
			}
			let stringSplice = "<p class = 'speaking'>";
			for(let i = 0; i < this.bufferAnimation; i++){
				stringSplice += this.text[i];
			}
			stringSplice += "</p>"
			UI.dialogDOM.innerHTML = stringSplice;
		}
	},
	statsBottomMenu: document.querySelector(".schedule_options"),
	waiterHud: 0,
	charWindowDOM: document.querySelector(".charWin"),
	milionaire: 0,
	wallCleanerHud: 0,
	charWinUpdate: function(clock){
		this.charWin.clockDOM.innerHTML = `${clock.monthList[clock.month]}, ${clock.day} - ${(clock.hour >= 10) ? clock.hour : "0" + (clock.hour +"")}:${(clock.minute >= 10) ? clock.minute : "0" + (clock.minute +"")}`;
	},
	jobTableDOM_options:
	{
		objs: document.querySelectorAll(".selectable"),
		optionX: 0,
		optionY: 0
	},
	title: {
		selectedOption: 0,
		options: ["newGame", "continueGame"],
		optionDOM: [document.querySelector(".new"), document.querySelector(".continue")]
	},
	loadGame: {
		selectedOption: 0,
		option: ["cookie", "sendFile"],
		optionDOM: [document.querySelector(".Cookies"), document.querySelector(".SendAFile")]
	},
	titleStart(){
		this.titleDOM.style.display = "flex";
	},
	titleDismiss(){
		this.titleDOM.style.display = "none";
	},
	loadStart(){
		this.loadDOM.style.display = "flex";
	},
	loadDismiss(){
		this.loadDOM.style.display = "none";
	},
	charWinStart(){
		this.charDOM.style.display = "flex";
	},
	charWinDismiss(){
		this.charDOM.style.display = "none";
	},
	scheduleStart(){
		this.jobTableDOM.style.display = "grid";
	},
	scheduleDismiss(){
		this.jobTableDOM.style.display = "none";
	},
	dialogStart(){
		this.dialogDOM.style.display = "flex"
	},
	dialogDismiss(){
		this.dialogDOM.style.display = "none"
	},
	pauseStart(){
		this.pauseDOM.style.display = "flex";
	},
	pauseDismiss(){
		this.pauseDOM.style.display = "none";
	}
}