const model = require('../../models/');
const maxQuestions = 6;

module.exports = (gameId, userAnswer,  callback) => {
// enter usersAnswer into gamesId document. validate answer. return outcome.

	var questionId = 0;
	var realAnswer = '';
	var isUserAnswerCorrect = null;


	getquestionID();
	function getquestionID(){
		var query = {'gameId': gameId};
		model.games.findOne( query, (err,data) => {
			if (err){
				return callback(err,null);
			}
			else if(data == null ){
				return callback('gameId missing',null);
			}
			else{

				questionId = data.nextQuestion;
				getRealAnswer();
			}
		});
	}

	function getRealAnswer(){
		var query = {'questionId': questionId};
		model.qa.findOne( query, (err,data) => {
			if (err){
				return callback(err,null);
			}
			else if(data == null ){
				return callback('gameId missing',null);
			}
			else{
				realAnswer = data.answer;
				verifyUserAnswer();
			}
		});
	}
	function verifyUserAnswer(){
		if( userAnswer == realAnswer ){
			isUserAnswerCorrect = true;

		}else{
			isUserAnswerCorrect = false;
		}
		updateGame();

	}

	function updateGame(){
		var query = {
			query: {'gameId': gameId },
			update: {
				$push: {userAnswers: {'questionId' : questionId, 'userAnswer': userAnswer, 'correctAnswer': isUserAnswerCorrect} }, 
				$inc: {nextQuestion: 1 }
			},
			new: true
		};
		if (isUserAnswerCorrect){
			query.update.$inc.score =  1 ;
		}
		model.games.findAndModify( query, (err,data) => {
			if (err){
				return callback(err,null);
			}
			else if(data == null ){
				return callback('gameId missing',null);
			}
			else{
				var nCount = Object.keys(data.userAnswers).length - 1;
				var response = {
					'questionId':  data.userAnswers[nCount].questionId,
					'nextQuestion': data.nextQuestion,
					'userAnswer': data.userAnswers[nCount].userAnswer,
					'correctAnswer': data.userAnswers[nCount].correctAnswer,
					'score': data.score,
					'maxQuestions': maxQuestions,
					'gameFinished': false
				};
				if (data.nextQuestion > maxQuestions ){
					delete response.nextQuestion;
					response.gameFinished = true;
					return callback(null, response);
				}
				else{
					return callback(null, response);
				}
			}
		});
	}

};