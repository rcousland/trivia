const model = require('../../models/');
const maxQuestions = require('../../config/game.js').maxQuestions;
const mongoUpdateAnswerCmd = require('../mongoUpdateAnswerCmd.js');

module.exports = async (gameId, userAnswer) => { // enter answer. validate. return outcome
	var query = {'gameId': gameId};
	const game = await model.games.findOne( query )
	var count = Object.keys(game.userAnswers).length;
		if (!game) throw (' missing gameId: ' + gameId)
		else if ( count == maxQuestions){ // if game=finished
			const result = {
				'gameId': gameId,
				'gameFinished': true,
				'score': game.score,
				'maxQuestions': maxQuestions,
				'userAnswers': game.userAnswers
			};
			return ( result )
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
	var result = {
		'gameId': gameId,
		'questionId':  lastUserAnswer.questionId,
		'userAnswer': lastUserAnswer.userAnswer,
		'correctAnswer': lastUserAnswer.correctAnswer,
		'score': score,
		'maxQuestions': maxQuestions
	};
		if (count < maxQuestions) { // if game=in progress
			result.gameFinished = false;
			result.nextQuestion = gameUpdate.nextQuestion;
		}
		else if( count == maxQuestions ){ //if game=finished
			result.gameFinished = true;
			result.userAnswers = gameUpdate.userAnswers;
		}
		else throw ('game.answer ling 47: count > maxQuestions',count,maxQuestions) // error handle
	return ( result )
};