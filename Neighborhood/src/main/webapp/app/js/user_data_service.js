neighborhood_app.requires.push('neighborhood.app_services');

angular.module('neighborhood.app_services', [])
.factory('user_data_service', function(){
	
	
	var service_obj = {
		user_data_obj : {},	
			
		get_user_data_obj : function(){
			return this.user_data_obj;
		},
		
		set_user_data_obj : function(user_data_obj){
			this.user_data_obj = user_data_obj;
		}
	};
	
	return service_obj;
	
})