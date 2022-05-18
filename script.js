$(document).ready(function(){
	$('.search-input').keypress(function(event){
		let keycode = (event.keyCode ? event.keyCode : event.which);
		
		if (keycode == '13') {
			let url = $(this).data('url');
			let query = $(this).val();
			let search_url = `https://www.google.com/search?q=site:${url}+${query.replaceAll(' ', '+')}`;
			window.location.href = search_url;
		}
	});


	function showWeather() {			
		let apiKey = 'd52e48ecf945475ecb51e3242de2bee3';
		let url = 'https://api.darksky.net/forecast/';
		let lat = '49.905158';
		let long = '-119.451047';
		let exclude = 'minutely,flags,alerts'
		let units = 'auto';
		let api_call = url + apiKey + '/' + lat + ',' + long + '?units=' + units + '&exclude=' + exclude + '&callback=?';
		
		let icons = {
			'clear-day': '<div class="weather-icon"><div class="sun"><div class="rays"></div></div></div>',
			'rain': '<div class="weather-icon"><div class="cloud"></div><div class="rain"></div></div>',
			'snow': '<div class="weather-icon"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>',
			'sleet': 'SLEET',
			'fog': 'FOG',
			'cloudy': '<div class="weather-icon"><div class="cloud"></div><div class="cloud"></div></div>',
			'partly-cloudy-day': '<div class="weather-icon"><div class="cloud"></div><div class="sun"><div class="rays"></div></div></div>',
			'thunderstorm': '<div class="weather-icon"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>'
		};
		

		$.getJSON(api_call, function(forecast) {
			let numDays = 8;
			$('.weather-container').addClass('grid-' + numDays);

			for (let i = 0; i < numDays; i++) {
				let value = forecast.daily.data[i];
				let icon = icons[value.icon];
				let day = getDayFromTimestamp(value.time)
				let temp = Math.round(value.temperatureHigh);
				
				let html = '<div class="weather-cell grid-cell">' +
					'<div>' + icon + '</div>' +
					'<div class="weather-day">' + day + '</div>' +
					'<div class="weather-temp">' + temp + '</div>' +
				'</div>';

				
				$('.weather-container').append(html);
			}

			let currentTemp = Math.round(forecast.currently.temperature);
			let currentIcon = icons[forecast.currently.icon];
			$('#current-weather-icon').html(currentIcon);
			$('#current-temp').html('Right now it\'s ' + currentTemp);

			console.log(forecast);
		});
	}

	function getDayFromTimestamp(timestamp) {
		let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		let day = (new Date(timestamp * 1000)).getDay()
		return days[day];
	}

	showWeather();
});
