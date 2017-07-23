var currentPosition;
var units = "i";
var rawJson, weather, cTemp, fTemp, summary, mWind, iWind, humidity, wBearing,
		icon, iColor, wDir, wIcon, iconStr, isNight, tNow, tSunrise, tSunset;

function getWeather(position,units) {
	currentPosition = position;
	myLat = currentPosition.coords.latitude;
  myLon = currentPosition.coords.longitude;
	$.ajax({
					url:"https://fcc-weather-api.glitch.me/api/current?lon=" +myLon+ "&lat=" + myLat,
					type: "GET",
					contentType: "application/json",
					dataType: "jsonp",
				success: function(data) {
						
  rawJson = JSON.stringify(data);
  weather = JSON.parse(rawJson);
  cTemp = Math.round(weather.main.temp);
  summary = weather.weather[0].main;
  mWind = Math.round(weather.wind.speed);
  humidity = weather.main.humidity;
	wBearing = weather.wind.deg; 
  icon = weather.weather[0].main;
	fTemp = Math.round(cTemp * 9 / 5 + 32);
	iWind = Math.round(mWind * 2.23694 );
	icon = weather.weather[0].id;
	tNow = weather.dt;
	tSunrise = weather.sys.sunrise;
 	tSunset = weather.sys.sunset;
	if(tNow <= tSunrise || tNow >= tSunset){
		isNight = true;}
	else {
		isNight = false;
	}
	
	iColor = "";
	if (cTemp > 40) { iColor = "#9e0142";} else 
	if (cTemp > 30) { iColor = "#d53e4f";} else
	if (cTemp > 20) { iColor = "#f46d43";} else
	if (cTemp > 10) { iColor = "#fdae61";} else
	if (cTemp > 0 ) { iColor = "#fee08b";} else
	if (cTemp > -10){ iColor = "#ffffbf";} else
	if (cTemp > -20){ iColor = "#e6f598";} else
	if (cTemp > -30){ icolor = "#abdda4";} else
	if (cTemp > -40){ iColor = "#66c2a5";} else
					 				{	iColor = "#5e4fa2";};

	wDir = "";
	if (wBearing >= 348.75 || wBearing < 11.25) { wDir = "N";} else
	if (wBearing >= 11.25 && wBearing < 33.75) { wDir = "NNE";} else
	if (wBearing >= 33.75 && wBearing < 56.25) { wDir = "NE";} else
	if (wBearing >= 56.25 && wBearing < 78.75) { wDir = "ENE";} else
	if (wBearing >= 78.75 && wBearing < 101.25) { wDir = "E";} else
	if (wBearing >= 101.25 && wBearing < 123.75) { wDir = "ESE";} else
	if (wBearing >= 123.75 && wBearing < 146.25) { wDir = "SE";} else
	if (wBearing >= 146.25 && wBearing < 168.75) { wDir = "SSE";} else
	if (wBearing >= 186.75 && wBearing < 191.25) { wDir = "S";} else
 	if (wBearing >= 191.25 && wBearing < 213.75) { wDir = "SSW";} else
 	if (wBearing >= 213.75 && wBearing < 236.25) { wDir ="SW";} else
	if (wBearing >= 236.25 && wBearing < 258.75) { wDir = "WSW";} else
	if (wBearing >= 258.75 && wBearing < 281.25) { wDir = "W" ;} else
	if (wBearing >= 281.25 && wBearing < 303.75) { wDir = "WNW";} else
	if (wBearing >= 303.75 && wBearing < 326.25) { wDir = "NW";} else
 																		 					 { wDir = "NNW";};
	// first some special cases
	if (icon == 962) { wIcon = "wi-hurricane";} else
	if (icon == 902 || icon == 781) { wIcon = "wi-tornado";} else
	if (icon == 906 && !isNight) { wIcon = "wi-day-hail";} else
	if (icon == 906 && isNight) { wIcon = "wi-night-alt-hail";} else
	if (icon == 711) { wIcon == "wi-smoke";} else
	if (icon == 731 || icon == 751) { wIcon == "wi-sandstorm";} else
  if ((icon == 611 || icon == 612) && !isNight) { wIcon = "wi-day-sleet";} else 
  if ((icon == 611 || icon == 612) && isNight) { wIcon = "wi-night-alt-sleet";} else
	// now the general cases
	if (icon >= 200 && icon <= 299 && !isNight) { wIcon = "wi-day-thunderstorm";} else
  if (icon >= 200 && icon <= 299 && isNight) { wIcon = "wi-wi-night-alt-thunderstorm";} else 
  if (icon >= 300 && icon <= 399 && !isNight) { wIcon = "wi-day-rain-mix";} else
  if (icon >= 300 && icon <= 399 && isNight) { wIcon = "wi-night-alt-rain-mix";} else
  if (icon >= 500 && icon <= 599 && !isNight) { wIcon = "wi-day-rain";} else
  if (icon >= 500 && icon <= 599 && isNight) { wIcon = "wi-night-alt-rain";} else
  if (icon >= 600 && icon <= 699 && !isNight) { wIcon = "wi-day-snow";} else
  if (icon >= 600 && icon <= 699 && isNight) { wIcon = "wi-night-alt-snow";} else
	if (icon >= 700 && icon <= 799 && !isNight) { wIcon = "wi-day-fog";} else
  if (icon >= 700 && icon <= 799 && isNight) { wIcon = "wi-night-fog";} else
	if (icon == 800 && !isNight) { wIcon = "wi-day-sunny";} else
  if (icon == 800 && isNight) { wIcon = "wi-night-clear";} else
	if (icon == 801 && !isNight) { wIcon = "wi-day-cloudy";} else
	if (icon == 801 && isNight) { wIcon = "wi-night-alt-cloudy";} else
  if (icon >= 802 && icon <= 899) { wIcon = "wi-cloudy";} else
																	{ wIcon = "wi-na";}; // if all else fails, display a giant N/A
  iconStr = '<i class="wi ' + wIcon + '" style="color:' + iColor+ ';"></i>';
	displayWeather();
	}
 })
};

function displayWeather() {
	if(units == "i") {
		$("#temp").html("<span style='color: " + iColor +";'>" +fTemp+"&deg;"+"F</span>");
  	$("#summary").html(summary);
		if (iWind == 0) {
  		$("#wind").html("Wind: calm");}
		else {
			$("#wind").html("Wind: "+wDir + " "+ iWind+"mph");};
  	$("#humidity").html("Humidity: "+humidity+"%");
  	$("#icons").html(iconStr);
		$("#metric").css("background-color","#000000");
		$("#imperial").css("background-color","#333333");
  }
  else {
		$("#temp").html("<span style='color: " + iColor +";'>" +cTemp+"&deg;"+"C</span>");
  	$("#summary").html(summary);
		if (mWind == 0) {
  		$("#wind").html("Wind: calm");}
		else {
			$("#wind").html("Wind: "+wDir + " "+ mWind+"m/s");};
  	$("#humidity").html("Humidity: "+humidity+"%");
  	$("#icons").html(iconStr);
		$("#metric").css("background-color","#333333");
		$("#imperial").css("background-color","#000000");
  };
};
             
	$(document).ready(function() {

  	navigator.geolocation.getCurrentPosition(getWeather);
  	
  	$("#imperial").on("click", function(){
			units = "i";
			displayWeather();
    });
  	$("#metric").on("click", function(){
			units = "m";
			displayWeather();
	});
});
