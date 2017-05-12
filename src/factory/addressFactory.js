module.exports = function($http,$q) {
    var service = {};
    console.log('111')
    //请求数据
    service.getData = function(){
        var d = $q.defer();
        $http.get(httpHeader +'/personalAddress/getAddressById')//读取数据的函数。
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
