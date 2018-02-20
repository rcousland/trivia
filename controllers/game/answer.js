const maxQuestions = require('../../config/game.js').maxQuestions;
const mongoUpdateAnswerCmd = require('../mongoUpdateAnswerCmd.js');
const errorMsg = require('../errorSchema.js');
const __sf = require('../sourceFile')(__filename); //get sourcefile path relative to project

module.exports = async (gameId, userAnswer, collections) => { // enter answer. validate. return outcome
	try{
		var query = {'gameId': gameId};
		const game = await collections.games.findOne( query );
			//if (!game) throw new errorMsg('missing', 'gameId: '+gameId, __sf, __line);
		var count = Object.keys(game.userAnswers).length;
			//if (!count) throw new errorMsg('missing', 'game.userAnswers! gameId: '+gameId, __sf , __line);
			 if( count == maxQuestions){ // if game=finished
				const result = {
					'gameId': gameId,
					'gameFinished': true,
					'score': game.score,
					'maxQuestions': maxQuestions,
					'userAnswers': game.userAnswers
				};
				return ( result );
			}
		const questionId = game.nextQuestion; // if game=in progress
		query = {'questionId': questionId};
		const question = await collections.questionsAndAnswers.findOne( query );
			//if (!question) throw new errorMsg('missing', 'questionId: '+questionId, __sf, __line);	
		const realAnswer = question.answer;
		const mArgs = new mongoUpdateAnswerCmd(gameId, questionId, userAnswer, realAnswer);
		const mUpdate = await collections.games.findAndModify( mArgs.query, [], mArgs.update, mArgs.returnNewDoc );
		const gameUpdate = mUpdate.value
			//if (!gameUpdate) throw new errorMsg('err', 'Unable to update answer of gameId_questionId: '+gameId+'_'+questionId, __sf, __line);
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
			//else throw new errorMsg('err', 'count > maxQuestions. should be reverse'+count+'_'+maxQuestions, __sf, __line);
			return ( result );
	}
	catch(err){
		throw err;
	}
};