Checkins = new Mongo.Collection('checkins');

Checkins.helpers({

});

Checkins.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.creatorId = userId;
});