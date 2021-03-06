Items.allow({
  'insert': function(userId, doc) {
    return userId;
  },
  'update': function(userId, doc, fields, modifier) {
    return userId;
  },
  'remove': function(userId, doc) {
    return userId;
  }
});


Items.after.insert(function (userId, doc) {
	Meteor.users.update( { _id: Meteor.userId() }, { $push: { 'profile.activetrackers': doc._id }} );
});

Items.after.remove(function (userId, doc) {
  Meteor.users.update( { _id: Meteor.userId() }, { $pull: { 'profile.activetrackers': doc._id }} );
});