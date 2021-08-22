//I need to make a timed quiz that stores high scores

//First, I need to get handles on the elements as listed in the HTML//
let quiz = document.querySelector("#quiz");
let intro = document.querySelector("#introduction");
let assessFT = document.querySelector("#assess-ft");
let progressBar = document.querySelector("#.progress");
let startBtn = document.querySelector("#startBtn");
let timeSpan = document.querySelector("#timeSpan");
let questionH5 = document.querySelector("#question");
let answersDiv = document.querySelector("#answers");
let allDone = document.querySelector("#allDone");
let finalScore = document.querySelector("#finalScore");
let submit = document.querySelector("#submit");
let highScoresList = document.querySelector("#highScoresList");
let initials = document.querySelector("#initials");
let clearHighScoresBtn = document.querySelector("#clearHighScoresBtn");

//Global Declarations//

let totalSeconds = 60;
let timeRemaining = totalSeconds;
let secondsElapsed = 0;
let discountSeconds = 0;
let currentQuestion = 0;
let progress = 0;
let correctAnswers = 0;
let correctScore = 0;
var localHighScoresArray = [];
let time = setInterval(timer,1000);
let justRegistered = false;
clearInterval(time);


//Then I need to create the questions and answer options//
let quizArray = [
{   question: "What is HTML?",
       options: ["hypertext markup language", "human transport media language", "nobody knows"],
       correct: 0,
},
{   question: "Do all HTML tags have an end tag?",
        options: ["Yes", "No", "nobody knows"],
        correct: 1,

},
{   question: "How many types of headings does an HTML contain?",
        options: ["One", "Three", "Six"],
        correct: 2,
},
];

document.getElementById('starBbtn').addEventListener("click", startQuiz);
startBtn.addEventListener("click", startQuiz);
answersDiv.addEventListener("click", assessSelection);
submit.addEventListener("click", addToHighScores);
clearHighScoresBtn.addEventListener("click", clearHighScores);
$("#staticBackdrop").optionA("shown.bs.modal", function (e) {
        loadHighScores();
});
$("#staticBackdrop").optionA("hidden.bs.modal", function (e) {
        if (justRegistered) {
                init();
        }
});

init();

//Then I need to declare my functions//

function init() {
        timeSpan.textContent = timeRemaining;
        quiz.style.display = "none";
        allDone.style.display = "none";
        assessFT.style.display = "none";
        intro.style.display = "block";
        startBtn.style.display = "block";
        progressBar.style.display = "none";

        totalSeconds = 60;
        timeRemaining = totalSeconds;
        secondsElapsed = 0;
        discountSeconds = 0;
        currentQuestion = 0;
        progress = 0;
        correctAnswers = 0;
        correctScore = 0;
        justRegistered = false;
        timeSpan.textContent = timeRemaining;

        if(localStorage.getItem("highscore")){
                localHighScoresArray = localStorage.getItem("highScore").split(",");
        }
        clearInterval(time);
        updateProgress();

        allDone.firstElementChild.setAttribute("class", "alert alert-info mt-0 mb-0");
        submit.setAttribute("class", "btn btn-info");
        progressBar.firstElementChild.setAttribute("class","progress-bar bg-info progress-bar-striped progress-bar-animated");
}

function startQuiz() {
        intro.style.display = "none";
        startBtn.style.display = "none";
        quiz.style.display = "block";
        time = setInterval(timer, 1000);
        progressBar.style.display = "block";
        showQuestion();
}

function timer() {
        timeRemaining = totalSeconds - secondsElapsed - 1 - discountSeconds;
        timeSpan.textContent = timeRemaining;
        secondsElapsed++;
        if (timeRemaining <=0) {
                clearInterval(time);
                disableQuestions();
                gameOver("time_out");
        }
}

function showQuestion() {
        questionH5.textContent = quizArray[currentQuestion].question;
        var optionsBtnsArray = [];
        var indexArray = [];
        
        for (i = 0; i < quizArray[currentQuestion].options.length; i++) {
                var questionBtn = document.createElement("button");
                questionBtn.setAttribute("type", "button");
                questionBtn.setAttribute("class", "list-group-item list-group-item-action list-group-item-info mt-1 answerButton");
                questionBtn.setAttribute("data-index", i);
                if (i === 0) {
                        questionBtn.setAttribute("correct", "yes");
                }else {
                        questionBtn.setAttribute("correct", "no");
                }
                questionBtn.textContent = quizArray[currentQuestion].options[i];
                answersDiv.append(questionBtn);
                indexArray.push(i);
        }

        answersDiv.childNodes.forEach(function (child){
                var rndIndex = Math.floor(Math.random() * indexArray.length);
                indexArray.splice(rndIndex, 1);
        });
}

