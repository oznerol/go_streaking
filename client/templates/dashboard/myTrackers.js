Template.myTrackers.rendered = function() {

}

Template.myTrackers.helpers({
  myItems: function() {
    //console.log('calling find1');
    //console.log(this);
    return Items.find();
  },

  myCheckins: function() {
    return Checkins.find();
  },

  streak: function() {
    var streak = 0;
    var checks = Checkins.find({trackerId: this._id,
                                    creatorId: Meteor.userId()}, 
                                    { sort: { createdAt: -1 }});

    var limit = 'day';
    var limits = 'days';
    //limit = 'minute';
    //limits = 'minutes';
    
    var time = moment().startOf(limit).toDate();
    if(checks)
    {
      checks.forEach(function(checkin)
        {
            if(moment(time).diff(checkin.createdAt, limits) == 0)
            {
                streak++;
                time = moment(checkin.createdAt).startOf(limit).toDate();
            }
            else
              return streak;
            
        });
    }

    return streak;
  },

  checkToday: function() {

    var checks = Checkins.findOne({trackerId: this._id,
                                    creatorId: Meteor.userId()}, 
                                    { sort: { createdAt: -1 }});

    if(checks)
    {
        var limit = 'day';
        var limits = 'days';
        //limit = 'minute';
        //limits = 'minutes';

        var time = moment().add(1, limits).startOf(limit).toDate();
        
        if(moment(time).diff(checks.createdAt, limits))
            return false;
        else
          return true;
    }
    
    return false;
  },

  calOptions: function() {
  	var checks = Checkins.find();

    var myEvents = new Array();

    // signify event creation somehow
    //myEvents.push({start: item.createdAt,
    //                title: item.name,
    //                color: '#ffffff'});   

    if(checks)
    {
      checks.forEach(function(checkin)
      {
        var user = Meteor.users.findOne(checkin.creatorId);
        myEvents.push({start: checkin.createdAt,
                    title: user.profile.name});     
      });
    }

    //console.log(myEvents);

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
        return {
          //height: 200,
          //contentHeight: 200,
          id: 'myCalendar',
          aspectRatio: 1.0,
          //fixedWeekCount: false,
          theme: true,
          //header: {
          //    left: 'prev,next today',
          //    center: 'title',
          //    right: 'month,agendaWeek,agendaDay'
          //},
          //editable: true,
          dayRender: function (date, cell) {
            //cell.css("background-color", "red");
        },
        eventRender: function(event, element) { 
              //element.find('.fc-title').append("<br/>" + event.description); 
          },
          eventLimit: 2,
          
            eventMouseover: function(event, jsEvent, view) {
            if (view.name !== 'agendaDay') {
                $(jsEvent.target).attr('title', event.title);
              }
          },
          events: myEvents
            //defaultView: 'basicWeek'
        };
    }
});

Template.myTrackers.events({
  "click .caltest": function(e, tpl){
  	$('#myCalendar').fullCalendar('refetchEvents');
  },

  "click .checkin": function(e, tpl){
    e.preventDefault();
    Checkins.insert({trackerId: this._id});
    /*Meteor.call('Items.checkin', this._id, function(error, response) {
      if (error) {
        console.log(error.reason);
      }
      else
      {
        console.log(response);
      }
    });*/
    //Items.checkin(this._id);
  },

  "click .delete": function(e, tpl){
    e.preventDefault();
    //console.log(this._id);
    Items.remove(this._id);
  },

  "click .create": function(e, tpl) {
    e.preventDefault();

    Router.go('createTracker');
  }
});