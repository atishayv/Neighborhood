neighborhood_app.requires.push('neighborhood.feeds_app');

neighborhood_app.config(function($stateProvider, $urlRouterProvider) {
	  $stateProvider
	  .state('home.feeds', {
	      url: "/feeds",
	      views: {
	    	  'app_content' : {
	    		  templateUrl: "../feeds_app/templates/feeds.html",
	              controller: "feeds_controller"
	    	  }
	      }
          
	    })
});


angular.module('neighborhood.feeds_app', [])
.controller('feeds_controller', ['$scope','$state','$ionicPopup','$http','user_data_service',function($scope,
		$state,
		$ionicPopup,
		$http,
		user_data_service
	){
		
		$scope.timeline_data = [
		       	            { userName : '' ,
		    	            	userPic : '../feeds_app/images/timeline/signin-bg-5.jpg',
		    	            	title : 'Lorem ipsum dolor sit amet',
		    	            	description  : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		    	            	imageUrl : '',
		    	            	imageComment : '',
		    	            	time_label : '20 min ago',
		    	            	time : new Date('03/07/2016 14:00').getTime(),
		    	            	commentsArr : []
		    	            },
		    	            { userName : '' ,
		    	            	userPic : '../feeds_app/images/timeline/signin-bg-5.jpg',
		    	            	title : '',
		    	            	description  : '<a href="#">Denise Steiner</a> shared an image on <a href="#">The Gallery</a>',
		    	            	imageUrl : '../feeds_app/images/timeline/signin-bg-5.jpg',
		    	            	imageComment : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		    	            	time_label : '1 h ago',
		    	            	time : new Date('03/07/2016 14:06').getTime(),
		    	            	commentsArr : []
		    	            },
		    	            { userName : '' ,
		    	            	userPic : '../feeds_app/images/timeline/2.jpg',
		    	            	title : '<a href="#">Robert Jang</a> commented on <a href="#">The Article</a>',
		    	            	description  : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		    	            	imageUrl : '',
		    	            	imageComment : '',
		    	            	time_label : '3 h ago',
		    	            	time : new Date('03/07/2016 08:06').getTime(),
		    	            	commentsArr : []
		    	            },
		    	            { userName : '' ,
		    	            	userPic : '../feeds_app/images/timeline/5.jpg',
		    	            	title : '',
		    	            	description  : '<a href="#">Denise Steiner</a> followed <a href="#">Johg Doe</a>',
		    	            	imageUrl : '',
		    	            	imageComment : '',
		    	            	time_label : '4 h ago',
		    	            	time : new Date('03/06/2016 11:06').getTime(),
		    	            	commentsArr : []
		    	            },
		    	            //Yesterday
		    	            { userName : '' ,
		    	            	userPic : '../feeds_app/images/timeline/5.jpg',
		    	            	title : '',
		    	            	description  : '<a href="#">Denise Steiner</a> liked a comment on <a href="#">Some Article</a>',
		    	            	imageUrl : '',
		    	            	imageComment : '',
		    	            	time_label : '9:02 pm',
		    	            	time : new Date('03/06/2016 12:06').getTime(),
		    	            	commentsArr : [{
		    	            		commentText : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		    	            		time : '2 days ago',
		    	            		likes : '',
		    	            		user_name : 'Michelle Bortz',
		    	            		user_pic : '../feeds_app/images/timeline/3.jpg'
		    	            	}]
		    	            },
		    	            { userName : '' ,
		    	            	userPic : '../feeds_app/images/timeline/5.jpg',
		    	            	title : '',
		    	            	description  : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		    	            	imageUrl : '',
		    	            	imageComment : '',
		    	            	time_label : '5:47 pm',
		    	            	time : new Date('03/03/2016 11:06').getTime(),
		    	            	commentsArr : []
		    	            },
		    	            { userName : '' ,
		    	            	userPic : '../feeds_app/images/timeline/5.jpg',
		    	            	title : '',
		    	            	description  : '<a href="#">Denise Steiner</a> liked <a href="#">Shop Item</a>',
		    	            	imageUrl : '',
		    	            	imageComment : '',
		    	            	time_label : '2:35 pm',
		    	            	time : new Date('03/02/2016 12:06').getTime(),
		    	            	commentsArr : []
		    	            },
		    	            { userName : '' ,
		    	            	userPic : '../feeds_app/images/timeline/5.jpg',
		    	            	title : 'Lorem ipsum dolor sit amet',
		    	            	description  : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		    	            	imageUrl : '',
		    	            	imageComment : '',
		    	            	time_label : '11:21 am',
		    	            	time : new Date('03/01/2016 12:06').getTime(),
		    	            	commentsArr : []
		    	            }
		    	            
		    	            ];
		
		
	
	//get user details
	$scope.user_data_obj = '';
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
				
				if(!$scope.user_data_obj.locality_id){
					$scope.show_welcome_msg = true;
				}
			}
	},function(result){
		console.log(result);
			$ionicPopup.alert({
                title:"<b>Error</b>",
                template: "Please login again to continue"
	        });
	    $state.transitionTo("login");
	});
	
	
	$scope.show_welcome_msg = false;
	
		
	$scope.post_category = 'Feeds';
	$scope.time_header_label=[];
	$scope.time_header_index=[];
	
	$scope.feed_desc = '';
	$scope.feed_title = '';
	$scope.update_feed_title = function(feed_title){
		$scope.feed_title = feed_title;
	};
	$scope.update_feed_desc = function(feed_desc){
		$scope.feed_desc = feed_desc;
	};
	
		
	$scope.change_post_feed_box_format = function(category){
		$scope.post_category = category;
	};	
	
	$scope.get_time_header = function(feed_time,feed_obj,index){
		var time = new Date().getTime();
		var diff_time_in_hr = (time - feed_time)/(1000*60*60);
		var returnVal = false;
		var time_header = '';
		if(diff_time_in_hr<=1){
			// now time
			time_header = 'Now';
			
		}else if(diff_time_in_hr>1 && diff_time_in_hr<=24){
			//today
			time_header = 'Today';
			
		}else if(diff_time_in_hr>24 && diff_time_in_hr<=48){
			//yesterday
			time_header = 'Yesterday';
			
		}else{
			//previous
			time_header = 'Previous';
		}
		
		
		if($scope.time_header_index.indexOf(index)==-1 && $scope.time_header_label.indexOf(time_header)==-1){
			feed_obj.time_heading = time_header;
			$scope.time_header_index.push(index);
			$scope.time_header_label.push(time_header);
			returnVal = true;
		}else if($scope.time_header_index.indexOf(index)>=0){
			feed_obj.time_heading = time_header;
			returnVal = true;
		}
		
		return returnVal;
	};
	
	$scope.submit_feed = function(){
		alert($scope.feed_desc);
		alert($scope.feed_title);
		var feed_obj = { user_id : '' ,
            	feed_title : 'Lorem ipsum dolor sit amet',
            	feed_desc  : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            	feed_image : '',
            	time_label : '20 min ago',
            	post_time : new Date('03/07/2016 14:00').getTime(),
            	likes : 0,
            	category : '',
            	locality_id : ''
            }
	};
	
	$scope.show_search_panel = function(){
		angular.element(document.getElementById('main_view_id')).scope().display_search_bar();
	};
	
		
}]);