function disableQuestions() {
        let questionsAssed = document.querySelectorAll(".answerButton");
        questionsAssed.forEach((element) => {
                element.setAttribute("class", "list-group-item list-group-item-action list-group-item-danger mt-1 answerButton disabled");
                if (parseInt(element.getAttribute("data-index")) ===
                quizArray[currentQuestion].correct
                ) {
                        element.setAttribute("class", "list-group-item list-group-item-action list-group-item-success mt-1 answerButton disabled"
                );
        }
        
});
}

function assessSelection(event) {
        if (event.target.matches("button")) {
                var index = parseInt(event.target.getAttribute("data-index"));
                var timeInterval = 1000;
                disableQuestions();
                if (event.target.getAttribute("correct") === "yes") {
                        displayFTAlert(true);
                        correctAnswers++;
                }else{
                        discountSeconds +=3;
                        clearInterval(time);
                        time = setInterval(timer, 1000);
                        displayFTAlert(false);
                }
                currentQuestion++;
                updateProgress();

                if (currentQuestion === quizArray.length) {
                        timeInterval = 6000;
                        gameOver("questions_done");
                }else{
                        setTimeout(removeQuestionsButtons, 1000);
                        setTimeout(showQuestion, 1001);
                }

                setTimeout(function (){
                        assessFT.style.display = "none";
                }, timeInterval);
        }
}

function updateProgress() {
        progress = Math.floor((currentQuestion / quizArray.length) * 100);
        var styleStr = String("width: " + progress + "%; height: 100%;");
        progressBar.firstElementChild.setAttribute("style", styleStr);
        progressBar.firstElementChild.textContent = progress + " %";
        correctScore = Math.floor((correctAnswers / quizArray.length) * 100);
}

function displayFTAlert(correct) {
        if (correct) {
                assessFT.setAttribute("class", "alert alert-success mt-0 mb-0 pt-0 pb-0 text-center");
                assessFT.innerHTML = "<strong>Correct</strong>";
                assessFT.style.display = "block";
        }else{
                assessFT.setAttribute("class", "alert alert-danger mt-0 mb-0 pt-0 pb-0 text-center");
                assessFT.innerHTML = "<strong>Opps! Incorrect. </strong> 3 seconds discounted. Try again!";
                assessFT.style.display = "block";
                timeSpan.style.color = "red";
                setTimeout(function () {
                        timeSpan.style.color = "black";
                }, 1000);
            
        }
}

function removeQuestionsButtons() {
        questionH5.textContent = "";
        var child = answersDiv.lastElementChild;
        while (child) {
                answersDiv.removeChild(child);
                child = answersDiv.lastElementChild;
        }
}

