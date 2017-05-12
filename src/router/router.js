module.exports =  function($stateProvider, $urlRouterProvider,$httpProvider) {
	$httpProvider.interceptors.push('httpInterceptor');
	$urlRouterProvider.otherwise('/home/shop');

	$stateProvider
	.state('homeTabs',{
		url: "/homeTabs",
		views:{
			"":{templateUrl: './src/components/tabBarNav/homeTabs.html'},
			"nav@homeTabs":{
				templateUrl: './src/components/tabBarNav/home-nav.html'
			},
		}
	})
	.state('homeTabs.login',{
		url:'/login',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/login/login.html',
				controller: 'loginController'
			}
		}

	})
	.state('homeTabs.passworlogin',{
		url:'/passworlogin',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/login/passworLogin.html',
				controller: 'passworloginController'
			}
		}

	})
	.state('homeTabs.usermsg',{
		url:'/usermsg',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/userInfo/usermsg.html',
					controller: 'usermsgController'
			}
		}

	})
	.state('homeTabs.setpassword',{
		url:'/setpassword/:loginPassword',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/userInfo/setPassword.html',
					controller: 'setPasswordController'
			}
		}

	})
	.state('homeTabs.addresslist',{
		url:'/addresslist',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/address/addressList.html',
					controller: 'addresslistController'
			}
		}

	})
	.state('homeTabs.editaddress',{
		url:'/editaddress',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/address/editAddress.html',
					controller: 'editaddressController'
			}
		}

	})
	.state('homeTabs.searchaddr',{
		url:'/searchaddr',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/address/searchAddr.html',
					controller: 'searchaddrController'
			}
		}

	})
	.state('homeTabs.jifen',{
		url:'/jifen/:point',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/jifen/jifen.html',
					controller: 'jifenController'
			}
		}

	})
	.state('homeTabs.yuelist',{
		url:'/yuelist/:yue',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/yue/yueList.html',
					controller: 'yuelistController'
			}
		}

	})
	.state('homeTabs.tixian',{
		url:'/tixian',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/yue/tixian.html',
					controller: 'tixianController'
			}
		}

	})
	.state('homeTabs.xiaxian',{
		url:'/xiaxian',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/xiaxian/xiaxian.html',
					controller: 'xiaxianController'
			}
		}

	})
	.state('homeTabs.sub_xiaxian',{
		url:'/sub_xiaxian/:type',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/xiaxian/sub_xiaxian.html',
					controller: 'sub_xiaxianController'
			}
		}

	})
	.state('homeTabs.share',{
		url:'/share',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/share/share.html',
					controller: 'shareController'
			}
		}

	})
	.state('homeTabs.addbank',{
		url:'/addbank',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/yue/addBank.html',
					controller: 'addbankController'
			}
		}

	})
	.state('homeTabs.messagelist',{
		url:'/messagelist',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/message/messageList.html',
					controller: 'messageListController'
			}
		}

	})
	.state('home',{
		url: "/home",
		views:{
			"":{templateUrl: './src/components/tabBarNav/home.html'},
			"tabbar@home":{
				templateUrl: './src/components/tabBarNav/home-tabbar.html',
				controller: 'homeTabbarController'
			},
		}
	})
	.state('home.shop',{
		url: "/shop",
		views:{
			"body@home":{
				templateUrl: './src/components/homeShop/home-shop.html',
				controller: 'homeShopController'
			}
		}
	})
	.state('homeTabs.wmdishlist',{
		url:'/wmdishlist/:bizId',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/wmDish/wmDishList.html',
					controller: 'wmDishListController'
			}
		}

	})
	.state('homeTabs.ordersubmit',{
		url:'/ordersubmit',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/wmSubmit/orderSubmit.html',
					controller: 'orderSubmitController'
			}
		}

	})
	.state('homeTabs.onlinepay',{
		url:'/onlinepay',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/onlinePay/onlinePay.html',
					controller: 'onlinePayController'
			}
		}

	})
	.state('home.order',{
		url: "/order",
		views:{
			"body@home":{
				templateUrl: './src/components/homeOrder/home-order.html',
				 controller : 'homeOrderController'
				// controllerAs: 'ctrho'
			}
		}
	})
	.state('homeTabs.orderdetail',{
		url:'/orderdetail?orderType&orderId&img&bizId&shopName',
		views:{
			"navbody@homeTabs":{
				templateUrl: './src/components/orderDetail/orderDetail.html',
					controller: 'orderDetailController'
			}
		}

	})
	.state('home.center',{
		url: "/center",
		views:{
			"body@home":{
				templateUrl: './src/components/homeCenter/home-center.html',
				 controller : 'homeCenterController',
				 controllerAs: 'ctrhc'
			}
		}
	})
}
