neighborhood_app.requires.push('neighborhood.login_app');

neighborhood_app.config(function($stateProvider, $urlRouterProvider) {
	  $stateProvider
	  .state('login', {
	      url: "/login",
          templateUrl: "../login_app/templates/login.html",
          controller: "login_controller"
	    })
});


angular.module('neighborhood.login_app', [])
.controller('login_controller', ['$scope','$state','$ionicPopup','$http',function($scope,
		$state,
		$ionicPopup,
		$http
	){
	
	
	$scope.currentView = "Login";
	
	$scope.first_name = "";
	$scope.last_name = "";
	$scope.email_id = "";
	$scope.password = "";
	
	$scope.update_first_name = function(first_name){
		$scope.first_name = first_name;
	};
	$scope.update_last_name = function(last_name){
		$scope.last_name = last_name;
	};
	$scope.update_email_id = function(email_id){
		$scope.email_id = email_id;
	};
	$scope.update_password = function(password){
		$scope.password = password;
	};
	
	$scope.goto_register_page = function(){
		$scope.currentView = "Register";
	};
	
	
	$scope.goto_login_page = function(){
		$scope.currentView = "Login";
	};
	
	
	$scope.create_account = function(){
		
		var emailFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	    var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/ ;
    	if($scope.first_name=="" || $scope.first_name==null || $scope.last_name=="" || $scope.last_name==null || $scope.email_id=="" || $scope.email_id==null ||$scope.password=="" || $scope.password==null){
    		$ionicPopup.alert({
                title:"<b>Error</b>",
                template: "Please enter all the fields correctly"
	        });
    	}else if(!emailFilter.test($scope.email_id) || $scope.email_id.match(illegalChars)){
    		$ionicPopup.alert({
                title:"<b>Error</b>",
                template: "Please enter a valid email-id"
	        });
    	}else{
    		var req = {
    				 method: 'POST',
    				 url: 'http://localhost:9080/Neighborhood/requestServlet',
    				 data: { 
    					 	action : 'new_user_register',
    					 	first_name: $scope.first_name,
    					 	last_name : $scope.last_name,
    					 	password : $scope.password,
    					 	email_id : $scope.email_id
    				 	   }
    				};
    		
    		$http(req).then(function(result){
    			if(result.data == "User already exist"){
    				$ionicPopup.alert({
    	                title:"<b>Error</b>",
    	                template: "User with same creadentials already exist. Please try again"
    		        });
    			}else if(result.data == "Successfully inserted user in DB"){
    				$ionicPopup.alert({
    	                title:"<b>Error</b>",
    	                template: "Successfully created user. Login again to continue.."
    		        }).then(function(res) {
    		        	 //switch to login view
    		        	$scope.goto_login_page();
    		        });
    				
    				
    			}else{
    				$ionicPopup.alert({
    	                title:"<b>Error</b>",
    	                template: "Something went wrong. Please try again."
    		        });
    			}
    		
    		}, function(result){
    			console.log(result);
    			$ionicPopup.alert({
	                title:"<b>Error</b>",
	                template: "Something went wrong. Please try again."
		        });
    		});
    		
    		
    		
    	}
	};
	
	
	$scope.sign_in = function(){
		
		var emailFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	    var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/ ;
    	if($scope.email_id=="" || $scope.email_id==null || $scope.password=="" || $scope.password==null){
    		$ionicPopup.alert({
                title:"<b>Error</b>",
                template: "Please enter all the fields correctly"
	        });
    	}else if(!emailFilter.test($scope.email_id) || $scope.email_id.match(illegalChars)){
    		$ionicPopup.alert({
                title:"<b>Error</b>",
                template: "Please enter a valid email-id"
	        });
    	}else{
    		var req = {
   				 method: 'POST',
   				 url: 'http://localhost:8080/Neighborhood/requestServlet',
   				 data: { 
   					 	action : 'login',
   					 	password : $scope.password,
   					 	email_id : $scope.email_id
   				 	   }
   				};
    		
    		
    		$http(req).then(function(result){
    			if(result.data=="User does not exist"){
    				$ionicPopup.alert({
    	                title:"<b>Error</b>",
    	                template: "Please enter a valid emailId or password"
    		        });
    			}else{
    				//adding the user deatils into store
    				var response  = JSON.parse(result.data)[0]
    				Ext.getStore('userProfileStore').add(response);
    				
    				Neighborhood.app.getController('MainController').showMainView(true);
    				
    				//setting the userName and profilePic to view
    				if(response.profile_pic)
    					$('#profilePicId')[0].src = response.profile_pic;
    				$('#profileNameId')[0].innerText = (response.first_name ? response.first_name+" " : "") + (response.last_name ? response.last_name : "");
    			}
    		}, function(result){
    			console.log(result);
    			$ionicPopup.alert({
	                title:"<b>Error</b>",
	                template: "Something went wrong. Please try again."
		        });
    		});
    		
    	}
	};
	
	
}]);