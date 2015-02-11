TrackController = AppController.extend({

  waitOn: function() {
    //this.state.set('postId', this.params._id);
    return [this.subscribe('itemWithID', this.params._id),
            this.subscribe('checkinsForTrack', this.params._id)
            ];
  },
  data: function () {
    //console.log('calling find3');
    return [Items.findOne({_id: this.params._id}),
            Checkins.find({})
    ];
  },
  onBeforeAction: function (pause) {
    AccountsTemplates.ensureSignedIn.call(this, pause);
  },
  onAfterAction: function () {
    Meta.setTitle('Track');
  }
});