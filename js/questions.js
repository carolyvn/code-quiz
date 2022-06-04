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
];

// variables
var timer = document.getElementById("timer");
var container = document.getElementsByClassName("container");
var introDiv = document.getElementById("introDiv");
var quizDiv = document.getElementById("quizDiv");
var scoreDiv = document.getElementById("scoreDiv");
var highScoresDiv = document.getElementById("highScoreDiv");


var questionTitle = document.getElementById("questionTitle");
var choicesUl = document.getElementById("choicesUl");
var answerOutput = document.getElementById("answerOutput");

var scoreEl = document.getElementById("score");
var initialsEl = document.getElementById("initials");
var scorelistEl = document.getElementById("scorelist");

// buttons
var startBtn = document.getElementById("start");
// var choiceBtn = document.querySelectorAll("button.choiceBtn");
var choice1Btn = document.getElementById("choice1");
var choice2Btn = document.getElementById("choice2");
var choice3Btn = document.getElementById("choice3");
var choice4Btn = document.getElementById("choice4");
var submitBtn = document.getElementById("submitBtn");
var backBtn = document.getElementById("goBack");
var clearBtn = document.getElementById("clearScore");


var questionIndex = 0;
var timeLeft = 100;
var timeInterval = 0;
var score = 0;
// 
function startQuiz() {
    introDiv.style.display = "none";
    quizDiv.style.display = "block";
    timer.textContent = "Times: " + timeInterval + "s";
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {
            timer.textContent = "Times: " + timeLeft + "s";
            timeLeft--;

            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                allDone();
                timer.textContent = "Times Up!";
            }
        }, 1000)
    };
    renderQuestion();
};

function renderQuestion() {
    introDiv.style.display = 'none';
    questionTitle.textContent = questions[questionIndex].title;
    choice1Btn.textContent = questions[questionIndex].choices[0];
    choice2Btn.textContent = questions[questionIndex].choices[1];
    choice3Btn.textContent = questions[questionIndex].choices[2];
    choice4Btn.textContent = questions[questionIndex].choices[3];
};

function answerCheck(event) {

    if (questions[questionIndex].answer === event.target.value) {
        answerOutput.textContent = "Correct!";
        score++;
    } else {
        timeLeft = timeLeft - 10;
        answerOutput.textContent = "Wrong! Correct answer is " + questions[questionIndex].answer;
    }

    questionIndex++;

    if (questionIndex < questions.length) {
        renderQuestion();
    } else {
        allDone();
    }
};

choice1Btn.addEventListener('click', answerCheck);
choice2Btn.addEventListener('click', answerCheck);
choice3Btn.addEventListener('click', answerCheck);
choice4Btn.addEventListener('click', answerCheck);


function allDone() {
    scoreDiv.style.display = "block";
    introDiv.style.display = "none";
    quizDiv.style.display = 'none';
    scoreEl.textContent = score;
}

function storeScore(event) {
    event.preventDefault();

    // if (initialsEl.value === ''); {
    //     alert('Please enter your initials');
    // }
    var scoreArray = [];
    var userScore = {
        initials: initialsEl.value,
        score: score,
    };

    scoreArray.push(userScore);
    window.localStorage.setItem('highScores', JSON.stringify(scoreArray));

    window.redirect('/');
}
    
function showHighScore() {
    highScoresDiv.style.display = 'block';
    introDiv.style.display = 'none',
        scoreDiv.style.display = 'none';

    var savedScore = localStorage.getItem('highScores');

    if (savedScore === null) {
        return;
    }

    var storedHighScore = JSON.parse(savedScore);

    for (var i = 0; i < storedHighScore.length; i++) {
        var list = document.createElement('li');
        list.innerHTML = history.initials + ": " + history.score;
        scorelistEl.appendChild(list);

    }
}





startBtn.addEventListener("click", startQuiz);

submitBtn.addEventListener('click', storeScore);

viewHighScore.addEventListener('click',function() {
    introDiv.style.display = 'none';
    highScoresDiv.style.display = 'block';
});

goBackBtn.addEventListener('click', function () {
    introDiv.style.display = 'block';
    highScoresDiv.style.display = 'none';
});

clearBtn.addEventListener('click', function () {
    window.localStorage.removeItem('');
    scorelistEl.innerHTML = '';
});
