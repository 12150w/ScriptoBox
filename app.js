
var express = require('express');

var scb = express();

// Static Files
scb.use('/', express.static(__dirname + '/public'));

var server = scb.listen(3000, function() {
	console.log('ScriptoBox Server started on %d', server.address().port);
});
