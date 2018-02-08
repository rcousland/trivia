const model = require('../../models/');

module.exports = () => new Promise( async (resolve, reject) => { // show 10 highest scores.
	try {
		const result = await model.highScore.findTop10Scores();
		const empty = {'Trivia':'No Highscore data entered'}
			if(result.length > 0 ){ resolve( result ); } 
			else{ resolve(empty); }
	} catch(e) {
		reject(err)
	}
});