////////////////////////////////// ROUTES

module.exports = function(app) {

var fs = require('fs'),
    tc = require('../tileCreator/tileCreator'),
    ut = require('../utils/utils'),
    minZoom = 0,
    maxZoom = 18;


////////////////////////////////// GENERATE A CERTAIN TILE

app.get('/generate/:zoom/:x/:y', function(req, res){
    tc.connect(function(error, client){

	var zoom = parseInt(req.params.zoom);

	if (!error){
		if (zoom <= maxZoom){
			ut.dirExists('public/tiles/' + zoom, zoom, function(result, temp, dir){

				if (!result){
					fs.mkdirSync(dir);
				}

				ut.dirExists('public/tiles/' + zoom + '/' + req.params.x, req.params.x, function(result, temp, dir){

					if (!result){
						fs.mkdirSync(dir);
					}
					res.send(zoom + '/' + req.params.x + '/' + req.params.y + ' tile generation process started');
					tc.generateTile(client, zoom, parseInt(req.params.x), parseInt(req.params.y), function(){
						tc.disconnect(client, function(){
						console.log('[ROUTES.JS] Finished generating tiles'.rainbow);
						});
					});
				
				});
			});
		}
		else {
			res.send('Zoom level ' + zoom + ' exceeds max zoom level ' + maxZoom);
			tc.disconnect(client, function(){
				console.log(('[ROUTES.JS] Zoom level ' + req.params.zoom + 'exceeds max zoom level ' + maxZoom).red);
			});
		}
	}
	else {
	  	res.send('Error trying to connect to DB : ' + error);
		tc.disconnect(client, function(){
			console.log(('[ROUTES.JS] Error trying to connect to DB : ' + error).red);
		});
	}
      
    });
});


////////////////////////////////// GENERATE FROM X TO Y ZOOM

app.get('/generate/zoom/from/:from/to/:to', function(req, res){
    tc.connect(function(error, client){
      
	var from = parseInt(req.params.from);
	var to = parseInt(req.params.to);
	
	if (!error){
		if (to <= maxZoom){
		  	res.send('Zoom levels from ' + from + ' to ' + to + ' generation process started');
			tc.generateZoomsFromTo(client, from, to, function(){
				tc.disconnect(client, function(){
					console.log('[ROUTES.JS] Finished generating tiles'.rainbow);
				});
			});
		}
		else {
		  	res.send('Zoom level ' + to + ' exceeds max zoom level ' + maxZoom);
			tc.disconnect(client, function(){
				console.log(('[ROUTES.JS] Zoom level ' + zoom + ' exceeds max zoom level ' + maxZoom).red);
			});
		}
	}
	else {
	  	res.send('Error trying to connect to DB : ' + error);
		tc.disconnect(client, function(){
			console.log(('[ROUTES.JS] Error trying to connect to DB : ' + error).red);
		});
	}
      
    });
});


////////////////////////////////// GENERATE ALL TILES FROM CERTAIN ZOOM LEVEL

app.get('/generate/zoom/:zoom', function(req, res){
    tc.connect(function(error, client){
      
	var zoom = parseInt(req.params.zoom);
	
	if (!error){
		if (zoom <= maxZoom){
		  	res.send('Zoom level ' + zoom + ' generation process started');
			tc.generateZoomsFromTo(zoom, zoom, function(){
				tc.disconnect(client, function(){
					console.log('[ROUTES.JS] Finished generating tiles'.rainbow);
				});
			});
		}
		else {
		  	res.send('Zoom level ' + zoom + ' exceeds max zoom level ' + maxZoom);
			tc.disconnect(client, function(){
				console.log(('[ROUTES.JS] Zoom level ' + zoom + ' exceeds max zoom level ' + maxZoom).red);
			});
		}
	}
	else {
	  	res.send('Error trying to connect to DB : ' + error);
		tc.disconnect(client, function(){
			console.log(('[ROUTES.JS] Error trying to connect to DB : ' + error).red);
		});
	}
      
    });
});


////////////////////////////////// GENERATE ALL TILES IN A ZOOM FOR A BOUNDING BOX

app.get('/generate/bbox/:zoom/:left/:top/:right/:bottom', function(req, res){
    tc.connect(function(error, client){
      
	var zoom = parseInt(req.params.zoom);
	var left = parseFloat(req.params.left);
	var top = parseFloat(req.params.top);
	var right = parseFloat(req.params.right);
	var bottom = parseFloat(req.params.bottom);
	
	if (!error){
		if (zoom <= maxZoom){
			res.send('Zoom level ' + zoom + ' generation for bbox [' + left + ',' + top + ',' + right + ',' + bottom + '] process started');
			tc.generateZoomTilesForBox(client, zoom, left, top, right, bottom, function(){
				tc.disconnect(client, function(){
					console.log('[ROUTES.JS] Finished generating tiles'.rainbow);
				});
			});
		}
		else {
		  	res.send('Zoom level ' + zoom + ' exceeds max zoom level ' + maxZoom);
			tc.disconnect(client, function(){
				console.log(('[ROUTES.JS] Zoom level ' + zoom + ' exceeds max zoom level ' + maxZoom).red);
			});
		}
	}
	else {
		res.send('Error trying to connect to DB : ' + error);
		tc.disconnect(client, function(){
			console.log(('[ROUTES.JS] Error trying to connect to DB - ' + error).red);
			callback(error);
		});
	}
      
    });
});


////////////////////////////////// GENERATE ALL TILES

app.get('/generate', function(req, res){
    tc.connect(function(error, client){
    
	if (!error){
	  	res.send('All tile generation process started');
		tc.generateZoomsFromTo(client, minZoom, maxZoom, function(){
			tc.disconnect(client, function(){
				console.log('[ROUTES.JS] Finished generating tiles'.rainbow);
			});
		});
	}
	else {
	  	res.send('Error trying to connect to DB : ' + error);
		tc.disconnect(client, function(){
			console.log(('[ROUTES.JS] Error trying to connect to DB : ' + error).red);
		});
	}
      
    });
});

}
