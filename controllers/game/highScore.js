const errorMsg = require('../errorSchema.js')
const __sf = require('../sourceFile')(__filename) //get sourcefile path relative to project

module.exports = async (collections) => { // show 10 highest scores.
	try{
		const options = { 
			sort: { score: -1},
			limit: 10,
			Projection: { _id: 0, gameId: 0}
		}
		const result = await collections.highScore.find( {}, options ).toArray()
		if (!result) return new errorMsg('missing', 'No Highscore data entered', __sf, __line)	
		else return result
	}catch(e){
		throw e
	}
};