module.exports = function($rootScope,$scope,postHttpFactory){

	$rootScope.navTitle = "密码登录";
	$scope.passworLoginClick = function(){
		var tel  = $('#passwortel').val();
 		var password = $('#password').val();
 		if (tel.length!=11) {
 			$.toast("填写正确手机号", "text");
 			return ;
 		}
 		if (password.length == 0) {
 			$.toast("填写密码", "text");
 			return ;
 		}

 		var urldata = {"username":tel,"loginPassword" : password};
		postHttpFactory.postData('/personal/login',urldata).then(function(data){
			if (data.ret==true) {
 				window.history.go(-2);
 			}
		})
	}
}
