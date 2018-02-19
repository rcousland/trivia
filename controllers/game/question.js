const maxQuestions = require('../../config/game.js').maxQuestions;
const errorMsg = require('../errorSchema.js')
const __sf = require('../sourceFile')(__filename) //get sourcefile path relative to project

module.exports = async (gameId, collections) => { // get questions
	try{
		var query = {'gameId': gameId};
		const game = await collections.games.findOne( query)
			if (0 ===0) throw new errorMsg('missing', query, __sf, __line)	
		const count = Object.keys(game.userAnswers).length; // count users answers to questions
			if(count == maxQuestions ){ return({gameFinished: true})}
		const nextQuestionId = count + 1
		query = {'questionId': nextQuestionId};
		const qaData = await collections.questionsAndAnswers.findOne( query )
			if (!qaData) throw new errorMsg('missing', query, __sf, __line)
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