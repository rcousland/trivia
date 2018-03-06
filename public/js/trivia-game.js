var questionId
var answerSelected = null
var gameStatus = 'newGame'
var gameId
var progress = 0
var totalQuestions = 6
var userScore

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
$( "#action-button" ).click(async function() {
	if(gameStatus == 'newGame'){
		await newGame()
		changeActionText("Submit")
		await getQuestions()
		gameStatus = 'readyToSubmit'
		show.mainCard()
	}	
	else if(gameStatus == 'readyToSubmit'){
		if(answerSelected == null){
			errorToast('Please select an Answer!')
		}else{
			const answer = await submitAnswer()
			show.feedback(answer)
			maxQuestions = answer.maxQuestions
			if (answer.gameFinished) {
				userScore = answer
				gameStatus = 'finished'
				changeActionText("Enter Score")
			}else{
				progress ++
				updateProgress( Math.round(progress/totalQuestions*100) )
				changeActionText('Next')
				gameStatus = 'nextQuestion'
			}
		}
	}
	else if(gameStatus == 'nextQuestion'){
		resetButtons()
		answerSelected = null
		hide.mainCard()
		getQuestions()
		nextMainCard()
		gameStatus = 'readyToSubmit'
		changeActionText("Submit")
	}
	else if(gameStatus == 'finished'){
		submitScore(userScore)
	}
});
$( "#submitHighScore-button" ).click(async function() {
	const userName = $("#userName").val()
	const postHighscore = {
		"userName": userName,
		"gameId": gameId.gameId
	}
	const highScoreList = await submitHighScore(postHighscore)
	await hide.userScoreCard()
	await populateHighScores(highScoreList)
	show.highScoreCard()
})
$( "#reloadPage-button" ).click(function() {
	location.reload()
})

// -------------------------------------------------------------------


async function newGame(){
	gameId = await $.get( "/api/game/newgame")
}
async function getQuestions(){
	var question = await $.ajax({
		type: 'POST',
		data: JSON.stringify(gameId),
		contentType: 'application/json',
		url: '/api/game/question'
	});
	$("#questionId").text(question.questionId)
	$("#question").text(question.question)
	$("#t1").text(question.o1)
	$("#t2").text(question.o2)
	$("#t3").text(question.o3)
	$("#t4").text(question.o4)
}

async function submitHighScore(postHighscore){
	return await $.ajax({
		type: 'POST',
		data: JSON.stringify(postHighscore),
		contentType: 'application/json',
		url: '/api/game/enterScore'
	});
}

const show = {
	mainCard: function(){
		$( "#mainCard" ).show( 'bounce', { times: 2 }, 1000 )
	},
	userScoreCard: function(){
		$( "#userScoreCard" ).show( 'bounce', { times: 2 }, 1000 )
	},
	highScoreCard: function(){
		$( "#highScoreCard" ).show("slide", { direction: "right" }, 300);
	},
	feedback: function(answer){
		if(answer.correctAnswer){
			$('#'+answerSelected).animate({backgroundColor: "#009933" }) //green
		}else{
			$('#'+answerSelected).animate({backgroundColor: "#ff1a1a" }) //red
		}
		$('#action-button').text("Next question")
	}
}
const hide = {
	mainCard: function(){
		return new Promise(function(res,rej){
			$("#mainCard").hide("slide", { direction: "left" }, 300, function(){
				res('done-hide.mainCard')
			}); 
		})
	},
	userScoreCard: function(){
		$( "#userScoreCard" ).hide("slide", { direction: "left" }, 300); 
	},
	highScoreCard: function(){
		$( "#highScoreCard" ).hide("slide", { direction: "left" }, 300); 
	},
	actionButton: function(){
		$( "#action-button" ).hide("slide", { direction: "left" }, 300); 
	}
}

function nextMainCard(){
	$("#mainCard").show("slide", { direction: "right" }, 300); 
}

function errorToast(message){
	var snackbarContainer = document.querySelector('#demo-toast-example');
	var data = {message: message};
	snackbarContainer.MaterialSnackbar.showSnackbar(data);
}
async function submitAnswer(){
	var data = gameId
	data.userAnswer = answerSelected
	var answer = await $.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: '/api/game/answer'
	});
	return answer
}
function showFeedback(answer){
	if(answer.correctAnswer){
		$('#'+answerSelected).animate({backgroundColor: "#009933" }) //green
	}else{
		$('#'+answerSelected).animate({backgroundColor: "#ff1a1a" }) //red
	}
	$('#action-button').text("Next question")
}

function updateProgress(percent){
	document.querySelector('#progressbar1').MaterialProgress.setProgress(percent);
}

function changeActionText(text){
	$('#action-button').text(text)
}

function resetButtons(){
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
	if($(id).hasClass('mdl-color--primary') && answerSelected == null){
		$(id).removeClass("mdl-color--primary");
		$(id).animate({backgroundColor: "#ff8000" });
		answerSelected = $(id).attr('id')
	}else if($(id).hasClass('mdl-color--primary') == false && answerSelected){
		$(id).addClass("mdl-color--primary");
		answerSelected = null
	}
}

async function submitScore(score){
	hide.actionButton()
	await hide.mainCard()
	const userScore = score.score
	const maxQuestions = score.maxQuestions
	const scoreSentence = userScore+" "+"out of"+" "+maxQuestions+" "+"questions correct!"
	$("#userScoreText").text(scoreSentence)
	show.userScoreCard()
	changeActionText("Submit High Score")
}
function populateHighScores(scoreList){
	return new Promise(function(res,rej){
		const len = scoreList.length
		var userNameCell
		var userScoreCell 
		var row
		const startCell = '<td class="mdl-data-table__cell--non-numeric">'
		const endCell = '</td>'
		for (i = 0; i < len; i++) {
			userNameCell = startCell + scoreList[i].userName + endCell
			userScoreCell = startCell + scoreList[i].score + endCell
			row = "<tr>" + userNameCell + userScoreCell + "</tr>"
			$('#top10HighScores-table tbody').append(row);
		}
		res('done-populateHighScores()') 
	})
}