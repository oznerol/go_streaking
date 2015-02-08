Router.route('/', {
  name: 'home'
});

Router.route('/dashboard');
Router.route('/createTracker');
Router.route('/dashboard/:_id', {name:'dashboard.item'});
//, {
//  					name: 'dashboard'
//});
