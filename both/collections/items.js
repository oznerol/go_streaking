Items = new Mongo.Collection('items');

Items.helpers({

});

Items.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.creatorId = userId;
  doc.memberIds = [userId];
});