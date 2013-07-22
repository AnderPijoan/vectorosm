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
// file : file to check wether it exists
// temp : temporary variable for when calling back


function fileExists(file, temp, callback){
	fs.exists(file, function(exists){
		if (exists) {
			callback(true, temp, file);
        	}
		else {
		callback(false, temp, file);
		}
	});
}

////////////////////////////////// GENERATE ONE TILE ONLY

function generateTile(z, x, y, callback){
console.log(('[TILECREATOR.JS] Asked for ' + z + '/' + x + '/' + y + ' tile').yellow);

	bc.getBbox(z, x, y, function (l, t, r, b){

	console.log(('[TILECREATOR.JS] Bounding Box for ' + z + '/' + x + '/' + y + ' tile : [' + l + ',' +  t + ',' + r + ',' + b + ']').yellow);

	if (l || t || r || b){
	  
		var query = qc.getQuery(z, l, t, r, b);

		client.query(query, function(error, result) {

			var fileName = 'public/tiles/' + z + '/' + x + '/' + y + '.json';

			if (!error){

				rp.parseResult(result, function(parsedResult){
					if (parsedResult) {
						fileExists(fileName, parsedResult, function(exists, stream, file){
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


////////////////////////////////// GENERATE ONE ZOOM LEVEL ONLY

function generateZoomTiles(z, callback){
console.log(('[TILECREATOR.JS] Asked for ' + z + ' zoom level tiles').yellow);

dirExists('public/tiles/' + z, z, function(result, temp, dir){

	var numTiles = Math.pow(2, z);
	var totalTiles = numTiles * numTiles;

        if (!result){
        	fs.mkdirSync(dir);
	}

	for (var x = 0 ; x < numTiles ; x++){
                dirExists('public/tiles/' + z + '/' + x, x, function(result, temp, dir){
                       	if (!result){
                               	fs.mkdirSync(dir);
			}
			for (var y = 0 ; y < numTiles ; y++){
				generateTile(z, temp, y, function(error){

					totalTiles--;
					if(totalTiles == 0){
						callback();
					}

				});
	                }
        	});
	}
});
}
exports.generateZoomTiles = generateZoomTiles;

////////////////////////////////// GENERATE ALL TILES

function generateFromToTiles(from, to, callback) {
console.log(('[TILECREATOR.JS] Asked for tiles between ' + from + ' and ' + to).yellow);

dirExists('public/tiles', null, function(result, temp, dir){

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
exports.generateFromToTiles = generateFromToTiles;

