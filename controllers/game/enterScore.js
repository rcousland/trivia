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
			// highScoreList returns a readable .missing object if missing
		return ( highScoreList )
	}
	catch(err){
		if (!insert) throw new errorMsg('err', 'Unable to insert new userName! userName_gameId: '+userName+'_'+gameId , __sf , 15)
		else throw err
	}
};