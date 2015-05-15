if(!window.GLOBAL) {
  window.GLOBAL = {};
}

GLOBAL.Cats = new Mongo.Collection("cats");

Meteor.subscribe("cats");