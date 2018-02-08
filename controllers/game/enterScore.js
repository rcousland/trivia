const model = require('../../models/');
const highScore = require('./highScore.js')

module.exports = (gameId, userName) => new Promise( async (resolve, reject) => { // show 10 highest scores.
	try {
		const query = {'gameId': gameId};
		const game = await model.games.findOne( query )
			if (!game) throw ('gameId missing: ' + gameId)
		const nameAndScoreEntry = {
			'gameId': gameId,
			'userName': userName,
			'score': game.score
		};
		const insert = await model.highScore.insert( nameAndScoreEntry )
			if (!insert) throw ('Unable to insert new userName: ' + userName +' gameId: '+ gameId)
		const highScoreList = await highScore()
		resolve ( highScoreList )
	} catch(e) {
		reject(e)
	}
});