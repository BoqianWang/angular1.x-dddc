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
    // var url = "https://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
    var urldata = {"page":this.after};
	var urlstr  = JSON.stringify(urldata);
	$http({
		method:'GET',
		url:httpHeader +'/personalCentre/messageList',
		params:urlstr
	})
    .success(function(data) {
    	console.log(data);
     if (data.ret) {
	      var items = data.messageList;
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
