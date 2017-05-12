module.exports = function($scope,$state,$rootScope,addressFactory){
	$rootScope.navTitle = "我的地址";
	$rootScope.rightShow = false;
	$scope.isloading = true;
	var checkAddrstr = sessionStorage.getItem("checkAddr");// 看从订单提交界面是否有可用的地址存在
	addressFactory.getData().then(function(data){
		$scope.isloading = false;
		if (data.ret) {
			var isHaveAddr = false;
			if (checkAddrstr) {
				for (var i = 0; i < data.list.length; i++) {
					var checkAddr = JSON.parse(checkAddrstr);
					if (checkAddr.addrId == data.list[i].addrId) {
						data.list[i].check = true;
						isHaveAddr = true;
					}else{
						data.list[i].check = false;
					}
				}
			}
			if (isHaveAddr == false) {sessionStorage.removeItem("checkAddr");}
			$scope.addressList = data.list;
		}else {
			 reqError(data);
		}
	},function(data){//错误的时候走这里
		$scope.isloading = false;
		console.log(data);
	});

	$scope.checkClick = function(list){

		var bizStr = sessionStorage.getItem("bizDetail");
		var bizObj = JSON.parse(bizStr);
		var map = new BMap.Map("allmap");
     	var pointA = new BMap.Point(bizObj.lat,bizObj.lon);
		var pointB = new BMap.Point(list.lat,list.lon);
	     var disNum = map.getDistance(pointA,pointB);
	     if (disNum>5000) {
	     	$.toast('超出店家配送范围','text');
	     	return;
	     }


		sessionStorage.setItem("checkAddr", JSON.stringify(list));

		for (var i = 0; i < $scope.addressList.length; i++) {
			$scope.addressList[i].check = false;
		}

		list.check = true;

		setTimeout(function () {
		    history.back();
		  }, 100);
	}

	$scope.goEditAddr = function(){
		sessionStorage.removeItem('txtaddr');
		sessionStorage.removeItem('editObj');
		$state.go('homeTabs.editaddress');
	}

	$scope.updateAddr = function(list){
		var editObj = new Object();
		editObj.name = list.consignee;
		editObj.tel  = list.phone;
		editObj.sex = list.gender;
		editObj.addrId = list.addrId;
		sessionStorage.setItem('editObj',JSON.stringify(editObj));


		editObj.title = list.locationAddr;
	 	editObj.address = list.homeNumber;
	 	editObj.point =  new Object();
	 	 editObj.point.lat = list.lat;
	 	 editObj.point.lng = list.lon;

	 	 sessionStorage.setItem('txtaddr', JSON.stringify(editObj));

	 	 $state.go('homeTabs.editaddress');

	}
}
