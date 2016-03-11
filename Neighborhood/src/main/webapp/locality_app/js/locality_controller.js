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
.controller('locality_controller', ['$scope','$state','$ionicPopup','$http','locality_info_service',function($scope,
		$state,
		$ionicPopup,
		$http,
		locality_info_service
	){
	
	$scope.locality_data = locality_info_service.get_locality_data();
	$scope.locality_overview = $scope.locality_data.overview.split('$');
	$scope.locality_specifications = $scope.locality_data.specifications.split('$');;
	
}]);
	
	