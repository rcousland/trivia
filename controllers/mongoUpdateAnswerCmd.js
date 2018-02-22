module.exports = function (gameId, questionId, userAnswer, realAnswer) {
	this.query = {'gameId': gameId };
	var update = {
		$push: {
			userAnswers: {
				'questionId' : questionId,
				'userAnswer': userAnswer
			} 
		}, 
		$inc: { 
			nextQuestion: 1 
		}
	};
	if (userAnswer == realAnswer){
		update.$push.userAnswers.correctAnswer = true;
		update.$inc.score = 1;
	}
	else{
		update.$push.userAnswers.correctAnswer = false;	
	}
	this.update = update;
	this.returnNewDoc = {new:true};
};