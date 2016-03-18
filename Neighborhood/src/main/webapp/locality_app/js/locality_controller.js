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
.controller('locality_controller', ['$scope','$state','$ionicPopup','$http','locality_info_service','user_data_service',function($scope,
		$state,
		$ionicPopup,
		$http,
		locality_info_service,
		user_data_service
	){
	
	$scope.locality_data = locality_info_service.get_locality_data();
	$scope.locality_overview = $scope.locality_data.overview.split('$');
	$scope.locality_specifications = $scope.locality_data.specifications.split('$');
	$scope.school_data = [];
	$scope.hospital_data = [];
	$scope.ATM_data = [];
	
	
	$scope.show_join_neighborhood = true;
	$scope.user_data_obj = {};
	user_data_service.get_user_data_obj(function(result){
		$scope.user_data_obj = result;
		if(result.locality_id!='' || result.locality_id == 0)
			$scope.show_join_neighborhood = true;
		else
			$scope.show_join_neighborhood = false;
	},function(result){
		console.log(result);
	})
	
	
	$scope.get_nearby_places = function(){
		var pyrmont = new google.maps.LatLng($scope.locality_data.latitude,$scope.locality_data.longitude);

		 var map = new google.maps.Map(document.getElementById('map'), {
		      center: pyrmont,
		      zoom: 15
		    });

		 var service1 = new google.maps.places.PlacesService(map);
		 
		  var request = {
		    location: pyrmont,
		    radius: '500',
		    query: 'school'
		  };

		  service1.textSearch(request, function(results, status){
			  if (status == google.maps.places.PlacesServiceStatus.OK) {
				    for (var i = 0; i < results.length; i++) {
				    	$scope.get_school_detail(results[i].place_id);
				    	if(i==results.length-1){
				    		setTimeout(function(){
				    			var request = {
									    location: pyrmont,
									    radius: '500',
									    query: 'hospital'
									  };
									  
									  var service2 = new google.maps.places.PlacesService(map);

									  service2.textSearch(request, function(results, status){
										  if (status == google.maps.places.PlacesServiceStatus.OK) {
											    for (var i = 0; i < results.length; i++) {
											    	$scope.get_hospital_detail(results[i].place_id);
											    	if(i==results.length-1){
											    		setTimeout(function(){
											    			var request = {
																    location: pyrmont,
																    radius: '500',
																    query: 'ATM'
																  };
																  
																  var service3 = new google.maps.places.PlacesService(map);
																  
																  service3.textSearch(request, function(results, status){
																	  if (status == google.maps.places.PlacesServiceStatus.OK) {
																		    for (var i = 0; i < results.length; i++) {
																		    	$scope.get_ATM_detail(results[i].place_id);
																		    }
																		  }
																  });
											    		},1000);
											    		
											    	}
											    }
											  }
									  });
				    		},1000);
				    	}
				    }
				  }
		  });
		  

	};
	
	
	$scope.get_school_detail = function(id){
		var pyrmont = new google.maps.LatLng($scope.locality_data.latitude,$scope.locality_data.longitude);
		var map = new google.maps.Map(document.getElementById('map'), {
		    center: pyrmont,
		    zoom: 15
		  });

		  var service = new google.maps.places.PlacesService(map);

		  service.getDetails({
		    placeId: id
		  }, function(place, status) {
		    if (status === google.maps.places.PlacesServiceStatus.OK) {
		    	$scope.school_data.push(place);
		    	if(!$scope.$$phase)
					$scope.$apply();
		    }
		  });
	};
	
	$scope.get_hospital_detail = function(id){
		var pyrmont = new google.maps.LatLng($scope.locality_data.latitude,$scope.locality_data.longitude);
		var map = new google.maps.Map(document.getElementById('map'), {
		    center: pyrmont,
		    zoom: 15
		  });

		  var service = new google.maps.places.PlacesService(map);

		  service.getDetails({
		    placeId: id
		  }, function(place, status) {
		    if (status === google.maps.places.PlacesServiceStatus.OK) {
		    	$scope.hospital_data.push(place);
		    	if(!$scope.$$phase)
					$scope.$apply();
		    }
		  });
	};
	
	$scope.get_ATM_detail = function(id){
		var pyrmont = new google.maps.LatLng($scope.locality_data.latitude,$scope.locality_data.longitude);
		var map = new google.maps.Map(document.getElementById('map'), {
		    center: pyrmont,
		    zoom: 15
		  });

		  var service = new google.maps.places.PlacesService(map);

		  service.getDetails({
		    placeId: id
		  }, function(place, status) {
		    if (status === google.maps.places.PlacesServiceStatus.OK) {
		    	$scope.ATM_data.push(place);
		    	if(!$scope.$$phase)
					$scope.$apply();
		    }
		  });
	};
	
	$scope.join_locality = function(){
		var req = {
				 method: 'POST',
				 url: deployment_location + '/Neighborhood/requestServlet',
				 data: { 
					 	action : 'update_user_data',
					 	data: {
					 		mail_id : $scope.user_data_obj.mail_id,
					 		locality_id : $scope.locality_data.locality_id
					 	}
				 	   }
				};
		
		
		$http(req).then(function(result){
			$ionicPopup.alert({
                title:"<b>Error</b>",
                template: "Welcome to " + $scope.locality_data.name + " society."
	        });
			user_data_service.set_user_data_obj(result.data[0]);
			$state.go('home.feeds', {}, { reload: true });
		
		}, function(result){
			console.log(result);
			$ionicPopup.alert({
                title:"<b>Error</b>",
                template: "Something went wrong. Please try again."
	        });
		});
	};
	
	$scope.get_nearby_places();
	
}]);
	
	