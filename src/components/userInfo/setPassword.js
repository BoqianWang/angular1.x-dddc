module.exports = function($scope,$rootScope,$stateParams,postHttpFactory){
	$scope.loginPassword = $stateParams.loginPassword;
	$rootScope.navTitle = $scope.loginPassword=="true"?"修改密码":"设置密码";

	$scope.setpasswordClick = function(){

		var oldPassword = $("#oldPassword").val();
		var newPassword = $("#newPassword").val();

		if (oldPassword.length<6 || newPassword.length<6) {
			$.toast('密码长度应大于6位', "text");
			return;
		}

		if ($scope.loginPassword=="false"&&oldPassword!=newPassword) {
			$.toast('两次密码不一样', "text");
			$("#newPassword").val("");
			return;
		}

		var url = $scope.loginPassword=="true"?"/personalBasics/updateLoginPassword":"/personalBasics/insertLoginPassword";
		var urldata = null;
		if ($scope.loginPassword=="true") {
			urldata = {"pass":oldPassword,"newPass":newPassword};
		}else {
			urldata = {"pass":oldPassword};
		}

		postHttpFactory.postData(url,urldata).then(function(data){
			$.toast("操作成功");
			history.back();
		})

	}
}
