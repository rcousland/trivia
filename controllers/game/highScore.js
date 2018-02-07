const model = require('../../models/');

module.exports = () => {
	// show 10 highest scores.
	const empty = {'Trivia':'No Highscore data entered'}
	return new Promise( async (resolve, reject) => {
		try {
			result = await model.highScore.findTop10Scores();
			if(result.length > 0 ){ resolve( result ); } 
			else{ resolve(empty); }
		} catch(e) {
			reject(err)
		}
	});
};