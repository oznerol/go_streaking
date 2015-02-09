Meteor.methods({
  'Items.insert': function (params) {
    Items.insert(params);
  },

  'Items.checkin': function (itemID) {
  	//console.log("updating: " + itemID + " for userID: " + Meteor.userId());
  	if(itemID)
  	{
  		var checkin = { userID: Meteor.userId(),
  						date: moment().toDate()
  						};
  		Items.update( { _id: itemID }, { $push: { 'checkins': checkin }});
  	}
  	else
  	{
      throw new Meteor.Error("no-itemID", "You didnt pass in a userID, duh");
  	}

  	
  	//
  },

  'getServerDate': function()
  {
  	var time = moment().add(1, 'days');
  	time = time.startOf('day').toDate();
  	return time;
  }
});
