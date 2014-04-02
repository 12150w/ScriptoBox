var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');
  this.resource('pads', function() {
  	this.route('index'),
  	this.route('new')
  });
});

export default Router;
