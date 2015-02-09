Template.createTracker.rendered = function() {
	//console.log(Meteor.App.NAME);
};

Template.createTracker.helpers({
  //myItems: function() {
  //  return Items.find();
  //},

  creating: function() {
    return Session.get('creating');
  }
});

Template.createTracker.events({
  "click .populate": function(e, tpl) {
    e.preventDefault();
    Items.insert({
      name: 'what',
      rating: 3
    });
    //return Session.set('creating', true);
  },

  "click .create": function(e, tpl) {
    e.preventDefault();

    //return Session.set('creating', true);
  },

  "click .cancel": function(e, tpl) {
    e.preventDefault();
    Router.go('dashboard');
  },

  "submit form.form-create": function(e, tpl) {
      var item;
      e.preventDefault();
      item = {
        name: tpl.$("input[id='trackerName']").val(),
        description: tpl.$("input[id='trackerDesc']").val(),
        share: tpl.$("select[id='trackerShare']").val()
      };

      if (item.name.length &&
          item.description.length &&
          item.share.length) 
      {
        Items.insert(item);
        
        Router.go('dashboard');
      }
  }
});