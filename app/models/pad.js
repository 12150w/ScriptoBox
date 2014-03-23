var Pad = DS.Model.extend({
	title: DS.attr('string'),
	active: DS.attr('boolean', {defaultValue: false})
});
Pad.FIXTURES = [
	{
		id: 1,
		title: "Example C Pointers",
		active: true
	},
	{
		id: 2,
		title: "HTTP with Python",
		active: true
	}
];
export default Pad;