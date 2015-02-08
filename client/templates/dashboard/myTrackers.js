Template.myTrackers.rendered = function() {

}

Template.myTrackers.helpers({
  myItems: function() {
    return Items.find();
  },

  calOptions: function() {
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
        	//eventLimit: 1,
	        events: function (start, end, tz, callback) {
                callback([{
                        title: new Date().toGMTString(),
                        start: new Date()
                    }]);
            },
            eventMouseover: function(event, jsEvent, view) {
            if (view.name !== 'agendaDay') {
                $(jsEvent.target).attr('title', event.title);
            	}
        	}/*,
        	events: [
            {
            title: 'All Day Event',
            start: new Date(y, m, 1)},
 	     	//backgroundColor: '#D5D8DC'},
        //{
        //    title: 'Long Event',
        //    start: new Date(y, m, d - 5),
        //    end: new Date(y, m, d - 2)},
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d - 3, 16, 0),
            allDay: false,
        	color: '#990000'},
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d + 4, 16, 0),
            allDay: false},
        {
            title: 'Meeting',
            start: new Date(y, m, d, 10, 30),
            allDay: false},
        {
            title: 'Lunch',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false},
        {
            title: 'Birthday Party',
            start: new Date(y, m, d + 1, 19, 0),
            end: new Date(y, m, d + 1, 22, 30),
            allDay: false},
        {
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/'}
        ]*/
            //defaultView: 'basicWeek'
        };
    }
});

Template.myTrackers.events({
  "click .caltest": function(e, tpl){
  	$('#myCalendar').fullCalendar('refetchEvents');
  },

  "click .create": function(e, tpl) {
    e.preventDefault();

    Router.go('createTracker');
  }
});