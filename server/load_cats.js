var Cats = GLOBAL.Cats;

Meteor.startup(function() {
  var catsNeeded = Math.max(Meteor.settings.CAT_COUNT - Cats.find().count(), 0);
  if(catsNeeded === 0) {
    console.log("no cats needed");
    return;
  }
  console.log("number of cats needed", catsNeeded);

  var apiKey = Meteor.settings.CATS_API_KEY;
  var getCatsUrl = "http://thecatapi.com/api/images/get";
  var params = {
    format: "xml",
    results_per_page: catsNeeded
  };

  HTTP.get(getCatsUrl, { params: params }, function(error, response) {
    if(error) {
      console.error(error);
      return;
    }
    xml2js.parseString(response.content, function(error, result) {
      if(error) {
        console.error(error);
        return;
      }
      var images = result.response.data[0].images[0].image; // it's an array that contains object elements
      
      // loop through images, for each one insert in the Cats collection if it doesn't exist
      for(var i = 0; i < images.length; i++) { 
        var image = images[i];
        var externalId = image.id[0];
        var imageUrl = image.url[0];
        if(Cats.findOne({externalId: externalId})) {
          console.log("found", externalId);
        } else {
          var cat = {
            externalId: externalId,
            imageUrl: imageUrl,
            score: 1400
          };
          Cats.insert(cat);
          console.log("inserted cat", cat.externalId);
        }
      }
    });
  });
});
