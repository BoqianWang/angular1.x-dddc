module.exports =  function($scope,$rootScope,xiaxianReddit,$stateParams){

	$rootScope.navTitle = "下线详情";
	var type = $stateParams.type;
	$scope.xiaxianReddit = new xiaxianReddit(type);
}
