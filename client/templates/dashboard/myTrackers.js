Template.myTrackers.rendered = function() {
  var fc = this.$('.fc');
    this.autorun(function () {
        //1) trigger event re-rendering when the collection is changed in any way
        //2) find all, because we've already subscribed to a specific range
        Checkins.find();
        fc.fullCalendar('refetchEvents');
    });
}


Template.myTrackers.helpers({
  myItems: function() {
    //console.log('calling find1');
    //console.log(this);
    return Items.find({$or: [{creatorId: Meteor.userId()}, {memberIds: Meteor.userId()}]}, { sort: { createdAt: 1 }
                        });
  },

  myCheckins: function() {
    return Checkins.find({creatorId: Meteor.userId()}, { sort: { createdAt: 1 }});
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
  	

    // signify event creation somehow
    //myEvents.push({start: item.createdAt,
    //                title: item.name,
    //                color: '#ffffff'});   

    
    var myTrack = this;
    //console.log(myTrack._id);

    var eventFunc = function (start, end, tz, callback) {
            var checks = Checkins.find();

            var myEvents = new Array();
            //find all, because we've already subscribed to a specific range
            if(checks)
            {
              checks.forEach(function(checkin)
              {
                //console.log(checkin);
                var user = Meteor.users.findOne(checkin.creatorId);
                var tracker = Items.findOne({_id: checkin.trackerId});
                myEvents.push({start: checkin.createdAt,
                            title: tracker.name});     
              });
            }
            callback(myEvents);
        };
    //console.log(myEvents);
    //console.log(myEvents);

    //console.log("eents remade");
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
          events: eventFunc
            //defaultView: 'basicWeek'
        };
    }
});

Template.myTrackers.events({
  "click .caltest": function(e, tpl){
    //console.log("rerender");
  	//tpl.$('#myCalendar').fullCalendar('refetchEvents');

    //$('#myCalendar').fullCalendar('rerenderEvents');
  },

  "click .checkin": function(e, tpl){
    e.preventDefault();
    Checkins.insert({trackerId: this._id});

    
    //tpl.$('#myCalendar').fullCalendar('refetchEvents');
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