const model = require('../../models/');

module.exports = (callback) => {
	// start new game....
	// create "gameID"
	// send gameID and first question
	gameIdGenerate();
	function gameIdGenerate(){
		var gameId = Math.floor(Math.random()*90000) + 10000; //generates random 5-digit number
		var query = {'gameId': gameId};
		model.games.findOne( query, (err,data) => {
			if (err){
				return callback(err,null);
			}
			else if(data == null ){
				gameIdInsert(gameId);
			}
			else{
				console.log(gameId,': allready excists. generating new one');
				gameIdGenerate();
			}
		});
	}
	function gameIdInsert(gameId){
		var newDoc = {'gameId': gameId};
		model.insert( newDoc, (err,data) => {
			if (err){
				return callback(err,null);
			}
			else if(data.gameId == null ){
				return callback('Mongo: Unable to insert new gameID',null);
			}
			else {
				console.log(data);
				return callback(null, data);
			}
		});
	}
};