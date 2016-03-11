neighborhood_app.requires.push('neighborhood.locality_service');

angular.module('neighborhood.locality_service', [])
.factory('locality_info_service', ['$http',function(
		$http
		){
	
	var service_obj = {
			locality_data : '',
			
			get_locality_data : function(){
				return this.locality_data;
			},
			
			set_locality_data : function(locality_data){
				this.locality_data = locality_data;
			}
	};
	
	return service_obj;
	
}]);
