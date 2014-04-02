export default Ember.Route.extend({
	model: function() {
		return this.store.createRecord('pad', {title: 'Un-Named Pad'});
	}
});