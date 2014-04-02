export default Ember.Route.extend({
	model: function() {
		return this.store.createRecord('pad', {title: 'Un-Named Pad'});
	},
	exit: function() {
		if(!this.get('currentModel').get('id')) {
			this.get('currentModel').deleteRecord();
		}
	}
});