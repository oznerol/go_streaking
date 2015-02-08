Template.home.rendered = function() {

};

Template.home.helpers({
  items: function() {
    return Items.find();
  },
	itemCreator: function() {
	    // We use this helper inside the {{#each posts}} loop, so the context
	    // will be a post object. Thus, we can use this.authorId.
	    return Meteor.users.findOne(this.creatorId);
	}
});