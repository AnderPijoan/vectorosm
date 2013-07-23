////////////////////////////////// UTILITIES

var fs = require('fs');

////////////////////////////////// CHECK IF DIRECTORY EXISTS
// dir : path to be created
// temp : temporary variable for when calling back

exports.dirExists = function dirExists(dir, temp, callback){
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

exports.fileExists = function fileExists(file, temp, callback){
	fs.exists(file, function(exists){
		if (exists) {
			callback(true, temp, file);
        	}
		else {
		callback(false, temp, file);
		}
	});
}


