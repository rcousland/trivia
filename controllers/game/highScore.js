const model = require('../../models/');

module.exports = async () => { // show 10 highest scores.
	const result = await model.highScore.findTop10Scores();
		if(result.length == 0 ) throw ({'game.highscore':'No Highscore data entered'})
	return result
};