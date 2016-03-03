neighborhood_app.requires.push('neighborhood.locality_app');

neighborhood_app.config(function($stateProvider, $urlRouterProvider) {
	  $stateProvider
	  .state('home.locality', {
	      url: "/locality",
	      views: {
	    	  'app_content' : {
	    		  templateUrl: "../locality_app/templates/locality.html",
	              controller: "locality_controller"
	    	  }
	      }
          
	    })
});


angular.module('neighborhood.locality_app', [])
.controller('locality_controller', ['$scope','$state','$ionicPopup','$http',function($scope,
		$state,
		$ionicPopup,
		$http
	){
	
}]);