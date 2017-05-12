module.exports = function($scope,$rootScope,getHttpFactory){
	var orderStr = sessionStorage.getItem("payInfo");
	$scope.orderObj  =   JSON.parse(orderStr);
	$rootScope.navTitle = "订单支付";

	getHttpFactory.getData("/personalCentre/findMoney").then(function(data){
		if (data.ret) {
			$scope.money = data.money;
		}
	});
	var checkVal = 3;
	$scope.check = function(Val){

		checkVal = Val;
	}

	$scope.surePayClick = function(){

		if (checkVal == 3) { //龙支付
			goLongzhifu();
		}
	}

	// 龙支付
	function goLongzhifu(){
		var strMD5;
		var URL;
		var URL0;//网上银行支付
		var URL1;//E付卡支付
		var tmp;
		var tmp0;
		var tmp1;
	    var temp_New1;
	    var MERCHANTID=document.getElementById("MERCHANTID").value;
		var POSID=document.getElementById("POSID").value;
		var BRANCHID=document.getElementById("BRANCHID").value;
		var ORDERID=document.getElementById("ORDERID").value;
		var PAYMENT=document.getElementById("PAYMENT").value;
		var CURCODE=document.getElementById("CURCODE").value;
		var TXCODE=document.getElementById("TXCODE").value;
		var REMARK1=document.getElementById("REMARK1").value;
		var REMARK2=document.getElementById("REMARK2").value;
		var bankURL=document.getElementById("bankURL").value;

		tmp ='MERCHANTID='+MERCHANTID+'&POSID='+POSID+'&BRANCHID='+BRANCHID+'&ORDERID='+ORDERID+'&PAYMENT='+PAYMENT+'&CURCODE='+CURCODE+'&TXCODE='+TXCODE+'&REMARK1='+REMARK1+'&REMARK2='+REMARK2;
		tmp0='MERCHANTID='+MERCHANTID+'&POSID='+POSID+'&BRANCHID='+BRANCHID+'&ORDERID='+ORDERID+'&PAYMENT='+PAYMENT+'&CURCODE='+CURCODE+'&TXCODE=520100'+'&REMARK1='+REMARK1+'&REMARK2='+REMARK2;
		temp_New=tmp;

		temp_New=tmp+'&TYPE=1&PUB='+document.getElementById("PUB32TR2").value+'&GATEWAY='+document.getElementById("GATEWAY").value+'&CLIENTIP='+document.getElementById("CLIENTIP").value+'&REGINFO='+escape(document.getElementById("REGINFO").value)+'&PROINFO='+escape(document.getElementById("PROINFO").value)+'&REFERER='+document.getElementById("MER_REFERER").value;
		temp_New1=tmp+'&TYPE=1&GATEWAY='+document.getElementById("GATEWAY").value+'&CLIENTIP='+document.getElementById("CLIENTIP").value+'&REGINFO='+escape(document.getElementById("REGINFO").value)+'&PROINFO='+escape(document.getElementById("PROINFO").value)+'&REFERER='+document.getElementById("MER_REFERER").value;

		strMD5=hex_md5(temp_New);
	    // URL = bankURL+'?CCB_IBSVersion=V5&'+tmp+'&MAC='+strMD5;
		// URL0 = bankURL+'?CCB_IBSVersion=V5&'+tmp0+'&MAC='+hex_md5(tmp0);
		URL3 = bankURL+'?'+temp_New1+'&MAC='+hex_md5(temp_New);
	    // document.getElementById("result").value=URL;
		document.getElementById("MAC").value=strMD5;


		var objMD5form=document.getElementById("MD5form");
		objMD5form.method="post";
		objMD5form.action=URL3;
		objMD5form.submit();
	}

}
