module.exports =  function($scope,$http,$interval,$rootScope,postHttpFactory){
	$rootScope.navTitle = "登录";
	 $scope.isCodeClick = false;
	 $scope.codemsg = '获取验证码';
	 $scope.isreq = false;
	$scope.$watch('phone', function() {
    	if (!(/^1[34578]\d{9}$/.test($scope.phone))) {
    		$scope.codeClass = 'code-faild';
    		$scope.isCodeClick = false;
    	}else {
    		$scope.codeClass = 'code-success';
    		$scope.isCodeClick = true;
    	}
 	});
 	$scope.codeClick = function(){
		reqTelCode($scope,$http,$interval,$scope.phone);
 	}

 	$scope.loginClick = function (){
 		var tel  = $('#usertel').val();
 		var code = $('#codetel').val();
 		if (tel.length==0) {
 			$.toast("填写手机号", "text");
 			return ;
 		}
 		if (code.length == 0) {
 			$.toast("填写验证码", "text");
 			return ;
 		}

 		var urldata = {"username":tel,"code" : code};
		postHttpFactory.postData('/personal/quickLogin',urldata).then(function(data){
			if (data.ret==true) {
 				window.history.back();
 			}
		},function(data){

		})
 	}
}
