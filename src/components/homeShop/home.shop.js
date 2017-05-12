 module.exports = function($scope,$http,shopListReddit,$rootScope,addressFactory){
	$rootScope.headTitle = "豆豆点餐";
	$scope.$emit('to-parent', '1');
	if (sessionStorage.getItem('lat')) {
		$scope.currentAddress = sessionStorage.getItem('rs_address');
		$scope.reddit = new shopListReddit();
	}
	else{
		$scope.currentAddress = "获取当前地址...";
			// 百度地图API功能
		var geolocation = new BMap.Geolocation();
		var geoc = new BMap.Geocoder();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				var mk = new BMap.Marker(r.point);
				console.log('您的位置：'+r.point.lng+','+r.point.lat);
				geoc.getLocation(r.point, function(rs){
				var addComp = rs.addressComponents;
				$scope.$apply(function () {
					sessionStorage.setItem('lat',r.point.lat);
					sessionStorage.setItem('lng',r.point.lng);
					sessionStorage.setItem('rs_address',rs.address);
		     　　	$scope.currentAddress = rs.address;
			     });
				});

				$scope.reddit = new shopListReddit();
			}
			else {
				$scope.$apply(function () {
		     　　	$scope.currentAddress = "获取地址失败";
			     });
			}
		},{enableHighAccuracy: true})
	}

	$scope.popShopClick = function(){

		$("#seleteAddr").popup();

		addressFactory.getData().then(function(data){
			if (data.ret) {
				$scope.addressList = data.list;
			}else {
				 // reqError(data);
			}
		},function(data){//错误的时候走这里

		});

	}

	$scope.seleteAddrClick = function(list){

		sessionStorage.setItem('lat',list.lat);
		sessionStorage.setItem('lng',list.lon);
		sessionStorage.setItem('rs_address',list.locationAddr);
		$.closePopup();
		history.go(0) ;
	}


	var map = new BMap.Map("allmap");
	// map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
	var options = {
	      onSearchComplete: function(results){
	          if (local.getStatus() == BMAP_STATUS_SUCCESS){
	                // 判断状态是否正确
	                var s = [];
	                for (var i = 0; i < results.getCurrentNumPois(); i ++){
	                    s.push(results.getPoi(i));
	                }
	              	$scope.addrList =  s;
	          }
	      }
	 };
	var local = new BMap.LocalSearch(map, options);

	$scope.addressChange = function (){

		// if ($scope.txtaddr =="") {
		// 	return;
		// }

		local.search($scope.txtaddr);
	}

	$scope.searchClick = function(){


	}

	$(".selteadd_input").keypress(function(e){
	  if(e.keyCode === 13) {
	    // 处理相关逻辑
	    local.search($scope.txtaddr);
	  }
	})

	$scope.backhomeShop = function(list){

		sessionStorage.setItem('lat',list.point.lat);
		sessionStorage.setItem('lng',list.point.lng);
		sessionStorage.setItem('rs_address',list.title);
		$.closePopup();
		history.go(0) ;
	}

}
