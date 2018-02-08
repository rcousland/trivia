const model = require('../../models/');

module.exports = () => new Promise( async (resolve, reject) => { // return gameId
	try {
		var gameId, query, dbMatch
		do { 
			gameId = Math.floor(Math.random()*90000) + 10000; // 5 digit number
			query = {'gameId': gameId}
			dbMatch = await model.games.findOne( query ) // search DB for gameId
		} 
		while ( dbMatch ); // keep looping if dbMatch=true
		
		const newDoc = {'gameId': gameId, 'nextQuestion': 1, 'userAnswers': [], 'score':0 };
		const insert = await model.games.insert( newDoc ) // insert new game into DB
		const response = {'gameId': insert.gameId }; // return gameId to client
		resolve( response )
	} catch(e) {
		reject(e)
	}
});