//I need to make a timed quiz that stores high scores

//need HTML interface with minor css sytling

//need a start button to begin the quiz

//then a timer will begin a countdown from 60 seconds

//then the first question appears with multiple choice answers

//after selecting answer, next question appears

//if question is anwered incorrectly, 10 seconds is substracted from clock

//correct answers equal a score

//when all questions are answered or timer reaches 0, game will end

//then prompt at end appears 

//First, I need to get handles on the elements as listed in the HTML//
var startQuiz = document.getElementById("startQuiz");
var quiz = document.getElementById("quizQUestions");
var question = document.getElementById("question");
var questionImage = document.getElementById("questionImage");
var optionA = document.getElementById("A");
var optionB = document.getElementById("B");
var optionC = document.getElementById("C");
var counter = document.getElementById("counter");
var submitQuiz = document.getElementById("submitQuiz");
var results = document.getElementById("results");




//Then I need to create the questions and answer options//
var questions = [
{   question: "What is HTML?",
        optionA: 'hyper text markup language',
        optionB: 'human tranformer mainframe language',
        optionC: 'it does no mean anything',
        correctAnswer: 'A',
},
{   question: "Do all HTML tags have an end tag?",
        optionA: "never",
        optionB: "Yes",
        optionC: "No",
        correctAnswer: 'C',
},
{   question: "How many types of headings does an HTML contain?",
        optionA: "1",
        optionB: "3",
        optionC: "6",
        correctAnswer: 'C',
},
];

//Then I need to create variables for the index of the questions

var lastQuestion = questions.length - 1;
var runningQuestion = 0;

//Then I need to create a for loop function that will render a given question to the right elements

function renderQuestion() {
    var q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    optionA.innerHTML = q.optionA;
    optionB.innerHTML = q.optionB;
    optionC.innerHTML = q.optionC;
}

startQuiz.addEventListener("click",startQuiz);