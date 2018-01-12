const schema = require('./schema.js')();

module.exports.newGame = (callback) => {
	var gameId;

	gameIdGenerate();
	function gameIdGenerate(){
		gameId = Math.floor(Math.random()*90000) + 10000; //generates random 5-digit number
		schema.gameIdFind( gameId, (err,data) => {
			if (err){
				return callback(err,null);
			}
			else{ 
				if(gameId != data){
					callback(null,gameId);
				}
				else {
					gameIdGenerate();
				}
			}
		});

	}
	// start new game....
	// create "gameID"
	// send gameID and first question

};
// module.exports.userAnswer = () =>{

//         // post answer to question
//         // get response.

// }
// module.exports.userName = () =>{

//         // post users name. enter into DB
//         // get response

// }