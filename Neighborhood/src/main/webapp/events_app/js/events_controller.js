neighborhood_app.requires.push('neighborhood.events_app');

neighborhood_app.config(function($stateProvider, $urlRouterProvider) {
	  $stateProvider
	  .state('home.events', {
	      url: "/events",
	      views: {
	    	  'app_content' : {
	    		  templateUrl: "../events_app/templates/events.html",
	              controller: "events_controller"
	    	  }
	      }
          
	    })
});


angular.module('neighborhood.events_app', [])
.controller('events_controller', ['$scope','$state','$ionicPopup','$http',function($scope,
		$state,
		$ionicPopup,
		$http
	){
	
	$scope.is_add_event_collapsed = true;
	
	$scope.toggle_is_add_event_collapsed = function(){
		$scope.is_add_event_collapsed = !$scope.is_add_event_collapsed;
	}
}]);