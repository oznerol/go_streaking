Template.dashboard.rendered = function() {
	//console.log(Meteor.App.NAME);
};

// ITEM SCRIPTS
Template.dashboardItem.helpers({
  postId: function() {
    var controller = Iron.controller();

    // reactively return the value of postId
    return controller.state.get('postId');
  },

  oneItem: function() {
    return Items.find();
  }
});

Template.dashboardItem.events({
  "click .item": function(e, tpl) {
    e.preventDefault();

  }
});

// DASHBOARD SCRIPTS
Template.dashboard.helpers({
  
});

Template.dashboard.events({
  
});