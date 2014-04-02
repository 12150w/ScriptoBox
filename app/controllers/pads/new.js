export default Ember.ObjectController.extend({
	actions: {
		getStarted: function() {
			this.get('model').save().then(
				function() {
					console.log(this);
					this.transitionToRoute('pads.index');
				}.bind(this)
			);
		}
	}
});