Meteor.publishComposite("checkins", function() {
  return {
    find: function() {
      //console.log("yo!");
      return Checkins.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});

Meteor.publishComposite("checkinsForUser", function(userId) {
  return {
    find: function() {
      return Checkins.find({creatorId: userId}, { sort: { createdAt: 1 }});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});