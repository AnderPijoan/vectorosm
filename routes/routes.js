////////////////////////////////// ROUTES

module.exports = function(app) {

var fs = require('fs'),
    tc = require('../tileCreator/tileCreator'),
    ut = require('../utils/utils'),
    minZoom = 0,
    maxZoom = 18;

app.get('/', function(req, res){
    res.send('Welcome!');
});

app.get('/generate/:zoom/:x/:y', function(req, res){
    tc.connect(function(error){
    
	if (!error){
		res.send(req.params.zoom + '/' + req.params.x + '/' + req.params.y + ' tile generation process started');
		
		ut.dirExists('public/tiles/' + req.params.zoom, req.params.zoom, function(result, temp, dir){

			if (!result){
				fs.mkdirSync(dir);
			}

			ut.dirExists('public/tiles/' + req.params.zoom + '/' + req.params.x, req.params.x, function(result, temp, dir){

				if (!result){
					fs.mkdirSync(dir);
				}
				
				tc.generateTile(parseInt(req.params.zoom), parseInt(req.params.x), parseInt(req.params.y), function(){
					tc.disconnect(function(){
					console.log('[ROUTES.JS] Finished generating tiles'.rainbow);
				});
		});
			
			});
		});
	}
	else {
		res.send(error);
		tc.disconnect(function(){
			console.log(('[ROUTES.JS] Error trying to connect to DB - ' + error).red);
		});
	}
      
    });
});


app.get('/generate/zoom/:zoom', function(req, res){
    tc.connect(function(error){
    
	if (!error){
		res.send('Zoom level ' + req.params.zoom + ' tile generation process started');
		tc.generateZoomTiles(parseInt(req.params.zoom), function(){
			tc.disconnect(function(){
			console.log('[ROUTES.JS] Finished generating tiles'.rainbow);
			});
		});
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


app.get('/generate', function(req, res){
    tc.connect(function(error){
    
	if (!error){
		res.send('All tile generation process started');
		tc.generateFromToTiles(minZoom, maxZoom, function(){
			tc.disconnect(function(){
			console.log('[ROUTES.JS] Finished generating tiles'.rainbow);
			});
		});
	}
	else {
		res.send(error);
		tc.disconnect(function(){
			console.log(('[ROUTES.JS] Error trying to connect to DB - ' + error).red);
		});
	}
      
    });
});

}
