
Template.cat.events({
  'click .img-wrapper': function(event) {
    event.preventDefault();
    var catLeftId = Session.get("catLeftId");
    var catRightId = Session.get("catRightId");

    if(this._id === catLeftId) {
      var winnerId = catLeftId;
      var loserId = catRightId;
    } else if(this._id === catRightId) {
      var winnerId = catRightId;
      var loserId = catLeftId;
    } else {
      throw new Error('something went wrong');
    }

    Meteor.call("updateScore", winnerId, loserId, function(error) {
      if(error) {
        console.error(error);
        return;
      }
    });
    Session.set("catLeftId", null);
    Session.set("catRightId", null);
  }
});