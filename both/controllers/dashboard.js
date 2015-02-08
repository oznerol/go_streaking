DashboardController = AppController.extend({
  waitOn: function() {
    //this.state.set('postId', this.params._id);
    return this.subscribe('itemsForUser', Meteor.userId());
  },
  data: {
    items: Items.find({creatorId: this.userId}, 
                          { sort: { createdAt: 1 }})
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

DashboardItemController = AppController.extend({

  waitOn: function() {
    //this.state.set('postId', this.params._id);
    return this.subscribe('itemWithID', this.params._id);
  },
  data: function () {
    return Items.findOne({_id: this.params._id});
  },
  onBeforeAction: function (pause) {
    AccountsTemplates.ensureSignedIn.call(this, pause);
  },
  onAfterAction: function () {
    Meta.setTitle('Track');
  }
});