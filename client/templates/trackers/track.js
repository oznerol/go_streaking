Template.track.rendered = function() {
  //console.log(Meteor.App.NAME);
};

// ITEM SCRIPTS
Template.track.helpers({
  postId: function() {
    var controller = Iron.controller();

    // reactively return the value of postId
    return controller.state.get('postId');
  },

  oneItem: function() {
    //console.log('calling find2');
    var result = Items.findOne();
    if(!result)
      result = false;

    return result;
  },

  calOptions: function() {
    var item = Items.findOne();
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

Template.track.events({
  "click .item": function(e, tpl) {
    e.preventDefault();

  }
});