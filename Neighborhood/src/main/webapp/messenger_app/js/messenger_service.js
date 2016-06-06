/*http://www.byteslounge.com/tutorials/java-ee-html5-websocket-example

http://www.byteslounge.com/tutorials/java-ee-html5-websockets-with-multiple-clients-example

first make server request to get status unread messages from db and show as notificatioons
and then start socket connection. on send create hashmap with user_id and session on server. on opening socket
connection add session with user id in hasmap and on close remove it.
on send if hashmap contains recievrr user id add send message to client through socket and add to db with satus 
read otherwise add too db with status unread.
ws://host/contextPath/websocket/[clientId].*/
neighborhood_app.requires.push('neighborhood.messenger_service');

angular.module('neighborhood.messenger_service', [])
.factory('messenger_chat_service', ['$http',function(
		$http
		){
	
	var service_obj = {
			websocket : "",
			
			get_unread_messages : function(user_id,success_call_bk,failure_call_bk){
				var req = {
		  				 method: 'POST',
		  				 url: deployment_location + '/Neighborhood/requestServlet',
		  				 data: { 
		  					 	action : 'get_unread_messages',
		  					 	user_id_to : user_id,
		  				 	   }
		  				};
		   		
		   		$http(req).then(function(result){
		   			success_call_bk(result);
		   		}, function(result){
		   			failure_cal_bk(result);
		   		});
			},
			
			make_socket_connection : function(user_id){
				this.websocket = new WebSocket('ws://192.168.21.193:8025/MessengerApp/messenger_socket/'+user_id+'');
//				this.websocket = new WebSocket('ws://192.168.21.193:8025/MessengerApp/messenger_socket');
				
				this.websocket.onmessage = function(event){
					console.log(event.data);
					var response = JSON.parse(event.data);
					if(response.status == "success"){
						//add that message to database
						var req = {
				  				 method: 'POST',
				  				 url: deployment_location + '/Neighborhood/requestServlet',
				  				 data: { 
				  					 	action : 'add_chat_to_db',
				  					 	user_id_to : response.request_obj.user_id_to,
				  					 	user_id_from : response.request_obj.user_id_from,
				  					 	chat_status : 'read',
				  					 	chat_text : JSON.parse(response.request_obj).message,
				  					 	chat_time : new Date().getTime()
				  				 	   }
				  				};
					}else if(response.status == "fail"){
						var req = {
				  				 method: 'POST',
				  				 url: deployment_location + '/Neighborhood/requestServlet',
				  				 data: { 
				  					 	action : 'add_chat_to_db',
				  					 	user_id_to : response.request_obj.user_id_to,
				  					 	user_id_from : response.request_obj.user_id_from,
				  					 	chat_status : 'unread',
				  					 	chat_text : JSON.parse(response.request_obj).message,
				  					 	chat_time : new Date().getTime()
				  				 	   }
				  				};
					}
					
					
					$http(req).then(function(result){
			   			console.log(result);
			   		}, function(result){
			   			console.log(result);
			   		});
				};
			},
			
			send_message : function(message,user_id_to,user_id_from){
				this.websocket.send(JSON.stringify({"message" : message,"user_id_to" : user_id_to,"user_id_from" : user_id_from}));
			},
	};
	
	return service_obj;
	
}]);


