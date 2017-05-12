module.exports = function($http) {
  var Reddit = function(type) {
    this.items = [];
    this.busy = false;
    this.after = 1;
    this.loading = false;
    this.typenum = type;
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;
    this.loading = true;
    // var url = "https://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
    var urldata = {"page":this.after,"type":this.typenum};
	$http({
		method:'GET',
		url:httpHeader +'/personalCentre/oneSpread',
		params:{"page":this.after,"type":this.typenum}
	})
    .success(function(data) {
    	console.log(data);
     if (data.ret==true) {
	      var items = data.oneSpread;
	      for (var i = 0; i < items.length; i++) {
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
