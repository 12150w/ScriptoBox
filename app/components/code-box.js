export default Ember.Component.extend({
	
	keyUp: function(event) {
		var padSocket = this.get('socket');
		if(!!padSocket) {
			padSocket.emit('update', {body: this.get('body')});
		}
	},
	
	afterRender: function() {
		var padSocket = io.connect('//localhost:3000/pad');
		this.set('socket', padSocket);
		
		padSocket.on('updateOut', function(data) {
			console.log(data);
		});
		
	}
	
});