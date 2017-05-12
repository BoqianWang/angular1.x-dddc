module.exports = function($state,$scope,$http,$rootScope,$stateParams,getHttpFactory){
	$rootScope.navTitle = "我的余额";
	$scope.yue = $stateParams.yue;

	getHttpFactory.getData('/centreFund/fundRecord').then(function(data){
		if (data.ret) {
			$scope.fundList = data.fundList;
		}
	},function(data){
		console.log(data);
	})
	$scope.tixianClick = function () {
		$state.go('homeTabs.tixian');
	}
}
