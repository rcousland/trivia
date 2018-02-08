const model = require('../../models/');
const maxQuestions = require('../../config/game.js').maxQuestions;

module.exports = (gameId) => new Promise( async (resolve, reject) => { // get questions
	try {
		var query
		query = {'gameId': gameId};
		const game = await model.games.findOne( query)
			if (!game) throw ('gameId missing')
		const count = Object.keys(game.userAnswers).length; // count users answers to questions
			if(count == maxQuestions ){ resolve( {gameFinished: true} )}

		const nextQuestionId = count + 1
		query = {'questionId': nextQuestionId};
		const question = await model.qa.findOne( query )
			if (!question) throw ('questionId missing: ' + nextQuestionId)
		
		const response = {
			'questionId': question.questionId,
			'question': question.question,
			'o1': question.o1,
			'o2': question.o2,
			'o3': question.o3,
			'o4': question.o4
		}
		resolve( response )
	} catch(e) {
		reject(e)
	}
});