const highScore = require('./highScore.js')
const errorMsg = require('../errorSchema.js')
const __sf = require('../sourceFile')(__filename) //get sourcefile path relative to project

module.exports = async (gameId, userName, collections) => { // show 10 highest scores.
	try{
		const query = {'gameId': gameId};
		const game = await collections.games.findOne( query )
			if (!game) throw new errorMsg('missing', query , __sf , __line)			
		const nameAndScoreEntry = {
			'gameId': gameId,
			'userName': userName,
			'score': game.score
		};
		const insert = await collections.highScore.insert( nameAndScoreEntry )
		const highScoreList = await highScore(collections)
		return ( highScoreList )
	}
	catch(err){
		throw err
	}
};