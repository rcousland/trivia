const model = require('../../models/');
const maxQuestions = require('../../config/game.js').maxQuestions;
const mongoUpdateAnswerCmd = require('../mongoUpdateAnswerCmd.js');

module.exports = (gameId, userAnswer) => new Promise( async (resolve, reject) => { // enter answer. validate. return outcome
	try{
		var query = {'gameId': gameId};
		const game = await model.games.findOne( query )
		var count = Object.keys(game.userAnswers).length;
			if (!game) throw (' missing gameId: ' + gameId)
			else if ( count == maxQuestions){ // if game=finished
				const response = {
					'gameId': gameId,
					'gameFinished': true,
					'score': game.score,
					'maxQuestions': maxQuestions,
					'userAnswers': game.userAnswers
				};
				resolve( response )
			}
		const questionId = game.nextQuestion // if game=in progress
		query = {'questionId': questionId}
		const question = await model.qa.findOne( query )
			if (!question) throw ('questionId missing: ' + questionId)
		const realAnswer = question.answer
		const mongoCmd = new mongoUpdateAnswerCmd(gameId, questionId, userAnswer, realAnswer);
		const gameUpdate = await model.games.findAndModify( mongoCmd )
			if (!gameUpdate) throw ('Unable to update answer of gameId_questionId: ' + gameId + '_' + questionId)
		count = Object.keys(gameUpdate.userAnswers).length;
		const lastUserAnswer = gameUpdate.userAnswers[ count - 1 ];
		const score = gameUpdate.score;
		var response = {
			'gameId': gameId,
			'questionId':  lastUserAnswer.questionId,
			'userAnswer': lastUserAnswer.userAnswer,
			'correctAnswer': lastUserAnswer.correctAnswer,
			'score': score,
			'maxQuestions': maxQuestions
		};
			if (count < maxQuestions) { // if game=in progress
				response.gameFinished = false;
				response.nextQuestion = gameUpdate.nextQuestion;
			}
			else if( count == maxQuestions ){ //if game=finished
				response.gameFinished = true;
				response.userAnswers = gameUpdate.userAnswers;
			}
			else throw ('game.answer line 48 catch') // error handle
		resolve( response )
	} catch(e) {
		reject(e)
	}
});