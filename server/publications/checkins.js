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
  }
});

Meteor.publishComposite("checkinsForTrack", function(trackId) {
  return {
    find: function() {
      return Checkins.find({trackerId: trackId}, { sort: { createdAt: 1 }});
    }
     ,
     children: [
       {
         find: function(item) {
           return Meteor.users.find(
                    { _id: item.creatorId },
                    { limit: 1, fields: { profile: 1 } });
         }
       }
     ]
  }
});