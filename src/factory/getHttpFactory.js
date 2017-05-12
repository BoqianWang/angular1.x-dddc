module.exports = function($http,$q) {
    var service = {};
    //请求数据
    service.getData = function(url){
        var d = $q.defer();
        $http.get(httpHeader +url)//读取数据的函数。
        .success(function(response) {
        	console.log(response);
            if (response.ret == false) {
            	if (response.status==999) {
					$.toast('未登录', "text");
				}else {
					$.toast(response.message, "text");
				}
            }
            d.resolve(response);
        })
        .error(function(){
            d.reject("error");
        });
        return d.promise;
    }
    return service;
}
