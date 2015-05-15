var Cats = GLOBAL.Cats;

var S3 = Meteor.npmRequire('aws-sdk').S3;
var s3 = new S3({
  accessKeyId: Meteor.settings.AWS_ACCESS_KEY_ID,
  secretAccessKey: Meteor.settings.AWS_SECRET_ACCESS_KEY
});


Meteor.startup(function() {
  callback = function(err, data) {
    if(err) {
      throw err;
    }

    data.Contents.map(function(item) {
      imageUrl = "https://s3.amazonaws.com/grandmastercat/" + item.Key
      externalId = item.Key.split('/')[1].split('.')[0];
      if(externalId && imageUrl) {
        if(!Cats.findOne({externalId: externalId})) {
          Cats.insert({
            externalId: externalId,
            imageUrl: imageUrl,
            score: 1400
          });
          console.log("Added cat", externalId);
        }
      }
    });
  };

  s3.listObjects({Bucket: 'grandmastercat'}, Meteor.bindEnvironment(callback));
});
