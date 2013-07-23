////////////////////////////////// BBOX CREATOR

// http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_.28JavaScript.2FActionScript.2C_etc..29

function tile2lon(zoom, x, callback) {
	callback (x / Math.pow(2, zoom) * 360 - 180);
}

function tile2lat(zoom, y, callback) {
	var n = Math.PI - (2 * Math.PI * y) / Math.pow(2, zoom);
	callback (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
}

function lon2tile(zoom, lon, callback) { 
	callback (Math.floor( (lon + 180) / 360 * Math.pow(2 , zoom)));
}

function lat2tile(zoom, lat, callback) { 
	callback (Math.floor( (1-Math.log( Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)));
}

exports.getLTRBbox = function getLTRBbox(zoom, x, y, callback){

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

exports.getXYbox = function getXYbox(zoom, left, top, right, bottom, callback){

	lat2tile(zoom, top, function (t){

		var minY = t;
		lat2tile(zoom, bottom, function (b){
				
			var maxY = b;
			lon2tile(zoom, left, function (l){
					
				var minX = l;
				lon2tile(zoom, right, function (r){
							
					var maxX = r;
					callback(zoom, minX, minY, maxX, maxY);
					});
				});
			});
	});
  
}