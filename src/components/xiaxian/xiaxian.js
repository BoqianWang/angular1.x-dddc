module.exports = function($scope,$rootScope,getHttpFactory){
	$rootScope.navTitle = "我的下线";
	getHttpFactory.getData("/personalCentre/findRebate").then(function(data){
		if (data.ret==true) {
			$scope.rebate = data.rebate;
		}
	});
}
