export default DS.Adapter.extend({
	
	find: function(store, type, id) {
		console.log(type + ' ' + id);
	},
	
	findQuery: function(store, type, query) {
		console.log(type);
		console.log(query);
	},
	
	findAll: function(store, type, sinceToken) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			
			// Query via data API
			jQuery.ajax({
				url: 'http://localhost:3000/api/data', // NOTE: make this changeable easily
				type: 'POST',
				contentType: 'application/json'
				data: JSON.serialize({collection: type.typeKey}),
				success: function(data) {
					console.log(data);
					Ember.run(null, resolve);
				},
				error: function(xhr, status, error) {
					xhr.then = null;
					Ember.run(null, reject, xhr);
				}
			});
			
		});
	}
	
});
