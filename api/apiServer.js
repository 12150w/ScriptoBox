var mongoose = require('mongoose');
var express = require('express');

var Schema = mongoose.Schema;
var app = express();
var db = mongoose.connect('mongodb://localhost/scriptobox');

var Pad = mongoose.model('Pad', new Schema({
	title: String,
	active: Boolean
}) );

app.use('/api/data', function(req, res, next) {
	
	// Get params
	var rawVars = req.path.split('/');
	var vars = [];
	for(var i=0; i<rawVars.length; i++) {
		if(!!rawVars[i]) vars.push(rawVars[i]);
	}
	
	// Add cross domain header
	res.set('Access-Control-Allow-Origin', '*');
	
	res.send({vars: vars, type: req.method});
	
});

var server = app.listen(3000, function() {
	console.log('ScriptoBox Server started');
});
