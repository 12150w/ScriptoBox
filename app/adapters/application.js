export default DS.Adapter.extend({
	
	find: function(store, type, id) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			jQuery.ajax({
				type: 'POST',
				contentType: 'application/json',
				url: 'http://localhost:3000/api/data/' + type.typeKey,
				data: JSON.stringify({
					action: 'query',
					filter: {_id: id}
				}),
				success: function(data) {
					data.res[0].id = data.res[0]['_id'];
					Ember.run(null, resolve, data.res[0] || []);
				},
				error: function(xhr) {
					Ember.run(null, reject, xhr);
				}
			});
		});
	},
	
	findAll: function(store, type, sinceToken) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			jQuery.ajax({
				type: 'POST',
				contentType: 'application/json',
				url: 'http://localhost:3000/api/data/' + type.typeKey,
				data: JSON.stringify({
					action: 'query',
					filter: {}
				}),
				success: function(data) {
					for(var i=0; i<(data.res || []).length; i++) data.res[i].id = data.res[i]['_id'];
					Ember.run(null, resolve, data.res || []);
				},
				error: function(xhr) {
					Ember.run(null, reject, xhr);
				}
			});
		});
	},
	
	createRecord: function(store, type, record) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			jQuery.ajax({
				type: 'POST',
				contentType: 'application/json',
				url: 'http://localhost:3000/api/data/' + type.typeKey,
				data: JSON.stringify({
					action: 'new',
					data: record
				}),
				success: function(data) {
					data.res.id = data.res['_id'];
					Ember.run(null, resolve, data.res || {});
				},
				error: function(xhr) {
					Ember.run(null, reject, xhr);
				}
			});
		});
	}
	
});