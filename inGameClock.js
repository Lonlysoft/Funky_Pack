const Clock = {
	hour: 0, minute: 0,
	year: 1, day: 28, month: 1,
	monthList: ["yearMonth", "spring", "summer", "autumn", "winter"],
	currentWeather: "clear",
	weatherList: ["clear", "rain", "storm", "snow", "snowstorm", "fog", "special_weather_statement_statement"],
	upcomingWeather: "rain",
	passTime: function(){
		this.minute++;
		if(this.minute >= 60){
			this.minute = 0;
			this.hour++;
		}
		if(this.hour >= 24){
			this.day++;
			this.updateWeather();
			this.setUpcomingWeather();
			this.hour = 0;
		}
		if(this.day > 28){
			this.month++;
			this.day = 1;
		}
		if(this.day > 28 && month == 4){
			this.month = 0;
			this.day = 0;
		}
		if(this.month == 0 && this.hour >= 24){
			this.month++;
		}
	},
	getDayLateness: function(){
		if(this.hour > 0 && this.hour < 5){
			return "dawn";
		}
		else if(this.hour >= 5 && this.hour < 10){
			return "morning";
		}
		else if(this.hour >= 10 && this.hour < 17){
			return "day";
		}
		else if(this.hour == 17){
			return "evening";
		}
		return "night";
	},
	setUpcomingWeather: function(){
		this.upcomingWeather = this.weatherList[random(0, this.weatherList.length-1)];
	},
	updateWeather: function(){
		this.currentWeather = this.upcomingWeather;
	},
	convertToHourAndMinute: function(timonthtr){
		let hourStr = timonthtr[0] + timonthtr[1];
		let minuteStr = timonthtr[3] + timonthtr[4];
		return {hour: Number(hourStr), minute: Number(minuteStr)}
	},
	getBinaryLateness(){
		if(this.hour > 6 && this.hour < 19){
			return "day";
		}
		return "night";
	},
	getHour24HourSet(){
		
	},
	getHourSummerSystem(){
		if(this.getDayLateness() == "morning" || this.getDayLateness() == "dawn"){
			return {hour: this.hour%13, minute: this.minute, late: "AM"};
		} else{
			return {hour: this.hour%13, minute: this.minute, late: "PM"};
		}
	}
}