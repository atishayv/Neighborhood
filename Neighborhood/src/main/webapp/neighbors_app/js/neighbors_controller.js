neighborhood_app.requires.push('neighborhood.neighbors_app');

neighborhood_app.config(function($stateProvider, $urlRouterProvider) {
	  $stateProvider
	  .state('home.neighbors', {
	      url: "/neighbors",
	      views: {
	    	  'app_content' : {
	    		  templateUrl: "../neighbors_app/templates/neighbors.html",
	              controller: "neighbors_controller"
	    	  }
	      }
        
	    })
});


angular.module('neighborhood.neighbors_app', [])
.controller('neighbors_controller', ['$scope','$state','$ionicPopup','$http',function($scope,
		$state,
		$ionicPopup,
		$http
	){
	
	
	$scope.neighbors_data = [
	                         {
	                        	image:'images/chat/a1.jpg',
	                        	job_title:'Graphics designer',
	                        	name :'John Smith',
	                        	home_address : ' Riviera State 32/106',
	                        	office_name : 'Twitter, Inc.',
	                        	office_address_line_1 : '795 Folsom Ave, Suite 600',
	                        	office_address_line_2 : 'San Francisco, CA 94107',
	                        	contact_no : '(123) 456-7890'
	                         }
	                        ];
	
}]);