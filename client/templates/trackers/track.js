Template.track.rendered = function() {
  //console.log(Meteor.App.NAME);
};

// ITEM SCRIPTS
Template.track.helpers({
  postId: function() {
    var controller = Iron.controller();

    // reactively return the value of postId
    return controller.state.get('postId');
  },

  oneItem: function() {
    //console.log('calling find2');
    return Items.find();
  }
});

Template.track.events({
  "click .item": function(e, tpl) {
    e.preventDefault();

  }
});