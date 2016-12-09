var app = angular.module('app', []);

app.controller('ctrl', function($scope, $http, $timeout) {


	// Get a random wiki entry
	$scope.randomWiki = function() {

		$scope.wikiLoading = true;
		$scope.wikiImageLoading = true;

		// Get a random wiki article (grnnamespace=0 stop Wiki: and User Talk: articles from being returned)
		$http.jsonp("https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&format=json&prop=images|extracts&explaintext&exsentences=2&callback=JSON_CALLBACK")
		.success(function(data) {

			// We don't know the name of the object (it's a random ID)
			// so we get it like by accessing the first object of the pages returned
			var temp = data.query.pages;
			$scope.wiki = temp[Object.keys(temp)[0]];
			console.log($scope.wiki);
			$scope.wikiLoading = false;


			// Get larger image for the article
			$http.jsonp("https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=" + $scope.wiki.images[0].title + "&prop=imageinfo&&iiprop=url&iiurlwidth=220&callback=JSON_CALLBACK")
			.success(function(dat) {
				try {
					var temp = dat.query.pages;
					temp = temp[Object.keys(temp)[0]];
					console.log(temp.imageinfo[0].url);
					$scope.wikiImage = temp.imageinfo[0].url;
				} catch(err) {
					$scope.wikiImage = "";
				}

				$scope.wikiImageLoading = false;
			});
		});
	};



	// Get weather based on location
	$scope.getWeather = function() {
		var city = "lethbridge";
		var apiUrl = "http://api.openweathermap.org/data/2.5/weather?";
		var appID = "b8d7ed88a6c491c570c390e4a20fb285";
		$http.jsonp(apiUrl + "q=" + city + "&units=metric&APPID=" + appID + "&callback=JSON_CALLBACK")
		.success(function(data) {
			console.log(data);
			$scope.weather = data;
		});
	};
	
	

	$scope.randomWiki();
	$scope.getWeather();
});
