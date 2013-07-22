////////////////////////////////// ROUTES

module.exports = function(app) {

var tc = require('../tileCreator/tileCreator'),
    minZoom = 0,
    maxZoom = 5;

app.get('/', function(req, res){
    res.send('Welcome!');
});


app.get('/generate/zoom/:zoom', function(req, res){
    tc.connect(function(error){
    
	if (!error){
		res.send('Zoom level ' + req.params.zoom + ' tile generation process started');
		tc.generateZoomTiles(req.params.zoom, function(){
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


app.get('/generate/:zoom/:x/:y', function(req, res){
    tc.connect(function(error){
    
	if (!error){
		res.send(req.params.zoom + '/' + req.params.x + '/' + req.params.y + ' tile generation process started');
		tc.generateTile(req.params.zoom, req.params.x, req.params.y, function(){
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
