const highScore = require('./highScore.js')

module.exports = async (gameId, userName, collections) => { // show 10 highest scores.
	try{
		const query = {'gameId': gameId};
		const game = await collections.games.findOne( query )
			if (!game) throw ('gameId missing: ' + gameId)
		const nameAndScoreEntry = {
			'gameId': gameId,
			'userName': userName,
			'score': game.score
		};
		const insert = await collections.highScore.insert( nameAndScoreEntry )
			if (!insert) throw ('Unable to insert new userName: ' + userName +' gameId: '+ gameId)
		const highScoreList = await highScore(collections)
		return ( highScoreList )
	}
	catch(e){
		console.log(e)
	}
};