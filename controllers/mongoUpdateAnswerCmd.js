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
	this.update = update
	this.returnNewDoc = {new:true}
};


// collection.findAndModify({a:1}, [['a', 1]], {$set:{b1:1}}, {new:true}, function(err, doc) {

// 	db.collection("collection_name").findAndModify(
// 		{ _id: _id },     // query
// 		[],               // represents a sort order if multiple matches
// 		{ $set: data },   // update statement
// 		{ new: true },    // options - new to return the modified document
// 		function(err,doc) {
	
// 		}
// 	);