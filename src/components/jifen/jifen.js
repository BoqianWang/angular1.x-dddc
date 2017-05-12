module.exports = function($scope,$http,$rootScope,$stateParams,getHttpFactory,postHttpFactory){
	$rootScope.navTitle = "我的积分";
	$scope.point = $stateParams.point;
	getHttpFactory.getData('/centreFund/pointRecord').then(function(data){
		if (data.ret) {
					$scope.pointList = data.pointList;
				}
	},function(data){
		console.log(data);
	})

	$scope.duihClick = function(){
		$.prompt({
			  title: '兑换积分',
			  text: '',
			  input: $stateParams.point,
			  empty: false, // 是否允许为空
			  onOK: function (input) {
			    //点击确认
			    var urldata = {"points":input};
			    postHttpFactory.postData('/centreFund/pointsToFund',urldata).then(function(data){

			    	$.toast("操作成功");
			    	history.back();
			    })
			  },
			  onCancel: function () {
			    //点击取消
			  }
			});
	}
}
