GLOBAL.Cats = new Mongo.Collection("cats");

Meteor.publish("cats", function () {
  return GLOBAL.Cats.find({});
});