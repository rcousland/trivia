module.exports = function (gameId, questionId, userAnswer, realAnswer) {
	this.query = {'gameId': gameId };
	this.update = {
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
	this.new = true;
	if (userAnswer == realAnswer){
		this.update.$push.userAnswers.correctAnswer = true;
		this.update.$inc.score = 1;
	}
	else{
		this.update.$push.userAnswers.correctAnswer = false;	
	}
};