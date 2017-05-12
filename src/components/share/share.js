require('../../library/jquery.qrcode.min.js');

module.exports = function($scope,$rootScope,getHttpFactory){
	$rootScope.navTitle = "分享二维码";
	getHttpFactory.getData("/personalCentre/twoCode").then(function(data){
		if (data.ret==true) {
			var urlstr = data.spreadUrl;
			$("#qrcode").qrcode(urlstr);
		}
	})
}
