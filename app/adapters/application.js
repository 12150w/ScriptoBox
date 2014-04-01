export default DS.Adapter.extend({
	
	baseURL: '/api',
	
	findAll: function(store, type, sinceToken) {
		console.log(type);
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
	}
	
});