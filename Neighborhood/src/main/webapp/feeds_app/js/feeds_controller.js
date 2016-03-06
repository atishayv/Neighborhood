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
.controller('feeds_controller', ['$scope','$state','$ionicPopup','$http',function($scope,
		$state,
		$ionicPopup,
		$http
	){
	
		$scope.timeline_data= [
		       	            { userName : '' ,
		    	            	userPic : '../feeds_app/images/timeline/signin-bg-5.jpg',
		    	            	title : 'Lorem ipsum dolor sit amet',
		    	            	description  : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		    	            	imageUrl : '',
		    	            	imageComment : '',
		    	            	time_label : '20min ago',
		    	            	time : new Date('03/06/2016 13:06').getTime(),
		    	            	commentsArr : []
		    	            },
		    	            { userName : '' ,
		    	            	userPic : '../feeds_app/images/timeline/signin-bg-5.jpg',
		    	            	title : '',
		    	            	description  : '<a href="#">Denise Steiner</a> shared an image on <a href="#">The Gallery</a>',
		    	            	imageUrl : '../feeds_app/images/timeline/signin-bg-5.jpg',
		    	            	imageComment : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		    	            	time_label : '1hr ago',
		    	            	time : new Date('03/06/2016 12:06').getTime(),
		    	            	commentsArr : []
		    	            },
		    	            { userName : '' ,
		    	            	userPic : '../feeds_app/images/timeline/2.jpg',
		    	            	title : '<a href="#">Robert Jang</a> commented on <a href="#">The Article</a>',
		    	            	description  : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		    	            	imageUrl : '',
		    	            	imageComment : '',
		    	            	time_label : '3h ago',
		    	            	time : new Date('03/05/2016 12:06').getTime(),
		    	            	commentsArr : []
		    	            },
		    	            { userName : '' ,
		    	            	userPic : '../feeds_app/images/timeline/5.jpg',
		    	            	title : '',
		    	            	description  : '<a href="#">Denise Steiner</a> followed <a href="#">Johg Doe</a>',
		    	            	imageUrl : '',
		    	            	imageComment : '',
		    	            	time_label : '4h ago',
		    	            	time : new Date('03/05/2016 11:06').getTime(),
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
		    	            	time : new Date('03/03/2016 12:06').getTime(),
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
	
	
	$scope.post_category = 'Feeds';
	$scope.time_header_label=[];
	$scope.time_header_label_count=0;
		
	$scope.change_post_feed_box_format = function(category){
		$scope.post_category = category;
	};	
	
	$scope.get_time_header = function(label,feed_time){
		var time = new Date().getTime();
		var diff_time_in_hr = (time - feed_time)/(1000*60*60);
		var returnVal = false;
		if(diff_time_in_hr<=1){
			// now time
			if(label=='Now' && $scope.time_header_label.indexOf('Now')==-1){
				$scope.time_header_label.push('Now');
				returnVal = true;
			}
			
		}else if(diff_time_in_hr>1 && diff_time_in_hr<=24){
			//today
			if(label=='Today' && $scope.time_header_label.indexOf('Today')==-1){
				$scope.time_header_label.push('Today');
				returnVal = true;
			}
			
		}else if(diff_time_in_hr>24 && diff_time_in_hr<=48){
			//yesterday
			if(label=='Yesterday' && $scope.time_header_label.indexOf('Yesterday')==-1){
				$scope.time_header_label.push('Yesterday');
				returnVal = true;
			}
		}else{
			//previous
			if(label=='Previous' && $scope.time_header_label.indexOf('Previous')==-1){
				$scope.time_header_label.push('Previous');
				returnVal = true;
			}
		}
		$scope.time_header_label_count++;
		console.log("++++++++++++++++++++++++++++++++++++++++++++++++"+$scope.time_header_label_count)
		return returnVal;
	};
		
}]);