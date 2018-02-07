const model = require('../../models/');
const maxQuestions = require('../../config/game.js').maxQuestions;
const mongoUpdateAnswerCmd = require('../mongoUpdateAnswerCmd.js');
const mongoErr = {'Error':'Mongo Error'};

module.exports = (gameId, userAnswer,  callback) => {
// enter usersAnswer into gamesId document. validate answer. return outcome.
	var questionId, realAnswer;

	getquestionID();
	function getquestionID(){
		var query = {'gameId': gameId};
		model.games.findOne( query, (err,data) => {
			// count user answers allready made
			var count = Object.keys(data.userAnswers).length;
			// error logging
			if (err){
				return callback(err,null);
			}
			else if(data == null ){
				return callback(mongoErr,null);
			}
			// when game is allready finished
			else if( count == maxQuestions ){
				var response = {
					'gameId': gameId,
					'gameFinished': true,
					'score': data.score,
					'maxQuestions': maxQuestions,
					'userAnswers': data.userAnswers
				};
				return callback(null, response);
			}
			// when game is still in progress
			else{
				questionId = data.nextQuestion;
				getRealAnswer();
			}
		});
	}

	// get real answer
	function getRealAnswer(){
		var query = {'questionId': questionId};
		model.qa.findOne( query, (err,data) => {
			if (err){
				return callback(err,null);
			}
			else if(data == null ){
				return callback(mongoErr,null);
			}
			else{
				realAnswer = data.answer;
				updateGame();
			}
		});
	}

	// update gamieId document with user results. return response from new data entered into mongo
	function updateGame(){
		// create command for mongo
		var mongoCmd = new mongoUpdateAnswerCmd(gameId, questionId, userAnswer, realAnswer);
		model.games.findAndModify( mongoCmd, (err,data) => {
			// Error handling
			if (err){
				return callback(err,null);
			}
			else if(data == null ){
				return callback(mongoErr,null);
			}
			else{
				sendResponse(data);
			}
		});
	}
	function sendResponse(data){
		var count = Object.keys(data.userAnswers).length;
		var lastUserAnswer = data.userAnswers[ count - 1 ];
		var score = data.score;
		var response = {
			'questionId':  lastUserAnswer.questionId,
			'userAnswer': lastUserAnswer.userAnswer,
			'correctAnswer': lastUserAnswer.correctAnswer,
			'score': score,
			'maxQuestions': maxQuestions,
		};

		// if game is still in progress
		if ( count < maxQuestions){
			response.gameFinished = false;
			response.nextQuestion = data.nextQuestion;
			return callback(null, response);
		}
		// if game has finished
		else if ( count ==  maxQuestions ){
			response.gameFinished = true;
			response.userAnswers = data.userAnswers;
			return callback(null, response);
		}
		// error handling
		else {
			return callback('answer.js line 102 catch', null);
		}
	}
};