const schema = require('./schema.js')()

module.exports.newGame = (callback) => {
    var gameId
    var verified = false

    gameIdGenerate()
    function gameIdGenerate(){
        gameId = random(6)
        schema.gameIdValidate( (err,data) => {
            if (err){
                return callback(err,null)
            }
            else{
                if(gameId != data){
                    verified = true
                    callback(null,gameId)
                }
                else {
                    gameIdGenerate()
                }
            }
        })

    }
    // start new game....
        // create "gameID"
        // send gameID and first question

}
// module.exports.userAnswer = () =>{

//         // post answer to question
//         // get response.

// }
// module.exports.userName = () =>{

//         // post users name. enter into DB
//         // get response

// }