angular.module('neighborhood.home_app', [])
.controller('home_controller', ['$scope','$state','$ionicSideMenuDelegate','$timeout',function($scope,
		$state,
		$ionicSideMenuDelegate,
		$timeout
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
	
	//by default go to feeds view
	$state.transitionTo('home.feeds');
	
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
	
	if(!localStorage.getItem('userId')){
		$state.transitionTo("login");
	}else{
		
	}
	
	
	
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
	}
	
}]);