module.exports =function($scope,$rootScope,$http,$state,centerFactory){
	$scope.$emit('to-parent', '3');
	$rootScope.headTitle = "个人中心";
	$scope.yue = 0;
	$scope.hongbao = 0;
	$scope.jifen = 0;

	 centerFactory.getData().then(function(data){
	 	$scope.ret = data.ret;
		$scope.dataList = data.dataList;
		if ($scope.ret==true) {
			$scope.dataList.headImg = data.dataList.headImg.length==0?"images/touxiang.png":data.dataList.headImg;
		}
	},function(data){
		console.log(data);
	})

	$scope.loginClick = function (){
		$state.go('homeTabs.login');
	};
}
