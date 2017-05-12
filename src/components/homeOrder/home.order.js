module.exports = function($scope,$http,Reddit,$rootScope){
	$rootScope.headTitle = "我的订单";
	$scope.$emit('to-parent', '2');
	$scope.reddit = new Reddit();
}
