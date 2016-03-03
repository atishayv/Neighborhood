var neighborhood_app = angular.module('Neighborhood',['ionic','neighborhood.home_app']);

neighborhood_app.config(function(
							$stateProvider, 
							$urlRouterProvider,
							$ionicConfigProvider
						) {
 
$ionicConfigProvider.views.transition('none');
$stateProvider
	.state("home", {
		url: "/home",
		//"abstract": true,
		templateUrl: "templates/home.html",
		controller: "home_controller",
	});



$urlRouterProvider.otherwise("/home");


});
