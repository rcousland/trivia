module.exports = (gameId, questionId, userAnswer, realAnswer) => {
	this.query = {'gameId': gameId }
	this.new = true
	this.update = {
		$push: {
			userAnswers: {
				'questionId' : questionId,
				'userAnswer': userAnswer,
				'correctAnswer': ()=>{
					if(userAnswer == realAnswer){
						return true
					}
					else{
						return false
					}
				}
			} 
		}, 
		$inc: { 
			nextQuestion: 1 
		}
	}
	if (userAnswer == realAnswer){
		this.update.$push.userAnswers.correctAnswer = true
		this.update.$inc.score = 1
	}
	else{
		this.update.$push.userAnswers.correctAnswer = false	
	}
}