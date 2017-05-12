module.exports =  function($scope,$http,$rootScope,postHttpFactory){
	$rootScope.navTitle = "个人资料";

	postHttpFactory.postData('/personalBasics/find').then(function(data){
		if (data.ret) {
			$scope.data = data.data;
			$scope.data.headImg = data.data.headImg ==null?"images/touxiang.png":data.data.headImg;
		}
	})

	$scope.loginOutClick = function(){
		$http.get(httpHeader +'/personal/exitLogin').
		success(function(data){
			console.log(data);
			if (data.ret) {
				history.back();
			}
		})
	}

	// 点击cell
	$scope.cellClick = function(cellIndex){
		if (cellIndex==2) {
			$.prompt({
			  title: '修改昵称',
			  text: '',
			  input: $scope.data.nickname,
			  empty: false, // 是否允许为空
			  onOK: function (input) {
			    //点击确认
			    var urldata = {"nickname":input};
			    postHttpFactory.postData('/personalBasics/updateNickname',urldata).then(function(data){
			    	$scope.data.nickname = input;
			    	jq.toast("操作成功");
			    })
			  },
			  onCancel: function () {
			    //点击取消
			  }
			});

		}
	}
}
