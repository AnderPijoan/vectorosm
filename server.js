////////////////////////////////// SETTINGS

var app = require('express')(),
    port = process.env.PORT || 8001;

require('./settings').boot(app);

////////////////////////////////// START

app.listen(port);
console.log(('[SERVER.JS] Listening on port ' + port).green);

////////////////////////////////// ROUTES

require('./routes/routes')(app);

////////////////////////////////// SUCCESS

console.log('\n[SERVER.JS] EVERYTHING STARTED CORRECTLY\n'.rainbow);
