////////////////////////////////// ROUTES

module.exports = function(app) {

var tc = require('../tileCreator/tileCreator');

app.get('/', function(req, res){
    res.send('Welcome!');
});

app.get('/generateTiles', function(req, res){
    tc.connect(function(error){
    
	if (!error){
		res.send('Tile generation process started');
		tc.generateAllTiles(function(){
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
