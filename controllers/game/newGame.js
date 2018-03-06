module.exports = async (collections) => { // return gameId
	try{
		var gameId, query, dbMatch;
		do { 
			gameId = Math.floor(Math.random()*90000) + 10000; // 5 digit number
			query = {'gameId': gameId};
			dbMatch = await collections.games.findOne(query);
		} 
		while ( dbMatch ); // keep looping if dbMatch=true
		
		const newDoc = {'gameId': gameId, 'nextQuestion': 1, 'userAnswers': [], 'score':0 };
		const insert = await collections.games.insertOne( newDoc ); // insert new game into DB
		const result = {'gameId': insert.ops[0].gameId }; // return gameId to client
		return result;
	}catch(err){
		throw err;
	}
};