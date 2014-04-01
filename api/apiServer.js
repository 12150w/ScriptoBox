var mongoose = require('mongoose');
var express = require('express');

var Schema = mongoose.Schema;
var app = express();
var db = mongoose.connect('mongodb://localhost/scriptobox');

var modelMap = {};
modelMap['pad'] = mongoose.model('Pad', new Schema({
	title: String,
	active: Boolean
}) );

app.use(express.bodyParser());

app.use('/api/data', function(req, res, next) {
	
	// Get params
	var rawVars = req.path.split('/');
	var vars = [];
	for(var i=0; i<rawVars.length; i++) {
		if(!!rawVars[i]) vars.push(rawVars[i]);
	}
	
	// Add cross domain header
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers', 'Content-Type');
	
	// Route the request
	if(req.body.action === 'query') apiQuery(vars[0], req.body.filter, function(data) {
		res.send({res: data});
	});
	else if(req.body.action === 'new') apiAdd(vars[0], req.body.data, function(data) {
		res.send({res: data});
	});
	
	else res.send({error: 'Invalid action'});
	
});

var server = app.listen(3000, function() {
	console.log('ScriptoBox Server started');
});

function apiQuery(table, filter, callback) {
	
	// Verify the collection exists
	if(modelMap[table] == null) callback([]);
	
	else {
		
		// Query the database
		modelMap[table].find(filter || {}).exec(function(err, data) {
			callback(data);
		});
		
	}
}

function apiAdd(table, data, callback) {
	
	// Verify the collection exists
	if(modelMap[table] == null) callback(null);
	
	else {
		
		// Create the model
		var inst = new modelMap[table](data);
		inst.save(function(err, inst) {
			if(err) console.log(err);
			else callback(inst);
		});
		
	}
	
}
