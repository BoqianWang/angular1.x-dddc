module.exports = function($state,$scope,$stateParams,dishListFactory,shopDetailFactory,$rootScope){
	$rootScope.navTitle = "";
	// sessionStorage.removeItem("dishArr");
	sessionStorage.removeItem("checkAddr");//因为没一次进入店铺详情，店铺不同，经纬度可能不用，所以把选中的地址删除
	var bizId = $stateParams.bizId;
	// 购物车总数量
	$scope.zongNum = 0;
	$scope.zongPrice = 0; //购物车总价钱

	// $rootScope.rightShow = true;
	//  $(".nav_right").html("<img src = 'images/touxiang.png' width='20x' height='20px'>");


	// 菜品列表请求
	dishListFactory.getData(bizId).then(function(response){
	console.log(response);
		$scope.classArr =response.data.dishClassifyTakeaway;
		var alldishArr = [];
		for (var i = 0; i < response.data.dishClassifyTakeaway.length; i++) {
			var calssObj = response.data.dishClassifyTakeaway[i];
			calssObj.subDishArr = [];
			var classId = response.data.dishClassifyTakeaway[i].dishClassifyId;
			for ( x in response.data.dishTakeaway) {
				 if (response.data.dishTakeaway[x].dishClassifyTakeaway == classId) {
				 		calssObj.subDishArr.push(response.data.dishTakeaway[x]);
				 }
			}

			alldishArr.push(calssObj);
		}
		$scope.dishArr = alldishArr;
		setTimeout(function(){
			var dishstr = sessionStorage.getItem("dishArr");
			if (!dishstr) {return;}
			var localdishArr = dishstr.split("&&");
			for (var i = 0; i < alldishArr.length; i++) {
				var cl_obj = alldishArr[i];
				for (var j = 0; j < cl_obj.subDishArr.length; j++) {
					var subDish = cl_obj.subDishArr[j];
					var num = 0;
					for (var l = 0; l < localdishArr.length; l++) {
						var localdish = JSON.parse(localdishArr[l]);
						if (localdish.dishId == subDish.dishId) {
							num  = num + localdish.dishNum;
						}
					}
					if (num>0) {
						$("#"+subDish.dishId+">div").text(num);
						$("#"+subDish.dishId).css("display","inline");
					}
				}
			}
		},100);
		var chaList = new Object();
		chaList.dishId = 0;
		chakanNum(chaList);//请求完数据后统计购物车所有的金额和数量，传一个不存在的dishId
	})

	// 店铺详情请求
	shopDetailFactory.getData(bizId).then(function(response){
		console.log(response);
		$scope.list = response.data;
		var bizDetailStr = sessionStorage.getItem("bizDetail");
		if (bizDetailStr) {
			var localBiz =  JSON.parse(bizDetailStr);
			if (localBiz.bizId != response.data.bizId) {
				sessionStorage.removeItem("dishArr");//当进入不同商家的时候删除上次保存的菜品
			}
		}
		sessionStorage.setItem("bizDetail", JSON.stringify(response.data));
		var fulls = [];
		var firsts = [];
		$scope.firsts = [];
		for(var j = 0; j<response.data.takeawayFullSubtracts.length;j++){
			if (response.data.takeawayFullSubtracts[j].activityType==1) {
				var str = "满"+response.data.takeawayFullSubtracts[j].fullSubtractAmount + "减" +response.data.takeawayFullSubtracts[j].amount;
				fulls.push(str);
			}else{
				var str = "首单减" +response.data.takeawayFullSubtracts[j].amount;
				firsts.push(str);
			}
		 }
		 $scope.fulls = fulls;
		setTimeout(function () {
		    var topHeight = window.screen.availHeight - $("#topShop").outerHeight(true)-50;
		    $(".dishRow").css("height",topHeight+"px");
		  	console.log("top高度"+topHeight);
		  }, 100);
	});

	// 定义多规格的规格名和口味名
	var sizeName = "";
	var tasteName = "";
	// 弹出菜品多规格模态框
	$scope.modelShow = function(dishList){
		$scope.dishDetail = dishList;
		$scope.sizeId = dishList.takeawayDishStandards[0].standardId;
		$scope.sizePrice = dishList.takeawayDishStandards[0].goingPrice;
		sizeName = dishList.takeawayDishStandards[0].standardName;
		if (dishList.takeawayDishTaste.length>0) {
			$scope.tasteId = dishList.takeawayDishTaste[0].tasteId;
			tasteName = dishList.takeawayDishTaste[0].tasteName;
		}
		$('#myModal').modal('show');
	}
	// 显示或者隐藏购物车列表
	var isShow = true;
	$scope.showGwcClick  = function(){
		if (isShow) {
			var dishstr = sessionStorage.getItem("dishArr");
			var dishArr = dishstr.split("&&");
			if (dishArr.length==0) {return;}
			$scope.gwcArr = [];
			for (var i = 0; i < dishArr.length; i++) {
				 	var dish = JSON.parse(dishArr[i]);
				 	$scope.gwcArr.push(dish);
				};
			$("#wmgwc").popup();
		}else {
			$.closePopup();
		}
		isShow = !isShow;
	}
	// 	规格选择
	$scope.sizeClick = function(sizeObj){

		$scope.sizeId = sizeObj.standardId;
		$scope.sizePrice = sizeObj.goingPrice;
		sizeName = sizeObj.standardName;
	}
	// 口味选择
	$scope.tasteClick = function(tasteObj){

		$scope.tasteId = tasteObj.tasteId;
		tasteName = tasteObj.tasteName;
	}
	// 正常菜品点击添加
	$scope.addNomalDishClick = function(dishlist){
		insertDish(dishlist.dishName,dishlist.dishId,dishlist.takeawayDishStandards[0].standardId,"",dishlist.takeawayDishStandards[0].goingPrice);
		chakanNum(dishlist);

	}

	// 多规格添加菜品
	$scope.moreSizeDishClick = function(dishlist){
		var si_ta_arr = [];
		si_ta_arr.push(sizeName);
		if (tasteName.length>0) {si_ta_arr.push(tasteName)}

		insertDish(dishlist.dishName,dishlist.dishId,$scope.sizeId,si_ta_arr.join("，"),$scope.sizePrice);
		chakanNum(dishlist);

			$('#myModal').modal('hide');
	}

	// 购物车添加菜品
	$scope.gwcAddClick = function(dishlist){
		insertDish(dishlist.dishName,dishlist.dishId,dishlist.sizeId,dishlist.si_ta_name,dishlist.dishPrice);
		chakanNum(dishlist);
	}

	// 购物车减去菜品
	$scope.gwcReduceClick = function(dishlist){
		reduceDish(dishlist.dishId,dishlist.sizeId,dishlist.si_ta_name);
			chakanNum(dishlist);
	}
	// 减去菜品点击事件
	$scope.reduceClick = function(dishlist){
		if (dishlist.takeawayDishStandards.length<2&&dishlist.takeawayDishTaste.length==0) {
			reduceDish(dishlist.dishId,dishlist.takeawayDishStandards[0].standardId,"");
			chakanNum(dishlist);
		}else {
			$.toast("多种规格请在购物车操作", "text");
		}

	}

	// 清空购物车
	$scope.deleteShopingClick = function(){

		sessionStorage.removeItem("dishArr");
		isShow = true;
		$.closePopup();
		$scope.zongNum = 0;
		$scope.zongPrice = 0;
		$(".jian_num").css("display","none");
	}

	function chakanNum (dishlist) {
		$scope.zongNum = 0;
		$scope.zongPrice = 0;
		var dishstr = sessionStorage.getItem("dishArr");
			var dishArr = dishstr.split("&&");
			var num = 0;
			var gwcDishArr  = [];
			if (dishstr.length>0) {
				for (var i = 0; i < dishArr.length; i++) {
				 	var dish = JSON.parse(dishArr[i]);
				 	gwcDishArr.push(dish);
				 	$scope.zongNum  += dish.dishNum;
				 	$scope.zongPrice = $scope.zongPrice + dish.dishNum*dish.dishPrice;
				 	if (dish.dishId==dishlist.dishId) {

				 		num  = num + dish.dishNum;
				 	};
				};
				$scope.zongPrice = Math.floor($scope.zongPrice  * 100) / 100  ;
			}else {
				isShow = true;
				$.closePopup();
			}

			console.log(num);
			$("#"+dishlist.dishId+">div").text(num);
			if (num>0) {
				$("#"+dishlist.dishId).css("display","inline");
			}else{
				$("#"+dishlist.dishId).css("display","none");
			}

			$scope.gwcArr = gwcDishArr;
	}
	// 插入增加菜品
	function insertDish(di_name,di_id,si_id,si_ta_name,di_price){
		var dishstr = sessionStorage.getItem("dishArr");
		var dishArr = [];
		if (!dishstr) {
			var dishObj =  new Object();
			dishObj.dishId = di_id;
			dishObj.dishName  = di_name;
			dishObj.sizeId  = si_id;
			dishObj.si_ta_name  = si_ta_name;
			dishObj.dishNum = 1;
			dishObj.dishPrice = di_price;
			dishArr.push(JSON.stringify(dishObj));
			var b = dishArr.join("&&");
			sessionStorage.setItem("dishArr",b);
		}else{
			dishArr = dishstr.split("&&");
			var isNew = true;
			for (var i = 0; i < dishArr.length; i++) {
			 	var dish = JSON.parse(dishArr[i]);
			 	if (dish.dishId==di_id&&dish.sizeId==si_id&&dish.si_ta_name==si_ta_name) {
			 		dish.dishNum += 1;
			 		dishArr.splice(i,1,JSON.stringify(dish));
			 		console.log(dishArr);
			 		sessionStorage.setItem("dishArr",dishArr.join("&&"));
			 		isNew  = false;
			 		break;
			 	};
			};
			if (isNew) {
				var dishObj =  new Object();
				dishObj.dishId = di_id;
				dishObj.dishName  = di_name;
				dishObj.sizeId  = si_id;
				dishObj.si_ta_name  = si_ta_name;
				dishObj.dishNum = 1;
				dishObj.dishPrice = di_price;
				dishArr.push(JSON.stringify(dishObj));
				var b = dishArr.join("&&");
				sessionStorage.setItem("dishArr",b);
			};
		}
	}


	// 减少菜品
	function reduceDish (di_id,si_id,si_ta_name) {

		var dishstr = sessionStorage.getItem("dishArr");
		var dishArr = dishstr.split("&&");
		for (var i = 0; i < dishArr.length; i++) {
			 	var dish = JSON.parse(dishArr[i]);
			 	if (dish.dishId==di_id&&dish.sizeId==si_id&&dish.si_ta_name==si_ta_name) {
			 		dish.dishNum -= 1;
			 		if (dish.dishNum==0) {
						dishArr.splice(i,1);
			 		}else {
			 			dishArr.splice(i,1,JSON.stringify(dish));
			 		}

			 		console.log(dishArr);
			 		sessionStorage.setItem("dishArr",dishArr.join("&&"));
			 		break;
			 	};
		};
	}


}
