var questionId
var answerSelected = null
var gameStatus = 'newGame'
var gameId


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
$( "#view-source" ).click(function() {
	console.log(gameStatus)
	if(gameStatus == 'newGame'){
		newGame(this)
	}	
	else if(gameStatus == 'inProgress'){
		if(answerSelected == null){
			errorNoInput()
		}else{
			submitAnswer()
		}
	}else{
		enterScore()
	}
});

async function newGame(id){
	$(id).text("Submit Answer")
	gameId = await $.get( "/api/game/newgame")
	console.log(gameId)	
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
	$( "#mainCard" ).show( 'bounce', { times: 2 }, 1000 )
	gameStatus = 'inProgress'
}
function errorNoInput(){
	var snackbarContainer = document.querySelector('#demo-toast-example');
	var data = {message: "Please select an Answer!"};
	snackbarContainer.MaterialSnackbar.showSnackbar(data);
}
async function submitAnswer(){
	var data = gameId
	data.userAnswer = answerSelected
	console.log(data)
	var answer = await $.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: '/api/game/answer'
	});
	console.log(answer)

}


function selectAnswer(id){
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

function resetButtons(){}
function enterScore(){}

//id="questionId"
//id="o1"
//id="o2"
//id="o3"
//id="o4"
//id="p1" - progress bar
//id="mainCard"

// id="view-source" - "new game" or "enter answer"


document.querySelector('#p1').addEventListener('mdl-componentupgraded', function() {
	this.MaterialProgress.setProgress(87);
  });
