const model = require('../../models/');

module.exports = () => new Promise( async (resolve, reject) => { // show 10 highest scores.
	try {
		const result = await model.highScore.findTop10Scores();
			if(result.length == 0 ){ resolve( {'game.highscore':'No Highscore data entered'} ) } 
			else{ resolve( result ) }
	} catch(e) {
		reject(e)
	}
});