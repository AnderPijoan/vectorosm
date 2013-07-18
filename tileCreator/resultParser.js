////////////////////////////////// RESULT PARSER

exports.parseResult = function parseResult(result, callback){

var features = [];
var featureCollection = {};
featureCollection.type = 'FeatureCollection';


for (r = 0 ; r < result.rows.length ; r++){
  
	var feature = {};
	feature.type = 'Feature';

	if(result.rows[r].geometry){
		feature.geometry = JSON.parse(result.rows[r].geometry);
	}

	if(result.rows[r].properties){
		var properties = {};
		
		var propertiesArray = result.rows[r].properties.split(',');

		for(var p = 0; p < propertiesArray.length; p++){
		
			var keyvalue = propertiesArray[p].split('=>');

			if (keyvalue.length){
				properties[JSON.parse(keyvalue[0])] = JSON.parse(keyvalue[1]);
			}
		
		}
		feature.properties = properties;
	}

	features.push(feature);

}

featureCollection.features = features;

callback(JSON.stringify(featureCollection));

}
