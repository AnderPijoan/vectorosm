////////////////////////////////// TILE CREATOR

var fs = require('fs'),
    pg = require('pg'),
    qc = require('./queryCreator'),
    rp = require('./resultParser'),
    bc = require('./bboxCreator'),
    ut = require('../utils/utils'),
    conString = 'tcp://gisuser:gisuser@energia.deusto.es:5432/gis';
    
////////////////////////////////// CONNECT TO DB
    
exports.connect = function connect(callback){
   
	// TODO Maybe with pg.connect might be better to fetch clients from pool
	// https://github.com/brianc/node-postgres#client-pooling

	var client = new pg.Client(conString);
	client.connect( function(error) {
		if (error){
			callback(error);
		}
		else {
			callback(0, client);
		} 
	});
}


////////////////////////////////// END DB CONNECTION
    
exports.disconnect = function disconnect(client, callback){
    client.end();
    callback();
}


////////////////////////////////// GENERATE ONE TILE ONLY

function generateTile(client, z, x, y, callback){
//console.log(('[TILECREATOR.JS] Asked for ' + z + '/' + x + '/' + y + ' tile').yellow);

	bc.getLTRBbox(z, x, y, function (l, t, r, b){

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
									console.log(('[TILECREATOR.JS] Succesfully generated ' + file).green);
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
exports.generateTile = generateTile;


////////////////////////////////// GENERATE SPECIFIED TILES FROM ONE ZOOM LEVEL

function generateZoomTilesFromTo(client, z, minX, minY, maxX, maxY, callback){
console.log(('[TILECREATOR.JS] Asked for ' + z + ' zoom level tiles').yellow);

ut.dirExists('public/tiles/' + z, z, function(result, temp, dir){

	var totalTiles = (maxX - minX + 1) * (maxY - minY + 1);

        if (!result){
        	fs.mkdirSync(dir);
	}

	for (var x = minX ; x <= maxX ; x++){
                ut.dirExists('public/tiles/' + z + '/' + x, x, function(result, temp, dir){
                       	if (!result){
                               	fs.mkdirSync(dir);
			}
			for (var y = minY ; y <= maxY ; y++){
				generateTile(client, z, temp, y, function(error){

					totalTiles--;
					if(totalTiles <= 0){
						console.log(('[TILECREATOR.JS] Succesfully generated ' + z + ' zoom level tiles').green);
						callback();
					}

				});
	                }
        	});
	}
});
}
exports.generateZoomTilesFromTo = generateZoomTilesFromTo;


////////////////////////////////// GENERATE TILES OF THE BBOX FROM ONE ZOOM LEVEL

function generateZoomTilesForBox(client, z, left, top, right, bottom, callback){

	bc.getXYbox(z, left, top, right, bottom, function (z, minX, minY, maxX, maxY){
	  
		if (minX || minY || maxX || maxY){
			generateZoomTilesFromTo(client, z, minX, minY, maxX, maxY, function(){
				callback();
			});
		} else {
			callback();
		}
	});
}
exports.generateZoomTilesForBox = generateZoomTilesForBox;


////////////////////////////////// GENERATE ALL TILES FOR THE SPECIFIED ZOOM LEVELS

function generateZoomsFromTo(client, from, to, callback) {
console.log(('[TILECREATOR.JS] Asked for tiles between ' + from + ' and ' + to).yellow);

ut.dirExists('public/tiles', null, function(result, temp, dir){

	var numZooms = to - from +1;
  
	if (!result){
		fs.mkdirSync(dir);
	}
        for (var z = from ; z <= to ; z++){

		var numTiles = Math.pow(2, z);
               	generateZoomTilesFromTo(client, z, 0, 0, numTiles, numTiles,  function(error){

			numZooms--;
			if (numZooms <= 0){
				callback();
			}
		});
       	}
});

}
exports.generateZoomsFromTo = generateZoomsFromTo;