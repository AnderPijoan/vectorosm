////////////////////////////////// TILE CREATOR

var fs = require('fs'),
    pg = require('pg'),
    qc = require('./queryCreator'),
    rp = require('./resultParser'),
    bc = require('./bboxCreator'),
    ut = require('../utils/utils'),
    conString = 'tcp://gisuser:gisuser@energia.deusto.es:5432/gis',
    client = new pg.Client(conString);
    
////////////////////////////////// CONNECT TO DB
    
exports.connect = function connect(callback){
  
    client.connect( function(error) {
	if (error){
		callback(error);
	}
	else {
		callback();
	} 
    });
}

////////////////////////////////// END DB CONNECTION
    
exports.disconnect = function disconnect(callback){
    client.end();
    callback();
}


////////////////////////////////// GENERATE ONE TILE ONLY

exports.generateTile = function generateTile(z, x, y, callback){
//console.log(('[TILECREATOR.JS] Asked for ' + z + '/' + x + '/' + y + ' tile').yellow);

	bc.getBbox(z, x, y, function (l, t, r, b){

	//console.log(('[TILECREATOR.JS] Bounding Box for ' + z + '/' + x + '/' + y + ' tile : [' + l + ',' +  t + ',' + r + ',' + b + ']').yellow);

	if (l || t || r || b){

		var query = qc.getQuery(z, l, t, r, b);

		client.query(query, function(error, result) {

			var fileName = 'public/tiles/' + z + '/' + x + '/' + y + '.json';

			if (!error){

				rp.parseResult(result, function(parsedResult){
					if (parsedResult) {
						ut.fileExists(fileName, parsedResult, function(exists, stream, file){
							if (exists){
								fs.unlinkSync(file);
							}
							fs.writeFile(file, stream, function(error) {
								if(error) {
									console.log(('[TILECREATOR.JS] Error generating ' + file + ' - ' + error).red);
									callback(error);
								} else {
									//console.log(('[TILECREATOR.JS] Succesfully generated ' + file).green);
									callback();
								}
							});
						});
						
					}
				});
			} else {
				console.log(('[TILECREATOR.JS] Error generating ' + fileName + ' - ' + error).red);
			}
		});
	} else {
		console.log(('[TILECREATOR.JS] Error calculating bbox for ' +  z + '/' + x + '/' + y + ' tile ').red);
	}
	});

}


////////////////////////////////// GENERATE ONE ZOOM LEVEL ONLY

exports.generateZoomTiles = function generateZoomTiles(z, callback){
console.log(('[TILECREATOR.JS] Asked for ' + z + ' zoom level tiles').yellow);

ut.dirExists('public/tiles/' + z, z, function(result, temp, dir){

	var numTiles = Math.pow(2, z);
	var totalTiles = numTiles * numTiles;

        if (!result){
        	fs.mkdirSync(dir);
	}

	for (var x = 0 ; x < numTiles ; x++){
                ut.dirExists('public/tiles/' + z + '/' + x, x, function(result, temp, dir){
                       	if (!result){
                               	fs.mkdirSync(dir);
			}
			for (var y = 0 ; y < numTiles ; y++){
				generateTile(z, temp, y, function(error){

					totalTiles--;
					if(totalTiles == 0){
						console.log(('[TILECREATOR.JS] Succesfully generated ' + z + ' zoom level tiles').green);
						callback();
					}

				});
	                }
        	});
	}
});
}

////////////////////////////////// GENERATE ALL TILES

exports.generateFromToTiles = function generateFromToTiles(from, to, callback) {
console.log(('[TILECREATOR.JS] Asked for tiles between ' + from + ' and ' + to).yellow);

ut.dirExists('public/tiles', null, function(result, temp, dir){

	var numZooms = to - from +1;
  
	if (!result){
		fs.mkdirSync(dir);
	}
        for (var z = from ; z <= to ; z++){
               	generateZoomTiles(z, function(error){

		numZooms--;
		if (numZooms == 0){
			callback();
		}

		});
       	}
});

}