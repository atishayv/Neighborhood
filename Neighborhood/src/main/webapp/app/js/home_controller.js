angular.module('neighborhood.home_app', [])
.controller('home_controller', ['$scope','$state','$ionicSideMenuDelegate','$timeout','$http','$ionicPopup','$q','user_data_service','locality_info_service','messenger_chat_service',function($scope,
		$state,
		$ionicSideMenuDelegate,
		$timeout,
		$http,
		$ionicPopup,
		$q,
		user_data_service,
		locality_info_service,
		messenger_chat_service
	){
	
	$scope.left_menu_items = [
        {
			app_icon : 'menu-icon fa fa-home',
			app_title : 'Home'
		},
		{
			app_icon : 'menu-icon fa fa-user',
			app_title : 'My Profile'
		},
		{
			app_icon : 'menu-icon fa fa-users',
			app_title : 'Neighbours'
		},
		{
			app_icon : 'menu-icon fa fa-calendar-check-o',
			app_title : 'Events'
		},
		{
			app_icon : 'menu-icon fa fa-street-view',
			app_title : 'My Neighborhood'
		}
		
	];
	
	
	$scope.notification_data = [
	    {
	    	user_icon : 'images/chat/a1.jpg',
	    	user_name : 'David Belle',
	    	notif_text : 'Cum sociis natoque penatibus et magnis dis parturient montes',
	    	class_name : 'media',
	    },
	    {
	    	user_icon : 'images/chat/a2.jpg',
	    	user_name : 'Jonathan Morris',
	    	notif_text : 'Nunc quis diam diamurabitur at dolor elementum, dictum turpis vel',
	    	class_name : 'media',
	    },
	    {
	    	user_icon : 'images/chat/a3.jpg',
	    	user_name : 'Fredric Mitchell Jr',
	    	notif_text : 'Phasellus a ante et est ornare accumsan at vel magnauis blandit turpis at augue ultricies',
	    	class_name : 'media',
	    },
	    {
	    	user_icon : 'images/chat/a4.jpg',
	    	user_name : 'Glenn Jecobs',
	    	notif_text : 'Ut vitae lacus sem ellentesque maximus, nunc sit amet varius dignissim, dui est consectetur neque',
	    	class_name : 'media',
	    },
	    {
	    	user_icon : 'images/chat/a6.jpg',
	    	user_name : 'Bill Phillips',
	    	notif_text : 'Proin laoreet commodo eros id faucibus. Donec ligula quam, imperdiet vel ante placerat',
	    	class_name : 'media',
	    }
	      
	];
	
	$scope.show_search_bar = false;
	$scope.show_notif_overlay = false;
	$scope.show_chat_overlay = false;
	$scope.show_chat_panel = false;
	$scope.show_friend_status = true;
	$scope.show_friend_status_overlay_transition = false;
	$scope.show_message_overlay = false;
	$scope.show_message_overlay_transition = false;
	
	$scope.minimise_left_menu = false;
	
	
	$scope.user_data_obj = {
			profile_pic : 'images/profile_pic.png'
	}
	
	
	if(!localStorage.getItem('user_id')){
		$state.transitionTo("login");
	}else{
		//fetch the user data from server
		user_data_service.get_user_data_obj(function(result){
			if(result=="Inavlid User Id"){
   				$ionicPopup.alert({
   	                title:"<b>Error</b>",
   	                template: "Please login again to continue"
   		        });
   				$state.transitionTo("login");
   			}else{
   				//adding the user deatils into store
   				$scope.user_data_obj = result;
   				
   				//by default go to feeds view
   				$state.transitionTo('home.feeds');
   				
   				//messenger related request
   				messenger_chat_service.make_socket_connection($scope.user_data_obj.user_id);
   				messenger_chat_service.get_unread_messages($scope.user_data_obj.user_id,$scope.get_unread_messages_success,function(result){
   					console.log(result);
   				});
   				$scope.get_active_users();
   			}
		},function(result){
			console.log(result);
   			$ionicPopup.alert({
	                title:"<b>Error</b>",
	                template: "Please login again to continue"
		        });
		    $state.transitionTo("login");
		});
		
	}
	
	
	
	$scope.display_search_bar = function(){
		$scope.show_search_bar = true;
	};
	
	$scope.display_friend_status = function(){
		$scope.show_message_overlay_transition = true;
		
		$timeout(function(){
			$scope.show_message_overlay = false;
			$scope.show_friend_status = true;
			$scope.show_message_overlay_transition = false;
		},200);
		
	};
	
	$scope.display_message_overlay = function(){
		$scope.show_friend_status_overlay_transition = true;
		$timeout(function(){
			$scope.show_friend_status = false;
			$scope.show_message_overlay = true;
			$scope.show_friend_status_overlay_transition = false;
		},200);
		
	};
	
	$scope.toggle_chat_panel = function(){
		$scope.show_chat_panel = !$scope.show_chat_panel;
	};
	
	$scope.hide_search_bar = function(){
		$scope.show_search_bar = false;
		$scope.search_data = [];
		$scope.search_string = '';
	};
	
	$scope.toggle_notif_overlay = function(){
		$scope.show_notif_overlay = !$scope.show_notif_overlay;
	};
	
	$scope.toggle_chat_overlay = function(){
		$scope.show_chat_overlay = !$scope.show_chat_overlay;
	};
	
	$scope.dismiss_notif_items = function(){
		var timer = function doSetTimeout(i) {
			$timeout(function(){
				$scope.notification_data[i].class_name = 'media dismiss';
				
				if(i==$scope.notification_data.length-1){
					$scope.show_notif_overlay = false;
					for(var j=0;j<$scope.notification_data.length;j++){
						$scope.notification_data[j].class_name = 'media';
					}
				}
				
			},i*100);
		};
		for(var i=0;i<$scope.notification_data.length;i++){
			timer(i);
		}
		
		
	};
	
	
	$scope.toogle_left_menu = function(){
		$scope.minimise_left_menu = !$scope.minimise_left_menu;
	};
	
	
	$scope.go_to_app = function(title){
		if(title=="Home"){
			$state.transitionTo('home.feeds');
		}else if(title=="My Profile"){
			$state.transitionTo('home.profile');
		}else if(title=="Neighbours"){
			$state.transitionTo('home.neighbors');
		}else if(title=="Events"){
			$state.transitionTo('home.events');
		}else if(title=="My Neighborhood"){
			$state.transitionTo('home.locality');
		}
	};
	
	$scope.canceller = '';
	$scope.search_data = [];
	$scope.search_string = '';
	$scope.search_home = function(search_term){
		$scope.search_string = 'Searching ....';
		if($scope.canceller !=''){
			$scope.canceller.resolve();
			$scope.canceller = '';
		}

		
		$scope.canceller = $q.defer();

	    var requestPromise = $http({
	    	method: 'POST',
			 url: deployment_location + '/Neighborhood/requestServlet',
			 data: { 
				 	action : 'search_home',
				 	search_term : search_term,
			 	   },
	        timeout: $scope.canceller.promise
	    });

	    requestPromise.
	        success(function(data, status, headers, config) {
	        	$scope.search_data = [];
	            // Everything fine and not cancelled
	        	if(typeof data == "string"){
	        		$scope.search_string = data;
	        		//no matching results
	        	}else{
	        		$scope.search_string = '';
	        		for(var i=0;i<data.length;i++){
	        			var json = {};
	        			if(data[i].name){   //locality information
	        				json.text = data[i].name;
	        				json.type= "locality";
	        			}else if(data[i].first_name){
	        				json.text = data[i].first_name + " " + data[i].last_name;
	        				json.type= "person";
	        			}
	        			
	        			if(data[i].profile_pic){
	        				json.pic = data[i].profile_pic;
	        			}else if(data[i].profile_pic==''){
	        				json.pic = "images/profile_pic.png";
	        			}
	        			json.info = data[i];
	        			$scope.search_data.push(json);
	        		}
	        	}
	        }).
	        error(function(data, status, headers, config) {
	        	console.log(data);
	        	if(data.status === 0) {
	                // Request cancelled
	            }
	            else {
	                // Other error
	                throw 'Error ' + status
	            }
	        });

		
	};
	
	$scope.search_result_click = function(search_data){
		if(search_data.type == "locality"){
			locality_info_service.set_locality_data(search_data.info);
			$scope.hide_search_bar();
			$scope.go_to_app("My Neighborhood");
		}
	};
	
	
	
	
	
	//messenger related functions
	$scope.active_users = [];
	$scope.get_active_users = function(){
		var req = {
				 method: 'POST',
				 url: deployment_location + '/Neighborhood/requestServlet',
				 data: { 
					 	action : 'get_active_users',
				 	   }
				};
		
		$http(req).then(function(result){
			$scope.active_users = [];
			var active_users_arr = result.data;
			for(var i=0;i<active_users_arr.length;i++){
				if(active_users_arr[i][0].user_id != $scope.user_data_obj.user_id){
					$scope.active_users.push(active_users_arr[i][0]);
				}
			}
		}, function(result){
			console.log(result);
		});
	};
	
	$scope.unread_messages_arr = [];
	$scope.get_unread_messages_success = function(result){
		$scope.unread_messages_arr = [];
		for(var i=0;i<result.data.length;i++){
			$scope.unread_messages_arr.push(result.data[i]);
		}
	};
	
	$scope.user_in_conversation_with = "";
	$scope.open_chat_panel = function(user_id){
		$scope.toggle_chat_panel();
		$scope.user_in_conversation_with = user_id;
		var req = {
				 method: 'POST',
				 url: deployment_location + '/Neighborhood/requestServlet',
				 data: { 
					 	action : 'get_conversation_between_users',
					 	user_id_to : $scope.user_data_obj.user_id,
					 	user_id_from : user_id
				 	   }
				};
		
		$http(req).then(function(result){
			console.log(result);
		}, function(result){
			console.log(result);
		});
	};
	
	$scope.chat_text = "";
	$scope.chat_text_change = function(chat_text){
		$scope.chat_text = chat_text;
	};
	$scope.send_message = function(){
		messenger_chat_service.send_message($scope.chat_text,$scope.user_in_conversation_with,$scope.user_data_obj.user_id);
	}
	
}]);