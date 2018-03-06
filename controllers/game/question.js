const maxQuestions = require('../../config/game.js').maxQuestions;

module.exports = async (gameId, collections) => { // get questions
	try{
		var query = {'gameId': gameId};
		const game = await collections.games.findOne( query)
		const count = Object.keys(game.userAnswers).length; // count users answers to questions
		const nextQuestionId = count + 1
		query = {'questionId': nextQuestionId};
		const qaData = await collections.questionsAndAnswers.findOne( query )
		const result = {
			'questionId': qaData.questionId,
			'question': qaData.question,
			'o1': qaData.o1,
			'o2': qaData.o2,
			'o3': qaData.o3,
			'o4': qaData.o4
		}
		return result
	}catch(err) {
		throw(err)
	}
};