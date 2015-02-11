HomeController = AppController.extend({
  waitOn: function() {
    return this.subscribe('recentItems');
  },
  data: {
    items: Items.find({})
  },

  onBeforeAction: function (pause) {
  	if(Meteor.userId())
  	{
      this.next();
  		//Router.go('dashboard'); 
  	}
  	else
  	{
  		this.next();
  	}
  },
  onAfterAction: function () {
    Meta.setTitle('Home');
  }
});
