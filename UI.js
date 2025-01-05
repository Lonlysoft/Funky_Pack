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
	pauseDOM: document.querySelector(".pause"),
	pauseItems:{
		
	},
	jobTableDOM: document.querySelector(".schedule"),
	waiterHud: 0,
	charWindowDOM: document.querySelector(".charWin"),
	milionaire: 0,
	wallCleanerHud: 0,
	charWinUpdate: function(clock){
		this.charWin.clockDOM.innerHTML = `${clock.monthList[clock.month]}, ${clock.day} - ${(clock.hour >= 10) ? clock.hour : "0" + (clock.hour +"")}:${(clock.minute >= 10) ? clock.minute : "0" + (clock.minute +"")}`;
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
	pause: {
		selectedOption: 0,
		option: ["stats", "items", "talk to", "check", "save"]
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
		this.scheduleDOM.style.display = "grid";
	},
	scheduleDismiss(){
		this.scheduleDOM.style.display = "none";
	},
	pauseStart(){
		this.pauseDOM.style.display = "flex";
	},
	pauseDismiss(){
		this.pauseDOM.style.display = "none";
	}
}