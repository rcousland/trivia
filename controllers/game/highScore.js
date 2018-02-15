module.exports = async (collections) => { // show 10 highest scores.
	try{
		const options = { 
			sort: { score: -1},
			limit: 10,
			Projection: { _id: 0, gameId: 0}
		}
		const result = await collections.highScore.find( {}, options ).toArray()
		return result
	}catch(e){
		console.log(e)
	}
};