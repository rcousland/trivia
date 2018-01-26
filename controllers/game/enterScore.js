const model = require('../../models/');
const game = require('../game/');

module.exports = (gameId, userName, callback) => {
	
	getGameIdScore();
	function getGameIdScore(){
		var query = {'gameId': gameId};
		model.games.findOne( query, (err,data) => {
		// count user answers allready made
			// error logging
			if (err){
				return callback(err,null);
			}
			else if(data == null ){
				return callback('gameId missing',null);
			}
			// pass score to next function
			else{
				var nameAndScoreEntry = {
					gameId: gameId,
					userName: userName,
					score: data.score
				};
				updateHighScoreList(nameAndScoreEntry);
			}
		});
	}

	function updateHighScoreList(nameAndScoreEntry){
		model.highScore.insert( nameAndScoreEntry, (err,data) => {
			if (err){
				return callback(err,null);
			}
			else if(data.userName == null ){
				return callback('Mongo: Unable to insert new userName',null);
			}
			else {
				getHighScores();
			}
		});
	}
	function getHighScores(){
		game.highScore( (err,data) => {
			if (err){
				return callback(err,null);
			}
			else {
				return callback(null,data);
			}	
		});
	}
};