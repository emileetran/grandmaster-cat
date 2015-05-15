var Cats = GLOBAL.Cats;

var randomCatId = function() {
  var totalCats = Cats.find().count();
  var skip = Math.floor(Math.random() * totalCats);
  var cat = Cats.findOne({}, {skip: skip});
  if(cat) {
    return cat._id;
  } else {
    return null;
  }
};

Tracker.autorun(function() {
  if(!Session.get("catLeftId")) {
    console.log("setting cat left");
    Session.set("catLeftId", randomCatId());
  }
  if(!Session.get("catRightId")) {
    console.log("setting cat right");
    Session.set("catRightId", randomCatId());
  }
  if(Session.get("catRightId") === Session.get("catLeftId")) {
    Session.set("catLeftId", randomCatId());
  }
})

Template.comparison.helpers({
  catLeft: function() {
    var id = Session.get("catLeftId");
    if(id) {
      return Cats.findOne(id);
    }
  },
  catRight: function() {
    var id = Session.get("catRightId");
    if(id) {
      return Cats.findOne(id);
    }
  }
});



