////////////////////////////////// BBOX CREATOR

function sinh (arg, callback) {
	
	var e = Math.E;
        var p = Math.pow(e, arg);
        var n = 1 / p;
	callback ((p-n) / 2);

	//callback ((Math.exp(arg) - Math.exp(-arg)) / 2);
}

function toDegrees (arg, callback) {
	callback (arg * (180/Math.PI));
}


function tile2lon(zoom, x, callback) {
	callback (x / Math.pow(2.0, zoom) * 360.0 - 180);
}

function tile2lat(zoom, y, callback) {

	var n = Math.PI - (2.0 * Math.PI * y) / Math.pow(2.0, zoom);
	sinh(n, function(result1){
		toDegrees(Math.atan(result1), function(result2){
	      		callback (result2);
		});
	});
}

exports.getBbox = function getBbox(zoom, x, y, callback){

	tile2lat(zoom, y, function (t){

		var top = t;
		tile2lat(zoom, y+1, function (b){
				
			var bottom = b;
			tile2lon(zoom, x, function (l){
					
				var left = l;
				tile2lon(zoom, x+1, function (r){
							
					var right = r;
					callback(left, top, right, bottom);
					});
					
				});
			});
	});
}
