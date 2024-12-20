const Clock = {
	hour: 0, minute: 0,
	year: 1, day: 28, month: 1,
	monthList: ["yearMonth", "spring", "summer", "autumn", "winter"],
	lateness: "dawn",
	currentWeather: "sunny",
	weatherList: ["sunny", "rain", "storm", "snow", "snowstorm", "fog", "special_weather_statement_statement"],
	upcomingWeather: "sunny",
	passTime: function(){
		this.minute++;
		if(this.minute >= 60){
			this.minute = 0;
			this.hour++;
		}
		if(this.hour >= 24){
			this.day++;
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
		this.setDayLateness();
	},
	setDayLateness: function(){
		if(this.hour > 0 && this.hour < 5){
			this.lateness = "dawn";
		}
		else if(this.hour >= 5 && this.hour < 10){
			this.lateness = "morning";
		}
		else if(this.hour >= 10 && this.hour < 17){
			this.lateness = "day";
		}
		else if(this.hour == 17){
			this.lateness = "evening";
		}
		else{
			this.lateness = "night";
		}
	},
	setForecast: function(){
		this.upcomingWeather = weatherList[random(0, weatherList.length-1)]
	},
	setWeather: function(){
		this.currentWeather = this.upcomingWeather;
	},
	convertToHourAndMinute: function(timonthtr){
		let hourStr = timonthtr[0] + timonthtr[1];
		let minuteStr = timonthtr[3] + timonthtr[4];
		return {hour: Number(hourStr), minute: Number(minuteStr)}
	}
}