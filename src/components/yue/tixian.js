module.exports = function($scope,$http,$rootScope,$interval,getHttpFactory,postHttpFactory){
	$rootScope.navTitle ="提现";

	getHttpFactory.getData('/centreFund/findCard').then(function(data){
		if (data.ret == true) {
			$scope.bankList  =  data.cardList;
		}
	})

	$scope.codemsg = '获取验证码';
	$scope.isreq = false;
    $scope.codeClass = 'code-success';
    $scope.isCodeClick = true;

    var phone = "";
	getHttpFactory.getData('/personalCentre/phone').then(function(data){
		if (data.ret == true) {
			phone = data.phone;
		}
	})
	$scope.codeClick = function(){
		reqTelCode($scope,$http,$interval,phone);
 	}
 	var cardId = "";
 	$scope.bankCellClick = function(list){
 		$scope.inputBank = list.cardNumbe;
 		cardId = list.cid;
 		$.closePopup();
 	}

 	$scope.seleteBank = function(){
 		if ($scope.bankList.length==0) {
 			return;
 		}
 		$("#bankList").popup();
 	}

 	$scope.tixianBtnClick = function(){

 		var code = $("#tixianCode").val();
 		var bank = $("#tixianBank").val();
 		var money = $("#tixianMoney").val();

 		if (code =="") {
 			$.toast("验证码为空", "text");
 			return;
 		}
 		if (bank =="") {
 			$.toast("请选择银行卡", "text");
 			return;
 		}
 		if (money<=0) {
 			$.toast("金额输入错误", "text");
 			return;
 		}
 		var urldata = {"code":code,"money":money,"cardID":cardId};
 		postHttpFactory.postData('/centreFund/withdraw',urldata).then(function(data){
 			$.toast("操作成功");
 			history.go(-2);
 		})
 	}
}
