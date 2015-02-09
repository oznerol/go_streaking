Checkins.allow({
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

Checkins.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.creatorId = userId;
});

