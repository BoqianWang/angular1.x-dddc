module.exports = function($scope,$http,Reddit,$rootScope,$stateParams){


	$rootScope.navTitle = "订单详情";
	var orderType = $stateParams.orderType;
	var orderId = $stateParams.orderId;
	$scope.shopName = $stateParams.shopName;
	$scope.img = $stateParams.img;
	$scope.type = orderType;
	$http({
		method:'GET',
		url:httpHeader +'/weixin/findOrderDetail',
		params:{"orderType":orderType,'orderId':orderId}
	})
	.success(function(data) {
		console.log(data);
		$scope.data = data;
	})

}
