module.exports = function($http,$q) {
    var service = {};
    service.postData = function(url,urlData){
        var d = $q.defer();
        $http({
			method:'POST',
			url:httpHeader +url,
			data:urlData,
			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
			var str = [];
			for(var p in obj){
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
			return str.join("&");
			}
			}).success(function(response){
				console.log(response);
				if (response.ret == false) {
	            	if (response.status==999) {
						$.toast('未登录', "text");
					}else {
						var meg  = response.message==null?response.data:response.message;
						$.toast(meg, "text");
					}
            	}else{
            		d.resolve(response);
            	}

			}).error(function(){
            	d.reject("error");
       		});
        return d.promise;
    }
    return service;
}
