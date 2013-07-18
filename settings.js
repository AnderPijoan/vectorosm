////////////////////////////////// SETTINGS

var express = require('express'),
    colors = require('colors');

exports.boot = function(app){
  bootApplication(app);

// Set tile regeneration interval
/*setInterval(generateTiles, 600000  ); // 10 minute
function generateTiles(){
        console.log('[SETTINGS.JS] Regenerating tiles'.yellow);
};*/

};

function bootApplication(app) {

console.log('[SETTINGS.JS] Configuring application'.green);

app.configure(function(){

/* If there is going to be information sent from the client
 * bodyParser helps creating an object with that data.   
 * bodyParser should be above methodOverride */
app.use(express.bodyParser());
app.use(express.methodOverride());

/* If cookies are going to be used
 * cookieParser should be above session
app.use(express.cookieParser());
app.use(express.session({ secret: 'pu7th3l0ti()n1nth3b45k3t!' })); */

app.use(express.logger(':method :url :status'));
app.use(express.favicon());

/* routes should be at last */
app.use(app.router);

/* And if there is no route defined, access the public content */
app.use(express.static(__dirname + '/public'));

console.log(('[SETTINGS.JS] Public folder : ' + __dirname + '/public').green);


});
}
