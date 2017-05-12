module.exports = function($rootScope,$scope,addressFactory,postHttpFactory,$state){

	$rootScope.navTitle = "订单提交";
	 var bizStr = sessionStorage.getItem("bizDetail");
	 $scope.shopList = JSON.parse(bizStr);
	 var checkAddStr = sessionStorage.getItem("checkAddr");
	 if (checkAddStr) {
	 	$scope.adress = JSON.parse(checkAddStr);
	 }else {
	 	addressFactory.getData().then(function(data){
			if (data.ret) {
				var map = new BMap.Map("allmap");
     			var pointA = new BMap.Point($scope.shopList.lat,$scope.shopList.lon);
				for (var i = 0; i < data.list.length; i++) {
					var pointB = new BMap.Point(data.list[i].lat,data.list[i].lon);
	      			var disNum = map.getDistance(pointA,pointB);
	      			if (disNum<5000) {
	      				$scope.adress = data.list[i];
	      				sessionStorage.setItem("checkAddr", JSON.stringify(data.list[i]));
	      				break;
	      			}
				}


			}else {
				 // reqError(data);
			}
		},function(data){//错误的时候走这里

		});
	 }

	 var dishstr = sessionStorage.getItem("dishArr");
	 var dishArr = dishstr.split("&&");
	 var gwcDishArr  = [];
	 $scope.gwcPrice = 0;//购物车总价钱
	 $scope.yhPrice = 0;//优惠价格
	var dishSizeIds = []; // 菜品规格数组
	var dishNums = [];//菜品数量数组
	var dishNames = [];//出品名称数组
	var activityId = 0; //满减Id；
	 for (var i = 0; i < dishArr.length; i++) {
		var dish = JSON.parse(dishArr[i]);
		gwcDishArr.push(dish);
		$scope.gwcPrice = $scope.gwcPrice + dish.dishNum*dish.dishPrice;
		dishSizeIds.push(dish.sizeId);
		dishNums.push(dish.dishNum);
		var tasName  = dish.si_ta_name==""? "": "("+dish.si_ta_name+")";
		var dishname_ta  = dish.dishName + tasName;
		dishNames.push(dishname_ta);
	 };
	 $scope.gwcPrice = Math.floor($scope.gwcPrice  * 100) / 100   +$scope.shopList.distributionFee ;

	 $scope.gwcArr = gwcDishArr;
	 $scope.fullPrice = 0;
	 var fulls = JSON.parse(bizStr).takeawayFullSubtracts;
	 for (var i = 0; i < fulls.length; i++) {
	 	if (fulls[i].activityType ==  1) {
	 		if ($scope.gwcPrice>=fulls[i].fullSubtractAmount) {
	 			if ($scope.fullPrice<fulls[i].amount) {
	 				$scope.fullPrice =  fulls[i].amount;
	 				activityId = fulls[i].tId;
	 			}
	 		}
	 	}
	 }
	$scope.orderPrice = $scope.gwcPrice - $scope.fullPrice;//待支付的总价钱


	$scope.orderSubClick = function(){
		if (!$scope.adress) {
			$.toast("请选择送餐地址", "text");
		}

		var urlData = {"bizId":$scope.shopList.bizId,
					   "orderPayCost":$scope.orderPrice,
					   "addrId":$scope.adress.addrId,
					   "dishs":dishSizeIds.join(","),
					   "dishNums":dishNums.join(","),
					   "dishNames":dishNames.join(","),
					   "distributionFee":$scope.shopList.distributionFee,
					   "paymentType":"1",
					   "orderRemark":$("#ordersubremark").val(),
					   "takeawayArriveTime":"尽快送达",
					   "prId":"0",
					   "activityFirstId":"",
					   "activityId":activityId
						};
		postHttpFactory.postData('/user/submitOrderTakeaway',urlData).then(function(response){
			if (response.ret==true) {
				sessionStorage.removeItem("payInfo");
				var orderObj =  new Object();
				orderObj.orderUuid = response.data.orderUuid;
				orderObj.orderPayCost = response.data.order.orderPayCost;
				sessionStorage.setItem("payInfo", JSON.stringify(orderObj));

				$state.go("homeTabs.onlinepay");

			}
		});


	}
}
