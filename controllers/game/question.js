const model = require('../../models/');
const maxQuestions = require('../../config/game.js').maxQuestions;

module.exports = (gameId) => new Promise( async (resolve, reject) => { // get questions
	try {
		var query = {'gameId': gameId};
		const game = await model.games.findOne( query)
			if (!game) throw ('gameId missing: ' + gameId)
		const count = Object.keys(game.userAnswers).length; // count users answers to questions
			if(count == maxQuestions ){ resolve( {gameFinished: true} )}
		const nextQuestionId = count + 1
		query = {'questionId': nextQuestionId};
		const qaData = await model.qa.findOne( query )
			if (!qaData) throw ('questionId missing: ' + nextQuestionId)
		const response = {
			'questionId': qaData.questionId,
			'question': qaData.question,
			'o1': qaData.o1,
			'o2': qaData.o2,
			'o3': qaData.o3,
			'o4': qaData.o4
		}
		resolve( response )
	} catch(e) {
		reject(e)
	}
});