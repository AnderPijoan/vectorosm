////////////////////////////////// TILE CREATOR

var fs = require('fs'),
    pg = require('pg'),
    qc = require('./queryCreator'),
    rp = require('./resultParser'),
    bc = require('./bboxCreator'),
    conString = 'tcp://gisuser:gisuser@energia.deusto.es:5432/gis',
    client = new pg.Client(conString);
    
////////////////////////////////// CONNECT TO DB
    
function connect(callback){
  
    client.connect( function(error) {
	if (error){
		callback(error);
	}
	else {
		callback();
	} 
    });
}
exports.connect = connect;

////////////////////////////////// END DB CONNECTION
    
function disconnect(callback){
    client.end();
    callback();
}
exports.disconnect = disconnect;

////////////////////////////////// CHECK IF DIRECTORY EXISTS
// dir : path to be created
// temp : temporary variable for when calling back


function dirExists(dir, temp, callback){
	fs.exists(dir, function(exists){
		if (exists) {
        	fs.stat(dir, function(err, stats){
                	if (stats.isDirectory()){
			callback(true, temp, dir);
               		}
			else {
			callback(false, temp, dir);
			}
        	});
        	}
		else {
		callback(false, temp, dir);
		}
	});
}

////////////////////////////////// CHECK IF FILE EXISTS


////////////////////////////////// GENERATE ONE TILE ONLY

function generateTile(z, x, y){
//console.log(('[TILECREATOR.JS] Asked for ' + z + '/' + x + '/' + y + ' tile').yellow);

	bc.getBbox(z, x, y, function (l, t, r, b){

//console.log(('[TILECREATOR.JS] Bounding Box for ' + z + '/' + x + '/' + y + ' tile : [' + l + ',' +  t + ',' + r + ',' + b + ']').yellow);

	if (l || t || r || b){
	  
		var query = qc.getQuery(z, l, t, r, b);

		client.query(query , function(error, result) {

			var fileName = 'public/tiles/' + z + '/' + x + '/' + y + '.json';

			if (!error){

				rp.parseResult(result, function(parsedResult){
					if (parsedResult) {
						fs.writeFile(fileName, parsedResult, function(error) {
							if(error) {
								console.log(('[TILECREATOR.JS] Error generating ' + fileName + ' - ' + error).red);
							} else {
								console.log(('[TILECREATOR.JS] Succesfully generated ' + fileName).green);
							}
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
exports.generareTile = generateTile;


////////////////////////////////// GENERATE ONE ZOOM LEVEL ONLY

function generateZoomTiles(z){
console.log(('[TILECREATOR.JS] Asked for ' + z + ' zoom level tiles').yellow);

dirExists('public/tiles/' + z, z, function(result, temp, dir){

	var numTiles = Math.pow(2, z);

        if (!result){
        	fs.mkdirSync(dir);
	}

	for (var x = 0 ; x < numTiles ; x++){
                dirExists('public/tiles/' + z + '/' + x, x, function(result, temp, dir){
                       	if (!result){
                               	fs.mkdirSync(dir);
			}
			for (var y = 0 ; y < numTiles ; y++){
				generateTile(z, temp, y);
	                }
        	});
	}
});
}
exports.generateZoomTiles = generateZoomTiles;

////////////////////////////////// GENERATE ALL TILES

function generateAllTiles() {
console.log('[TILECREATOR.JS] Asked for ALL tiles'.yellow);

dirExists('public/tiles', null, function(result, temp, dir){
	
	var zoom = 0,
            maxZoom = 6;

	if (!result){	
		fs.mkdirSync(dir);
	}
        for (var z = zoom ; z <= maxZoom ; z++){
               	generateZoomTiles(z);
       	}	
});

}
exports.generateAllTiles = generateAllTiles;

