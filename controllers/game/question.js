const model = require('../../models/');
const maxQuestions = require('../../config/game.js').maxQuestions;

module.exports = (gameId, callback) => {
// get gameID. get status. get question and options from gameId status

	var query = {'gameId': gameId};
	//console.log(query);
	model.games.findOne( query, (err,data) => {
		// count users answers to questions
		var count = Object.keys(data.userAnswers).length;
		// error handlers
		if (err){
			return callback(err,null);
		}
		else if(data == null ){
			return callback('gameId missing',null);
		}
		// if game is finished
		else if(count == maxQuestions){
			return callback ( null, {gameFinished: true} );
		}
		// if game is in progress
		else{
			getQuestionAndOptions(count+1);
		}
	});

	function getQuestionAndOptions(nextQuestion){
		query = {'questionId': nextQuestion};
		console.log('query',query);
		model.qa.findOne( query, (err,data) => {
			// error handlers
			if (err){
				return callback(err,null);
			}
			else if(data == null ){
				return callback('questionId missing: ' + nextQuestion ,null);
			}
			// send question and options. remove answer
			else{
				var response = {
					'questionId': data.questionId,
					'question': data.question,
					'o1': data.o1,
					'o2': data.o2,
					'o3': data.o3,
					'o4': data.o4
				};        
				return callback ( null, response );
			}
		});
	}
};