function gameOver(cause) {
        if (cause === "questions_done") {
                console.log("QUESTIONS DONE");
                setTimeout(() => {
                        assessFT.setAttribute("class", "alert alert-dark mt-0 mb-0 pt-0 pb-0 text-center");
                        assessFT.innerHTML = "<strong>Quiz Complete!</strong> Did you get the high score?"; 
                }, 1500);
                clearInterval(time);
                }else if (cause === "time_out") {
                        console.log("TIME IS OUT");
                        disableQuestions();
                        assessFT.setAttribute("class", "alert alert-info mt-0 mb-0 pt-0 pb-0 text-center");
                        assessFT.innerHTML = "<strong>Time is up!</strong>";
                }else {
                        return false;
                }
                assessFT.style.display = "block";
                if (correctScore >=70) {
                        setTimeout(() => {

                        }, 5000);
                }else{
                        setTimeout(() => {
                                allDone.firstElementChild.setAttribute("class", "alert alert-danger mt-0 mb-0");
                                progressBar.firstElementChild.setAttribute("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
                                submit.setAttribute("class", "btn btn-danger");
                        }, 5000);
                }
        function addToHighScores() {
                var highScoreElement = document.createElement("li");
                var highScoreStr = initials.value + "-" + correctScore;
                localHighScoresArray.push(highScoreStr);
                var highScoreArrayStr = localHighScoresArray.toString();
                highScoreElement.textContent = highScoreStr;
                highScoresList.append(highScoreElement);
                localStorage.setItem("highscore", localHighScoresArray);
                justRegistered = true;
                initials.value = "";

                $("staticBackdrop").modal("show");
        }

        function loadHighScores() {
                var tempHighScoresArray = [];
                var tempHighScoresObject = {};
                var tempHighScoresObjectsArray = [];
                var tempLocalScoresArray = [];
                while (highScoresList.hasChildNodes()){
                        highScoresList.removeChild(highScoresList.childNodes[0]);
                }
                var lastPos;
                var lasChar = "";
                var localScore = 0;
                var localStrScore = "";
                var tempHighScore = "";
                for (i = 0; i < localHighScoresArray.length; i++) {
                        for(j = localHighScoresArray[i].length - 1; j >= 0; j--) {
                                lastPos = localHighScoresArray[i].length - 1;
                                lastChar = localHighScoresArray[i][lastPos - j];
                                if (lastChar && lastChar >= 0 && lastChar <= 9) {
                                        localScore += lastChar;
                                }
                                if (j > 1) {
                                        if (j === 2 && lastChar === "1") {
                                
                                        }localStrScore += lastChar;
                                }
                                localScore = parseInt(localScore);
                        }

                        tempHighScore = localScore + localStrScore;
                        tempHighScoresArray.push(tempHighScore);
                        tempHighScoresObject.score = localScore;
                        tempHighScoresObject.scoreStr = localStrScore;

                        tempHighScoresObjectsArray.push(tempHighScoresObject);
                        tempLocalScoresArray.push(localScore);
                        localScore = 0;
                        localStrScore = "";
                        tempHighScoresObject = {};     
                }
                tempLocalScoresArray.sort(function (a,b) {
                        return b-a;
                });
                var sortedScoresCompleteArray = [];
                var flagged = [];
                tempLocalScoresArray.forEach(function(element) {
                        tempHighScoresObjectsArray.forEach(function (object, index) {
                                if(element === object.score && !flagged.includes(index)) {
                                        flagged.push(index);
                                
                                var tempScoreString = object.scoreSTr = " " + object.score;
                        sortedScoresCompleteArray.push(tempScoreString);
                        }
                        });
                });
                for (i = 0; i < sortedScoresCompleteArray.length; i++) {
                        var highScoreElement = document.createElement("li");
                        highsScoreElement.textContent = sortedScoresCompleteArray[i];
                        for (j = sortedScoresCompleteArray[i].length - 1; j >= 0; j--) {
                                lastPos = sortedScoresCompleteArray[i].length -1;
                                lastChar = sortedScoresCompleteArray[i][lastPos - j];
                                if(lastChar && lastChar >= 0 && lastChar <= 9) {
                                        localScore += lastChar;
                                }
                                if (j > 1) {
                                        localStrScore += lastChar;
                                }
                                localScore = parseInt(localScore);
                        }
                        tempHighScore = localScore + localStrScore;

                        if(localScore > 80 && localScore <= 100) {
                                highScoreElement.setAttribute("class", "list-group-item list-group-item-success");
                        }else if (localScore > 70 && localScore <= 80) {
                                highScoreElement.setAttribute("class", "list-group-item list-group-item-info");
                        }else if (localScore > 60 && localScore <= 70) {
                                highsScoreElement.setAttribute("class", "list-group-item list-group-item-primary");
                        }else if (localScore > 50 && localScore <= 60) {
                                highsScoreElement.setAttribute("class", "list-group-item list-group-item-warning");
                        }else if (localScore <= 50) {
                                highScoreElement.setAttribute("class", "list-group-item list-group-item-danger");
                        }

                        highScoresList.append(highScoreElement);
                        tempHighScoresArray.push(tempHighScore);
                        tempHighScoresObject.score = localScore;
                        tempHighScoresObject.scoreStr = localStrScore;
                        tempHighScoresObjectsArray.push(tempHighScoresObject);
                        tempLocalScoresArray.push(localScore);
                        localScore = 0;
                        localStrScore = "";
                        tempHighScoresObject = {};
                }
        }
        function clearHighScores() {
                localHighScoresArray = [];
                localStoreage.setItem("highscore", localHighScoresArray);
                loadHighScores();
        }         
}
