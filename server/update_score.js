var elo = Meteor.npmRequire('elo-rank')(32);
console.log(elo);

Meteor.methods({
  updateScore: function(winnerId, loserId) {
    check(winnerId, String);
    check(loserId, String);

    console.log("updating score", winnerId, loserId);

    var winnerScore = GLOBAL.Cats.findOne(winnerId).score; 
    var loserScore = GLOBAL.Cats.findOne(loserId).score;

    var winnerExpectedScore = elo.getExpected(winnerScore, loserScore);
    var loserExpectedScore = elo.getExpected(loserScore, winnerScore);

    var newWinnerScore = elo.updateRating(winnerExpectedScore, 1, winnerScore);
    var newLoserScore = elo.updateRating(loserExpectedScore, 0, loserScore);

    GLOBAL.Cats.update(winnerId, {$set: {score: newWinnerScore}});
    GLOBAL.Cats.update(loserId, {$set: {score: newLoserScore}});

  }
});