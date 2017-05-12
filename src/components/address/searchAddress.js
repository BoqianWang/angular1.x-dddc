module.exports = function($scope,$http,$rootScope){

	$rootScope.navTitle = "搜索地址";
	$rootScope.rightShow = false;
		// 百度地图API功能
	var map = new BMap.Map("allmap");
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
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

		if ($scope.txtaddr =="") {
			return;
		}

		local.search($scope.txtaddr);
	}

	$scope.searchClick = function(){

		local.search($scope.txtaddr);
	}

	$scope.backEditAddr = function(list){

		sessionStorage.setItem('txtaddr', JSON.stringify(list));
		history.back();
	}
}
