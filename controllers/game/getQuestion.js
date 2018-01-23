const model = require('../../models/');

module.exports = (gameId, callback) => {
// get gameID. get status. get question and options from gameId status


	var query = {'gameId': gameId};
	//console.log(query);
	model.games.findOne( query, (err,data) => {
		if (err){
			return callback(err,null);
		}
		else if(data == null ){
			return callback('gameId missing',null);
		}
		else{
			getQuestionAndOptions(data.nextQuestion);
		}
	});

	function getQuestionAndOptions(nextQuestion){
		query = {'questionId': nextQuestion};
		model.qa.findOne( query, (err,data) => {
			if (err){
				return callback(err,null);
			}
			else if(data == null ){
				return callback('questionId missing: ' + nextQuestion ,null);
			}
			else{
				var filter = data;
				delete filter.answer;
				delete filter._id;          
				return callback(null, filter);
			}
		});
	}
};