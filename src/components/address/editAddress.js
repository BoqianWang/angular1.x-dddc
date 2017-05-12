module.exports = function($scope, $http, $rootScope, $state) {
  $rootScope.navTitle = "添加地址";
  $scope.mapaddr = "";
  $scope.detailaddr = "";
  var lat = "";
  var lon = "";
  var addrId = "";
  $rootScope.rightBtnClick = function() {
    //删除地址
    $http({
      method: 'POST',
      url: httpHeader + '/personalAddress/delete',
      data: {
        "addrId": addrId
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: function(obj) {
        var str = [];
        for (var p in obj) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
      }
    }).success(function(req) {
      reqResult(req);
    })
  }
  $scope.editaddrClick = function() {

    var name = $("#addr-name").val();
    var tel = $("#addr-tel").val();
    if (name.length == 0) {
      $.toast('名字不能为空', "text");
      return;
    }
    if (tel.length == 0) {
      $.toast('手机号空', 'text');
      return;
    }
    if ($scope.check == null) {
      $.toast('选择性别', 'text');
      return;
    }
    if ($scope.mapaddr.length == 0) {
      $.toast('请选择地址', 'text');
      return;
    }
    if ($scope.detailaddr.length == 0) {
      $.toast('请填写详细地址', 'text');
      return;
    }
    if (addrId == "") { //添加地址
      $.post(httpHeader + '/personalAddress/insertAddress', {
        "consignee": name,
        "gender": $scope.check,
        "lat": lat,
        "lon": lon,
        "locationAddr": $scope.mapaddr,
        "homeNumber": $scope.detailaddr,
        "phone": tel
      }, function(data) {
        reqResult(data);
      }, 'json');
    } else { //修改地址
      $.post(httpHeader + '/personalAddress/update', {
        "consignee": name,
        "gender": $scope.check,
        "lat": lat,
        "lon": lon,
        "locationAddr": $scope.mapaddr,
        "homeNumber": $scope.detailaddr,
        "phone": tel,
        "addrId": addrId
      }, function(data) {
        reqResult(data);
      }, 'json');
    }

  }

  // 请求返回处理
  function reqResult(data) {
    console.log(data);
    if (data.ret == true || data.status == 1) {
      window.history.back();
    } else {
      reqError(data);
    }
  }

  $scope.searchClick = function() {
    var editObj = new Object();
    editObj.name = $("#addr-name").val();
    editObj.tel = $("#addr-tel").val();
    editObj.sex = $scope.check;
    editObj.addrId = addrId;
    sessionStorage.setItem('editObj', JSON.stringify(editObj));
    $state.go('homeTabs.searchaddr');
  }
  // 返回该界面时候去读取缓存中用户填写的信息
  var txtEdit = sessionStorage.getItem('editObj');
  if (txtEdit) {
    var editObj = JSON.parse(txtEdit);
    $("#addr-name").val(editObj.name);
    $("#addr-tel").val(editObj.tel);
    $scope.check = editObj.sex;
    if (editObj.addrId) {
      addrId = editObj.addrId;
      $rootScope.navTitle = "修改地址";
      $rootScope.rightShow = true;
      $(".nav_right").text("删除");
    }
  }
  // 返回该界面时候去读取缓存中地址的信息
  var txtaddr = sessionStorage.getItem('txtaddr');
  if (txtaddr) {
    var list = JSON.parse(txtaddr);
    $scope.mapaddr = list.title;
    $scope.detailaddr = list.address;
    lat = list.point.lat;
    lon = list.point.lng;
  }


}
