module.exports = function($scope,$rootScope,messaReddit){
	$rootScope.navTitle = "消息中心";
	$scope.messageReddit = new messaReddit();
}
