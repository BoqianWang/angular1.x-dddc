import 'bootstrap/dist/css/bootstrap.css';
import 'jquery-weui/dist/lib/weui.min.css';
import 'jquery-weui/dist/css/jquery-weui.min.css';
import './style.css';

import $ from 'jquery';
import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngInfiniteScroll from 'ng-infinite-scroll';
import duScroll from 'angular-scroll';

import 'jquery-weui/dist/js/jquery-weui.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

var app = angular.module('app', [uirouter,ngInfiniteScroll,duScroll]);
// var httpHeader = 'http://api.doudoudc.com';
// var httpHeader = 'http://192.169.18.110:8080/dddc'

app.config(require('./src/router/router.js'));
// 拦截器
app.factory('httpInterceptor', function($q){
	return {
		request: function(config) {

          return config;
        },
        response: function(response) {
          return response ;
        },
        responseError: function(response) {
          return $q.reject(response);
        },
        requestError : function(config){

        return $q.reject(config);
      }
	};
});
app.run(function($rootScope){

	$rootScope.$on('to-parent', function(event,data) {
         // console.log('ParentCtrl', data);       //父级能得到值
         $rootScope.childNum = data;
     });
});

app.controller('homeTabbarController', function($scope){

	 $scope.selete = 1;
	$scope.$watch('childNum', function(newValue, oldValue, scope) {
		$scope.selete = newValue;
	});
});

app.controller('homeShopController',require('./src/components/homeShop/home.shop.js'));
app.controller('homeOrderController', require('./src/components/homeOrder/home.order.js'));
app.controller('xiaxianController',require('./src/components/xiaxian/xiaxian.js'));
app.controller('sub_xiaxianController',require('./src/components/xiaxian/sub.xiaxian.js'));
app.controller('wmDishListController',require('./src/components/wmDish/wmDishlist.js'));
app.controller('orderSubmitController', require('./src/components/wmSubmit/wm_submit.js'));
app.controller('onlinePayController', require('./src/components/onlinePay/onlinePay.js'));
app.controller('homeCenterController', require('./src/components/homeCenter/home.center.js'));
app.controller('loginController', require('./src/components/login/login.js'));
app.controller('passworloginController', require('./src/components/login/passworlogin.js'));
app.controller('usermsgController',require('./src/components/userInfo/usermsg.js'));
app.controller('setPasswordController', require('./src/components/userInfo/setPassword.js'));
app.controller('jifenController', require('./src/components/jifen/jifen.js'));
app.controller('yuelistController', require('./src/components/yue/yuelist.js'));
app.controller('addresslistController', require('./src/components/address/addresslist.js'));
app.controller('editaddressController', require('./src/components/address/editAddress.js'));
app.controller('searchaddrController', require('./src/components/address/searchAddress.js'));
app.controller('tixianController', require('./src/components/yue/tixian.js'));
app.controller('addbankController', require('./src/components/yue/addBank.js'));
app.controller('orderDetailController', require('./src/components/orderDetail/orderDetail.js'));
app.controller('shareController', require('./src/components/share/share.js'));
app.controller('messageListController', require('./src/components/message/messagelist.js'));

// 店铺列表加载
app.factory('shopListReddit', require('./src/factory/shopListReddit.js'));

//地址列表
app.factory('addressFactory', require('./src/factory/addressFactory.js'));

// 订单加载
app.factory('Reddit', require('./src/factory/orderReddit.js'));

window.reqError = function(data){
	if (data.status==999) {
		$.toast('未登录', "text");
	}else {
		$.toast(data.message, "text");
	}
};

// 下线详情加载
app.factory('xiaxianReddit', require('./src/factory/xiaxianReddit.js'));

//店铺菜品加载
app.factory('dishListFactory',require('./src/factory/wm_dishList.js'));

//店铺详情加载
app.factory('shopDetailFactory', require('./src/factory/wm_shopDetail.js'));

// 消息中心数据加载
app.factory('messaReddit', require('./src/factory/messaReddit.js'));

// 获取验证码
window.reqTelCode = function ($scope,$http,$interval,phone){
	 		$scope.isreq = true;
 		$scope.codemsg = '获取中';
 		$scope.codeClass = 'code-faild';
		$scope.isCodeClick = false;

		$http({
			method:'POST',
			url:httpHeader +'/personal/phoneCode',
			data:{"username": phone},
			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
			var str = [];
			for(var p in obj){
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
			return str.join("&");
			}
		})
		.success(function(msg){
		    $scope.isreq = false;
			// var msg = JSON.parse(data);
			console.log(msg);
			if (msg.ret ==true) {
				$.toast("获取成功", "text");
				$scope.time = 60;
			    var timer = null;
			    timer = $interval(function(){
			        $scope.time = $scope.time - 1;
			        $scope.codemsg = $scope.time + "后获取";
			        $scope.codeClass = 'code-faild';
			        $scope.isCodeClick = false;
			        if($scope.time === 0) {
			        	$scope.codeClass = 'code-success';
			        	$scope.isCodeClick = true;
			        	$scope.codemsg = '获取验证码';
			            $interval.cancel(timer);
			        }
			    }, 1000);
			}else {
				 $scope.codeClass = 'code-success';
			      $scope.isCodeClick = true;
			      $scope.codemsg = '获取验证码';
				$.toast(msg.data, "text");

			}
		})
		.error(function(err){
			$scope.isreq = false;
			$scope.codeClass = 'code-success';
			 $scope.isCodeClick = true;
			  $scope.codemsg = '重新获取';
		})
}

//个人中心
app.factory('centerFactory', require('./src/factory/centerFactory.js'));

// get请求
app.factory('getHttpFactory', require('./src/factory/getHttpFactory.js'));

// post请求
app.factory('postHttpFactory', require('./src/factory/postHttpFactory.js'));
