var questions = [
    {  
        title: "Commonly used data types DO NOT include:",
        choices: [
            "strings",
            "booleans",
            "alerts",
            "numbers"
        ],
        answer: "alerts"
    },
    {  
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: [
            "quotes",
            "curly brackets",
            "parentheses",
            "square brackets"
        ],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: [
            "commas",
            "curly brackets",
            "quotes",
            "parentheses"
        ],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: [
            "JavaScript",
            "terminal / bash",
            "for loops",
            "console.log"
        ],
        answer: "console.log"
    },
    {
        title: "Inside which HTML element do we put the JavaScript",
        choices: [
            "<javascript>",
            "<js>",
            "<script>",
            "<java>"
        ],
        answer: "<script>"
    },
];

// variables
var timer = document.getElementById("timer");
var container = document.getElementsByClassName("#container");
var introEl = document.getElementById("introDiv");
var quizEl = document.getElementById("quizDiv");
var questionTitle = document.getElementById("questionTitle");
var choicesEl =document.getElementById("choices");
var answerOutput = document.getElementById("answerOutput");
var finalEl = document.getElementById("finalScoreDiv");
var scoreEl = document.getElementById("score");
var initialsEl = document.getElementById("initials");
var highscoreEl = document.getElementById("highScoreDiv");
var scorelistEl = document.getElementById("scorelist");

// buttons
var startBtn = document.getElementById("start");
var choiceBtn = document.querySelectorAll("button.choiceBtn");
var choice1Btn = document.getElementById("choice-1");
var choice2Btn = document.getElementById("choice-2");
var choice3Btn = document.getElementById("choice-3");
var choice4Btn = document.getElementById("choice-4");
var submitBtn = document.getElementById("submitScore");
var backBtn = document.getElementById("goBack");
var clearBtn = document.getElementById("clearScore");

// 
var questionIndex = 0;
var timeLeft = 100;
var timeInterval = 0;
var scoreIni= 0;
// 
function startQuiz() {
    introEl.style.dispaly = "block";
    quizEl.style.display = "none";
    timer.textContent = "Times: " + timeInterval + "s";
    if (timeInterval === 0) {
        timeInterval = setInterval(function(){
            timeLeft--;
            timer.textContent = "Times: " + timeLeft + "s";
            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                timer.textContent = "Times Up!";
            }
        }, 1000)
    };
    renderQuestion();
};

function renderQuestion() {
    introEl.style.display = "none";
    quizEl.style.display = "block";
    for (questionIndex = 0; questionIndex < questions.length; questionIndex++) {
        questionTitle.textContent = questions[questionIndex].title;
        choice1Btn.textContent = questions[questionIndex].choices[0];
        choice2Btn.textContent = questions[questionIndex].choices[1];
        choice3Btn.textContent = questions[questionIndex].choices[2];
        choice4Btn.textContent = questions[questionIndex].choices[3];
    };
};



function answerCheck(event) {
    if (event.value === questions[questionIndex].answer) {
        answerCheck.textContent = "Correct!";
    } else {
        answerCheck.textContent = "Wrong";
        timeLeft = timeLeft - 10;
    }
    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        return;
    }
}

function nextQuestion() {
    for (questionIndex = 1; questionIndex < questions.length; questionIndex++) {
        questionTitle.textContent = questions[questionIndex].title;
        choice1Btn.textContent = questions[questionIndex].choices[0];
        choice2Btn.textContent = questions[questionIndex].choices[1];
        choice3Btn.textContent = questions[questionIndex].choices[2];
        choice4Btn.textContent = questions[questionIndex].choices[3];
    };
}


startBtn.addEventListener("click", startQuiz);

