CreateTrackerController = AppController.extend({
  onBeforeAction: function (pause) {
    AccountsTemplates.ensureSignedIn.call(this, pause);
  },
  onAfterAction: function () {
    Meta.setTitle('Create Tracker');
  }
});
