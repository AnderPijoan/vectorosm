var colors = require('colors');
var express = require('express');
var bodyParser = require('body-parser');

////////////////////////////////// SETTINGS

var app = global.app = express();
app.set('port', process.env.PORT || 8001);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

////////////////////////////////// ROUTES

require('./routes/routes')(app);

////////////////////////////////// SUCCESS

app.listen(process.env.PORT || app.get('port'), function(){
    console.log(('[SERVER.JS] Listening on port ' + app.get('port')).green);
});

console.log('\n[SERVER.JS] EVERYTHING STARTED CORRECTLY\n'.rainbow);
