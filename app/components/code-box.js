export default Ember.Component.extend({
	
	keyUp: function(event) {
		console.log(this.get('body'));
	},
	
	afterRender: function() { console.log('load'); }
	
});