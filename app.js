var app = angular.module('app', []);

app.controller('ctrl', function($scope, $http, $timeout, $sce) {


	var maps = '{"maps":[' +
	'{"link":"http://online.seterra.com/en/vgp/3006#gameselect","name":"Canada" },' +
	'{"link":"http://online.seterra.com/en/vgp/3016#gameselect","name":"South America" },' +
	'{"link":"http://online.seterra.com/en/vgp/3020#gameselect","name":"Eastern Europe" },' +
	'{"link":"http://online.seterra.com/en/vgp/3018#gameselect","name":"Northern Europe" },' +
	'{"link":"http://online.seterra.com/en/vgp/3019#gameselect","name":"Southern Europe" },' +
	'{"link":"http://online.seterra.com/en/vgp/3021#gameselect","name":"Western Europe" },' +
	'{"link":"http://online.seterra.com/en/vgp/3039#gameselect","name":"Central Africa" },' +
	'{"link":"http://online.seterra.com/en/vgp/3040#gameselect","name":"Eastern Africa" },' +
	'{"link":"http://online.seterra.com/en/vgp/3037#gameselect","name":"Northern Africa" },' +
	'{"link":"http://online.seterra.com/en/vgp/3041#gameselect","name":"Southern Africa" },' +
	'{"link":"http://online.seterra.com/en/vgp/3038#gameselect","name":"Western Africa" },' +
	'{"link":"http://online.seterra.com/en/vgp/3166#gameselect","name":"South Asia" },' +
	'{"link":"http://online.seterra.com/en/vgp/3033#gameselect","name":"Southeast Asia" },' +
	'{"link":"http://online.seterra.com/en/vgp/3048#gameselect","name":"Former Soviet Union" },' +
	'{"link":"http://online.seterra.com/en/vgp/3049#gameselect","name":"Middle East" } ]}';



	// Get a random map quiz
	$scope.getQuiz = function() {

		// Choose random quiz
		var obj = JSON.parse(maps);
		var rnd = Math.floor((Math.random() * obj.maps.length));
		$scope.quizName = obj.maps[rnd].name;
		$scope.quizLink = $sce.trustAsResourceUrl(obj.maps[rnd].link);
		angular.element(document.querySelectorAll('#finish-quiz-btn')).css('display','none');


		// Disable all elements other than map 10% of the time
		rnd = Math.floor((Math.random() * 10));
		if(rnd == 1) {
			// Disable elements
			var elements = angular.element(document.querySelectorAll('#links, #links a img, .weather'));
			angular.element(document.querySelectorAll('#links, #links a img, .weather'));
			elements.addClass('disabled');
			
			// Show button
			angular.element(document.querySelectorAll('#finish-quiz-btn')).css('display','block');
		}
	};



	// Enables links after quiz has been completed
	$scope.finishQuiz = function() {
		// Enable elements
		var elements = angular.element(document.querySelectorAll('#links, #links a img, .weather'));
		elements.removeClass('disabled');

		// Hide button
		angular.element(document.querySelectorAll('#finish-quiz-btn')).css('display','none');
	}



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
			$scope.wikiLoading = false;


			// Get larger image for the article
			$http.jsonp("https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=" + $scope.wiki.images[0].title + "&prop=imageinfo&&iiprop=url&iiurlwidth=220&callback=JSON_CALLBACK")
			.success(function(dat) {
				try {
					var temp = dat.query.pages;
					temp = temp[Object.keys(temp)[0]];
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
			$scope.weather = data;
		});
	};
	
	

	//$scope.randomWiki();
	$scope.getWeather();
	$scope.getQuiz();
});
