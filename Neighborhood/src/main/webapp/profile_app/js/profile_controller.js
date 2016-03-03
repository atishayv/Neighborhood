neighborhood_app.requires.push('neighborhood.profile_app');

neighborhood_app.config(function($stateProvider, $urlRouterProvider) {
	  $stateProvider
	  .state('home.profile', {
	      url: "/profile",
	      views: {
	    	  'app_content' : {
	    		  templateUrl: "../profile_app/templates/profile.html",
	              controller: "profile_controller"
	    	  }
	      }
          
	    })
});


angular.module('neighborhood.profile_app', [])
.controller('profile_controller', ['$scope','$state','$ionicPopup','$http',function($scope,
		$state,
		$ionicPopup,
		$http
	){
	
	$scope.edit_basic_info = false;
	$scope.edit_contact_info = false;
	$scope.edit_work_education = false;
	$scope.is_edit_basic_info_collapsed = false;
	$scope.is_edit_contact_info_collapsed = false;
	$scope.is_edit_work_info_collapsed = false;
	
	$scope.set_edit_basic_info = function(value){
		$scope.edit_basic_info = value;
		$scope.is_edit_basic_info_collapsed = false;
	};
	$scope.toggle_is_edit_basic_info_collapsed = function(){
		$scope.is_edit_basic_info_collapsed = !$scope.is_edit_basic_info_collapsed;
	};
	$scope.toggle_is_edit_contact_info_collapsed = function(){
		$scope.is_edit_contact_info_collapsed = !$scope.is_edit_contact_info_collapsed;
	};
	$scope.toggle_is_edit_work_info_collapsed = function(){
		$scope.is_edit_work_info_collapsed = !$scope.is_edit_work_info_collapsed;
	};
	$scope.set_edit_contact_info = function(value){
		$scope.edit_contact_info = value;
		$scope.is_edit_contact_info_collapsed = false;
	};
	$scope.set_edit_work_education = function(value){
		$scope.edit_work_education = value;
		$scope.is_edit_work_education_collapsed = false;
	}
}]);