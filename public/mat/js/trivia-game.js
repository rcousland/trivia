var questionId
var answerSelected = null
var gameStatus = 'newGame'
var gameId
var progress = 0
var maxQuestions = 6
var userScore

//id="questionId"
//id="o1"
//id="o2"
//id="o3"
//id="o4"
//id="p1" - progress bar
//id="mainCard"
// id="view-source" - "new game" or "enter answer"

$( "#o1" ).click(function() {
  selectAnswer(this)
});
$( "#o2" ).click(function() {
  selectAnswer(this)
});
$( "#o3" ).click(function() {
  selectAnswer(this)
});
$( "#o4" ).click(function() {
  selectAnswer(this)
});
$( "#view-source" ).click(async function() {
	console.log(gameStatus)
	if(gameStatus == 'newGame'){
		await newGame()
		changeActionText("Submit")
		await getQuestions()
		gameStatus = 'readyToSubmit'
		showMainCard()
	}	
	else if(gameStatus == 'readyToSubmit'){
		if(answerSelected == null){
			errorToast('Please select an Answer!')
		}else{
			const answer = await submitAnswer()
			showFeedback(answer)
			maxQuestions = answer.maxQuestions
			if (answer.gameFinished) {
				userScore = answer
				gameStatus = 'finished'
				changeActionText("Enter Score")
			}else{
				progress ++
				updateProgress( Math.round(progress/maxQuestions*100) ) 
				changeActionText('Next')
				gameStatus = 'nextQuestion'
			}
		}
	}
	else if(gameStatus == 'nextQuestion'){
		resetButtons()
		answerSelected = null
		hideMainCard()
		await getQuestions()
		nextMainCard()
		gameStatus = 'readyToSubmit'
		changeActionText("Submit")
	}
	else if(gameStatus == 'finished'){
		submitScore(userScore)
		//enterScore()
	}
});

// -------------------------------------------------------------------


async function newGame(){
	console.log('newGame()')
	gameId = await $.get( "/api/game/newgame")
	console.log(gameId)	
}
async function getQuestions(){
	console.log('getQuestions()')
	var question = await $.ajax({
		type: 'POST',
		data: JSON.stringify(gameId),
		contentType: 'application/json',
		url: '/api/game/question'
	});
	console.log(question)
	$("#questionId").text(question.questionId)
	$("#question").text(question.question)
	$("#t1").text(question.o1)
	$("#t2").text(question.o2)
	$("#t3").text(question.o3)
	$("#t4").text(question.o4)
}
function showMainCard(){
	console.log('showMainCard()')
	$( "#mainCard" ).show( 'bounce', { times: 2 }, 1000 )
}
function hideMainCard(){
	console.log('hideMainCard()')
	$("#mainCard").hide("slide", { direction: "left" }, 300); 
}
function nextMainCard(){
	console.log('nextMainCard()')
	$("#mainCard").show("slide", { direction: "right" }, 300); 
}
function showUserScoreCard(){
	console.log('showUserScoreCard()')
	$( "#userScoreCard" ).show( 'bounce', { times: 2 }, 1000 )
}
function hideUserScoreCard(){
	console.log('hideUserScoreCard()')
	$( "#userScoreCard" ).hide("slide", { direction: "left" }, 300); 
}
function showHighScoreCard(){
	console.log('showHighScoreCard()')
	$( "#highScoreCard" ).show( 'bounce', { times: 2 }, 1000 )	
}
function hidehighScoreCard(){
	console.log('hideHighScoreCard()')
	$( "#highScoreCard" ).hide("slide", { direction: "left" }, 300); 
}

function errorToast(message){
	console.log('errorNoInput()')
	var snackbarContainer = document.querySelector('#demo-toast-example');
	var data = {message: message};
	snackbarContainer.MaterialSnackbar.showSnackbar(data);
}
async function submitAnswer(){
	console.log('submitAnswer()')
	var data = gameId
	data.userAnswer = answerSelected
	console.log(data)
	var answer = await $.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: '/api/game/answer'
	});
	return answer
}
function showFeedback(answer){
	console.log('showFeedback()')
	console.log(answer,'answer')
	if(answer.correctAnswer){
		$('#'+answerSelected).animate({backgroundColor: "#009933" }) //green
	}else{
		$('#'+answerSelected).animate({backgroundColor: "#ff1a1a" }) //red
	}
	$('#view-source').text("Next question")
}

function updateProgress(percent){
	console.log('percent()')
	document.querySelector('#p1').addEventListener('mdl-componentupgraded', function() {
		this.MaterialProgress.setProgress(percent);
	});
}

function changeActionText(text){
	console.log('changeActionText()')
	$('#view-source').text(text)
}

function resetButtons(){
	console.log('resetButtons()')
	$('#o1').removeClass("mdl-color--primary");
	$('#o2').removeClass("mdl-color--primary");
	$('#o3').removeClass("mdl-color--primary");
	$('#o4').removeClass("mdl-color--primary");
	$('#o1').addClass("mdl-color--primary");
	$('#o2').addClass("mdl-color--primary");
	$('#o3').addClass("mdl-color--primary");
	$('#o4').addClass("mdl-color--primary");
}

function selectAnswer(id){
	console.log('selectAnswer()')
	if( $(id).hasClass('mdl-color--primary') && answerSelected == null){
		$(id).removeClass("mdl-color--primary");
		$(id).animate({backgroundColor: "#ff8000" });
		answerSelected = $(id).attr('id')
	}else if($(id).hasClass('mdl-color--primary') == false && answerSelected){
		$(id).addClass("mdl-color--primary");
		answerSelected = null
	}
	console.log(answerSelected)
}

function submitScore(score){
	const usersScore = score.score
	const maxQuestions = score.maxQuestions
	const scoreSentence = [userScore," ","out of"," ",maxQuesitons," ","questions correct!"].join()
	// populate users score
	$("#userScoreText").text(scoreSentence)
	// show users score
	showUserScoreCard()

	// use submits name
	// upload score and display top 10 scores

}
// const show = {
// 	showMainCard: function(){
// 		console.log('showMainCard()')
// 		$( "#mainCard" ).show( 'bounce', { times: 2 }, 1000 )
// 	},
// 	userScoreCard: function(){
// 		console.log('showUserScoreCard()')
// 		$( "#userScoreCard" ).show( 'bounce', { times: 2 }, 1000 )
// 	},
// 	highScoreCard: function(){
// 		console.log('showHighScoreCard()')
// 		$( "#highScoreCard" ).show( 'bounce', { times: 2 }, 1000 )	
// 	}
// }
// const hide = {
// 	mainCard: function(){
// 		console.log('hideMainCard()')
// 		$("#mainCard").hide("slide", { direction: "left" }, 300); 
// 	},
// 	userScoreCard: function(){
// 		console.log('hideUserScoreCard()')
// 		$( "#userScoreCard" ).hide("slide", { direction: "left" }, 300); 
// 	},
// 	highScoreCard: function(){
// 		console.log('hideHighScoreCard()')
// 		$( "#highScoreCard" ).hide("slide", { direction: "left" }, 300); 
// 	}
// }