module.exports = function($http) {
  var Reddit = function() {
    this.items = [];
    this.busy = false;
    this.after = 1;
    this.loading = false;
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;
    this.loading = true;
    var lat = sessionStorage.getItem("lat");
    var lng = sessionStorage.getItem("lng");
    var urldata = {"page":this.after,"lat":lat,"lon":lng};
	var urlstr  = JSON.stringify(urldata);
	$http({
		method:'GET',
		url:httpHeader +'/H5Index/index',
		params:{"j":urlstr}
	})
    .success(function(data) {
    	console.log(data);
     if (data.status==1) {
     	var map = new BMap.Map("allmap");
     	var pointA = new BMap.Point(lat,lng);
     	if (!data.result.shop) {
     		this.busy = true;
	  	 	this.loading = false;
	  	 	return;
	  	 }
	      var items = data.result.shop;
	      for (var i = 0; i < items.length; i++) {
	      	// var pointA = new BMap.Point(lat,lng);
	      	var pointB = new BMap.Point(items[i].lat,items[i].lon);
	      	var disNum = map.getDistance(pointA,pointB);
	      	items[i].distance = disNum>1000?(disNum/1000).toFixed(2) + 'km' :parseInt(disNum) +'m';
	      	items[i].scoringWidth = {"width": items[i].scoring*12 +'px'};
	      	items[i].fulls = [];
	      	items[i].firsts = [];
	      	for(var j = 0; j<items[i].TakeawayFullSubtract.length;j++){
	      		if (items[i].TakeawayFullSubtract[j].activityType==1) {
	      			var str = "满"+items[i].TakeawayFullSubtract[j].fullSubtractAmount + "减" +items[i].TakeawayFullSubtract[j].amount;
	      			items[i].fulls.push(str);
	      		}else{
	      			var str = "首单减" +items[i].TakeawayFullSubtract[j].amount;
	      			items[i].firsts.push(str);
	      		}
	      	}
	        this.items.push(items[i]);
	      }
	      this.after += 1;
	      this.busy = false;
	      if (items.length<20) {
	      	this.busy = true;
	      	this.loading = false;
	      }
	  }else {
	  	this.busy = true;
	  	this.loading = false;
	  	reqError(data);
	  }
    }.bind(this));
  };

  return Reddit;
}
