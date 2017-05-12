module.exports = function($http,$q) {
    var service = {};
    //请求数据
    service.getData = function(bizId){
        var d = $q.defer();
        $http({
		method:'GET',
		url:httpHeader +'/getShopTakeaway',
		params:{"bizId":bizId}
		})
        .success(function(response) {
            d.resolve(response);
        })
        .error(function(){
            d.reject("error");
        });
        return d.promise;
    }
    return service;
}
