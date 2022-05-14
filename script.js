// declare questions for the quiz
let quizQuestions = [
    {
        question: 'Commonly used data types DO Not Include:',
        choices: ['stings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts'
    },
    {
        question: 'The condition in an if/else statement is enclosed with _______.',
        choices: ['quotes', 'curly braces', 'parenthesis', 'square brackets'],
        answer: 'parenthesis'
    },
    {
        question: 'Arrays in JavaScript can be used to store _______.',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above'
    },
    {
        question: 'String values must be enclosed within ______ when being assigned to letiables',
        choices: ['commas', 'cruly', 'quotes', 'parenthesis'],
        answer: 'quotes'
    },
    {
        question: 'A very usefull tool used during development and debegging for printing content to the debugger is:',
        choices: ['JavaScript', 'terminal/bash', 'for loops', 'console log'],
        answer: 'console log'
    },
]

// declared letibles
let score = 0;
let currentQuestion = -1;
let timeLeft = 0;
let timer;

//starts countdown on click of start button

function start() {
    timeLeft = 60;
    document.getElementById('timeLeft').innerHTML = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById('timeLeft').innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);

    nextQuestion();
}

function endQuiz() {
    clearInterval(timer);

    let quizContent = `
    <h2> Game Over! </h2>
    <h3> Your final score is` + score + ` /100 </h3>
    <input type='text' id='name' placeholder='Enter your name'>
    <button onclick='setScore()'>Submit</button>`;

    document.getElementById('quizBody').innerHTML = quizContent;
}

function setScore() {
    localStorage.setItem('highScore', score);
    localStorage.setItem('highScoreInput', document.getElementById('name').value);
    getScore();
}

function getScore() {
    let quizContent = `
    <h2>` + localStorage.getItem('highScoreInput') + `'s highscore is: </h2>
    <h3>` + localStorage.getItem('highScore') + `</h3><br/>
    
    <button onclick='clearScore()'>Clear Score</button> <button onclick='resetQuiz()'>Try Again</button>`;

    document.getElementById('quizBody').innerHTML = quizContent;
}

function clearScore() {
    localStorage.setItem('highScore', '');
    localStorage.setItem('highScoreInput', '');

    resetQuiz();
}

function resetQuiz() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById('timeLeft').innerHTML = timeLeft;

    let quizContent = `
    <h2> Welcome to the Coding Quiz! </h2>

    <p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p>

    <h3>
        Click to Start!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function incorrect() {
    timeLeft -= 10;
    nextQuestion();
}

function correct() {
    score += 20;
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion > quizQuestions.length - 1) {
        endQuiz();
        return;
    }

    let quizContent = `
    <h2>` + quizQuestions[currentQuestion].question + `</h2>`

    for (let i = 0; i < quizQuestions[currentQuestion].choices.length; i++) {
        let buttonCode = `<button onclick="[ANS]">[CHOICE]</button>";`
        buttonCode = buttonCode.replace("[CHOICE]", quizQuestions[currentQuestion].choices[i]);
        if (quizQuestions[currentQuestion].choices[i] == quizQuestions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }

    document.getElementById("quizBody").innerHTML = quizContent;

}
