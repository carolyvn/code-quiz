/*
 * questions.js is loaded in the HTML before quiz.js
 * It creates a global variable called questions that contains starter questions.
 * Take a look at the structure and familiarize yourself with each part
 * then, add some of your own questions!
 * Use this data to populate your quiz questions, choices, and answers.
 */
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

var viewHighScore = document.getElementById("viewHighScore");

var introDiv = document.getElementById("introDiv");
var quizDiv = document.getElementById("quizDiv");
var finalScoreDiv = document.getElementById("finalScoreDiv");
var highScoresDiv = document.getElementById("highScoresDiv");

var timer = document.getElementById("timer");
var startBtn = document.getElementById("start");

var questionTitle = document.getElementById("questionTitle");
var choices = document.getElementsByClassName(".choices");
var choicesEl = document.getElementById("choicesEl");
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");
var answerOutput = document.getElementById("answerOutput");

var score = document.querySelector("#score");
var initials = document.querySelector("#initials");
var submitBtn = document.getElementById("submitScore");

var scoreList = document.getElementById("scoreList");
var list = document.getElementById("list");
var goBackBtn = document.getElementById("goBack");
var clearScoreBtn = document.getElementById("clearScore");

var questionIndex = 0;
var lastQuestion = questions.length -1;
var scoreInitial = 0;
var timeLeft = 76;
var timeInterval = 0;


startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    introDiv.style.display = "none";
    quizDiv.style.display = "block";
    timer.textContent = "";
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {
            timer.textContent = timeLeft + "s";
            timeLeft--;

            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                endQuiz();
                if (questionIndex > questions.length);{
                    endQuiz();
                }
            };
        }, 1000);    
    }
    renderQuestion();
};

function renderQuestion() {
    for ( var i = questionIndex; i < questions.length; i++) {
        questionTitle.textContent = questions[i].title;
        choice1.textContent = questions[i].choices[0];
        choice2.textContent = questions[i].choices[1];
        choice3.textContent = questions[i].choices[2];
        choice4.textContent = questions[i].choices[3];
    }

    
    // for (var i = questionIndex; i < questions.length; i++) {
    //     questionTitle.textContent = questions[i].title;
    //     choice1.textContent = questions[i].choices[0];
    //     choice2.textContent = questions[i].choices[1];
    //     choice3.textContent = questions[i].choices[2];
    //     choice4.textContent = questions[i].choices[3];
    //     answer = questions[i].answer;
    //     console.log(questions[i]);
    // };
};  



function answerCheck(event) {
    event.preventDefault();
    if (questions[questionIndex].answer === event.target.value) {
        scoreInitial++;
        answerOutput.textContent = "Correct!";
        console.log(scoreInitial);
    } else {
        timeLeft = timeLeft - 10;
        answerOutput.textContent = "Wrong!";
        console.log(timeLeft);
    }; 
    
    if (questionIndex < questions.length) {
        questionIndex++;
    };

    renderQuestion(questionIndex);   
};

choices.forEach(item => {
    item.addEventListener('click', answerCheck);
})



function endQuiz() {
    quizDiv.style.display = "none";
    finalScoreDiv.style.display = "block";
    highScoresDiv.style.display = "none";  
    score.textContent = scoreInitial; 
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();

        initials = document.querySelector("#initials").value;
        localStorage.setItem(initials, scoreInitial);
        // var item = document.createElement("li");
        // console.log(item);
        // list.append(item);
        // item = [initials, scoreInitial];
    });
    
};


// function saveScore() {
//     initials.textContent = initials.innerText;
//     score.textContent = score.innerText;
//     localStorage.setItem(initials, score);
//     // scoreList.appendChild(score);
// };

goBackBtn.addEventListener("click", function(){
    finalScoreDiv.style.display = "none";
    highScoresDiv.style.display = "none";
    introDiv.style.display = "block";
});
// clearScoreBtn.addEventListener("click", clearScore);

// function clearScore() {
    
//     localStorage.clear();
// };

viewHighScore.addEventListener("click", function() {
    introDiv.style.display = "none";
    quizDiv.style.display = "none";
    finalScoreDiv.style.display = "none";
    highScoresDiv.style.display = "block";
    list = document.createElement("ul");
    item = document.createElement("li");
    item.textContent = localStorage.getItem(initials, score);

    list.appendChild(item);
    scoreList.appendChild(list);
    
});




// choice1.addEventListener("click", function() {
//     if (choice1.innerText === answer) {
//         answerOutput.textContent = "Correct";
//         scoreInitial++;
//         console.log(scoreInitial)
//     } else {
//         answerOutput.textContent = "Wrong";
//         timeLeft = timeLeft - 10;
//         console.log(timeLeft);
//     };
//     nextQuesiton();
// });

// choice4.addEventListener("click", function() {
//     if (choice4.innerText === answer) {
//         answerOutput.textContent = "Correct";
//         scoreInitial++;
//         console.log(scoreInitial)
//     } else {
//         answerOutput.textContent = "Wrong";
//         timeLeft = timeLeft - 10;
//         console.log(timeLeft);
//     };
    
//     nextQuestion();
    
// });


    // choice2.addEventListener("click", function() {
    //     if (choice2 === answer) {
    //         answerOutput.textContent = "Correct";
    //         scoreInitial++;
    //     } else {
    //         answerOutput.textContent = "Wrong";
    //         timeLeft = timeLeft - 10;
    //         renderFirstQuestion();
    //     }
    // });
    // choice3.addEventListener("click", function() {
    //     if (choice3 === answer) {
    //         answerOutput.textContent = "Correct";
    //         scoreInitial++;
    //     } else {
    //         answerOutput.textContent = "Wrong";
    //         timeLeft = timeLeft - 10;
    //         renderFirstQuestion();
    //     }
    // });
    // choice4.addEventListener("click", function() {
    //     if (choice4 === answer) {
    //         answerOutput.textContent = "Correct";
    //         scoreInitial++;
    //     } else {
    //         answerOutput.textContent = "Wrong";
    //         timeLeft = timeLeft - 10;
    //         renderFirstQuestion(questionIndex++);
    //     }
    // });
    // choice2.addEventListener("click", function() {
    //     console.log("c2");
    // });choice3.addEventListener("click", function() {
    //     console.log("c3");
    // });
    // choice4.addEventListener("click", function() {
    //     console.log("c4");
    // });

    // choices.addEventListener("click", function () {
    //     console.log("test");
    // });
    // choice1.addEventListener("click", answerCheck);
    // choice2.addEventListener("click", answerCheck);
    // choice3.addEventListener("click", answerCheck);
    // choice4.addEventListener("click", answerCheck);

    // quizDiv.addEventListener("click", answerCheck)

// choicesEl.addEventListener("click". answerCheck, nextQuestion);



// function nextQuesiton () {
//     for (questionIndex = 1; questionIndex < questions.length; questionIndex++) {
//         questionTitle.textContent = questions[questionIndex].title;
//         choice1.textContent = questions[questionIndex].choices[0];
//         choice2.textContent = questions[questionIndex].choices[1];
//         choice3.textContent = questions[questionIndex].choices[2];
//         choice4.textContent = questions[questionIndex].choices[3];
//         answer = questions[questionIndex].answer;
//     };
//     questionIndex++;

//     if (questionIndex < questions.length) {
//         renderFirstQuestion();
//     } else {
//         // console.log("End");
//     }
// };





//     choice1.addEventListener("click", answerCheck);
//     choice2.addEventListener("click", answerCheck);
//     choice3.addEventListener("click", answerCheck);
//     choice4.addEventListener("click", answerCheck);
