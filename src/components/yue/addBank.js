module.exports = function($scope,$http,$rootScope,$interval,getHttpFactory,postHttpFactory){
	$rootScope.navTitle ="添加银行卡";
	var phone = "";
	getHttpFactory.getData('/personalCentre/phone').then(function(data){
		if (data.ret == true) {
			phone = data.phone;
		}
	})

	$scope.codemsg = '获取验证码';
	$scope.isreq = false;
    $scope.codeClass = 'code-success';
    $scope.isCodeClick = true;
	$scope.codeClick = function(){
		if (phone.length!=11) {
			$.toast("手机号码不正确", "text");
			return;
		}
		reqTelCode($scope,$http,$interval,phone);
 	}

 	$scope.inputBlur = function (){
 		var card = $("#addBankCard").val();
 		var card2 = card.replace(/\s/g,"");
 		$.get( httpHeader +"/weixin/web/cardNumToBank",{'cardNum':card2},function(data){
    			$('#addBankName').val(data.result);
    		},'json');
 	}

 	$scope.addBankClick = function(){

 		var code = $("#addBankCode").val();
 		var card = $("#addBankCard").val();
 		var name = $("#addBankName").val();
 		var city = $("#addBankCity").val();
 		if (code=="") {
 			$.toast("验证码为空", "text");
 			return;
 		}
 		var card1 = card.replace(/\s/g,"");
 		var cardNum1=card1.substring(0,6);
 		if (card1.length<16 || card1.length>19 ) {
 			$.toast("银行卡号长度必须在16到19之间", "text");
 			return;
 		}
 		if (name=="") {
 			$.toast("银行名称为空", "text");
 			return;
 		}
 		if (city=="") {
 			$.toast("开卡城市为空", "text");
 			return;
 		}
 		var reqdata = {"code":code,
 		"cardType":cardNum1,
 		"cardNumber":card1,
 		"cardAddress":city,
 		"bankName":name
 		};
 		postHttpFactory.postData('/centreFund/bindingCard',reqdata).then(function(data){
 			$.toast("操作成功");
 			history.back();
 		})
 	}
}
