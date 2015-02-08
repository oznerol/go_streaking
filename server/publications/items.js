Meteor.publishComposite("items", function() {
  return {
    find: function() {
      return Items.find({});
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

Meteor.publishComposite("itemsForUser", function(userId) {
  return {
    find: function() {
      return Items.find({$or: [{creatorId: userId}, {memberIds: userId}]}, { sort: { createdAt: 1 }
                        });
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

Meteor.publishComposite("itemWithID", function(itemID) {
  return {
    find: function() {
      return Items.find({_id: itemID}, {sort: { createdAt: -1 }});
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

Meteor.publishComposite("recentItems", function() {
  return {
    find: function() {
      return Items.find({share: 'Public'}, {
            sort: { createdAt: -1 },
            limit: 10
        });
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