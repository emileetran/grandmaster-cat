Meteor.startup(function() {
  var selector = {score: { $exists: false }};
  var modifier = {$set: { score: 1400 }};
  var options = {multi: true};
  GLOBAL.Cats.update(selector, modifier, options);
});