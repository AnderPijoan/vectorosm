////////////////////////////////// ROUTES

module.exports = function(app) {

var fs = require('fs'),
    tc = require('../tileCreator/tileCreator'),
    ut = require('../utils/utils'),
    minZoom = 0,
    maxZoom = 18;


////////////////////////////////// GENERATE A CERTAIN TILE

app.get('/generate/:zoom/:x/:y', function(req, res){
    tc.connect(function(error){

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
					
					tc.generateTile(zoom, parseInt(req.params.x), parseInt(req.params.y), function(){
						tc.disconnect(function(){
						console.log('[ROUTES.JS] Finished generating tiles'.rainbow);
						res.send(zoom + '/' + req.params.x + '/' + req.params.y + ' tile generation process finished');
					});
			});
				
				});
			});
		}
		else {
			console.log(('[ROUTES.JS] Zoom level ' + req.params.zoom + 'exceeds max zoom level ' + maxZoom).red);
			res.send('Zoom level ' + zoom + ' exceeds max zoom level ' + maxZoom);
		}
	}
	else {
		tc.disconnect(function(){
			console.log(('[ROUTES.JS] Error trying to connect to DB : ' + error).red);
			res.send('Error trying to connect to DB : ' + error);
		});
	}
      
    });
});


////////////////////////////////// GENERATE FROM X TO Y ZOOM

app.get('/generate/zoom/from/:from/to/:to', function(req, res){
    tc.connect(function(error){
      
	var from = parseInt(req.params.from);
	var to = parseInt(req.params.to);
	
	if (!error){
		if (to <= maxZoom){
			tc.generateZoomsFromTo(from, to, function(){
				tc.disconnect(function(){
					console.log('[ROUTES.JS] Finished generating tiles'.rainbow);
					res.send('Zoom levels from ' + from + ' to ' + to + ' generation process finished');
				});
			});
		}
		else {
			console.log(('[ROUTES.JS] Zoom level ' + zoom + ' exceeds max zoom level ' + maxZoom).red);
			res.send('Zoom level ' + to + ' exceeds max zoom level ' + maxZoom);
		}
	}
	else {
		tc.disconnect(function(){
			console.log(('[ROUTES.JS] Error trying to connect to DB : ' + error).red);
			res.send('Error trying to connect to DB : ' + error);
		});
	}
      
    });
});


////////////////////////////////// GENERATE ALL TILES FROM CERTAIN ZOOM LEVEL

app.get('/generate/zoom/:zoom', function(req, res){
    tc.connect(function(error){
      
	var zoom = parseInt(req.params.zoom);
	
	if (!error){
		if (zoom <= maxZoom){
			tc.generateZoomsFromTo(zoom, zoom, function(){
				tc.disconnect(function(){
					console.log('[ROUTES.JS] Finished generating tiles'.rainbow);
					res.send('Zoom level ' + zoom + ' generation process finished');
				});
			});
		}
		else {
			console.log(('[ROUTES.JS] Zoom level ' + zoom + ' exceeds max zoom level ' + maxZoom).red);
			res.send('Zoom level ' + zoom + ' exceeds max zoom level ' + maxZoom);
		}
	}
	else {
		tc.disconnect(function(){
			console.log(('[ROUTES.JS] Error trying to connect to DB : ' + error).red);
			res.send('Error trying to connect to DB : ' + error);
		});
	}
      
    });
});


////////////////////////////////// GENERATE ALL TILES IN A ZOOM FOR A BOUNDING BOX

app.get('/generate/bbox/:zoom/:left/:top/:right/:bottom', function(req, res){
    tc.connect(function(error){
      
	var zoom = parseInt(req.params.zoom);
	var left = parseFloat(req.params.left);
	var top = parseFloat(req.params.top);
	var right = parseFloat(req.params.right);
	var bottom = parseFloat(req.params.bottom);
	
	if (!error){
		if (zoom <= maxZoom){
			tc.generateZoomTilesForBox(zoom, left, top, right, bottom, function(){
				tc.disconnect(function(){
					console.log('[ROUTES.JS] Finished generating tiles'.rainbow);
					res.send('Zoom level ' + zoom + ' generation process finished for bbox [' + left + ',' + top + ',' + right + ',' + bottom + ']');
				});
			});
		}
		else {
			console.log(('[ROUTES.JS] Zoom level ' + zoom + ' exceeds max zoom level ' + maxZoom).red);
			res.send('Zoom level ' + zoom + ' exceeds max zoom level ' + maxZoom);
		}
	}
	else {
		res.send(error);
		tc.disconnect(function(){
			console.log(('[ROUTES.JS] Error trying to connect to DB - ' + error).red);
			callback(error);
		});
	}
      
    });
});


////////////////////////////////// GENERATE ALL TILES

app.get('/generate', function(req, res){
    tc.connect(function(error){
    
	if (!error){
		tc.generateZoomsFromTo(minZoom, maxZoom, function(){
			tc.disconnect(function(){
				console.log('[ROUTES.JS] Finished generating tiles'.rainbow);
				res.send('All tile generation process finished');
			});
		});
	}
	else {
		tc.disconnect(function(){
			console.log(('[ROUTES.JS] Error trying to connect to DB : ' + error).red);
			res.send('Error trying to connect to DB : ' + error);
		});
	}
      
    });
});

}
