const model = require('../../models/');

module.exports = (callback) => {
	// show 10 highest scores.
	model.highScore.findTop10Scores( (err, data) => {
		if (err){
			return callback(err,null);
		}
		else if(data == null ){
			return callback( {'mongo': 'No highscore data'} , null );
		}
		else {
			return callback(null, data);
		}
	});
};