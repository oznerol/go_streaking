Router.route('/', {
  name: 'home'
});

Router.route('/dashboard');
Router.route('/createTracker');
Router.route('/trackerList');
Router.route('/trackers/:_id', {name:'track', controller: 'TrackController'});
Router.route('/trackers');
//, {
//  					name: 'dashboard'
//});
