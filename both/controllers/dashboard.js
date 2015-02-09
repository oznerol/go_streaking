DashboardController = AppController.extend({
  waitOn: function() {
    //this.state.set('postId', this.params._id);
    return this.subscribe('itemsForUser', Meteor.userId());
  },
  data: function(){
    return Items.find({});
    //console.log('calling find42');
    //return Items.find({creatorId: this.userId}, 
    //                        { sort: { createdAt: 1 }});
  },
  onBeforeAction: function (pause) {
    AccountsTemplates.ensureSignedIn.call(this, pause);
  },
  onAfterAction: function () {
    Meta.setTitle('Dashboard');
  }
});

DashboardController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});