const mongoUpdateAnswerCmd = require('./mongoUpdateAnswerCmd.js');

ggg()

async function ggg(){
const gameId = 43421
const questionId = 1
const userAnswer = 'o4'
const realAnswer = 'o4'

const mongoCmd = new mongoUpdateAnswerCmd(gameId, questionId, userAnswer, realAnswer);
const json = await JSON.stringify(mongoCmd)
console.log(json)
}