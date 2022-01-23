// declared varibles
let startButton = $('#init')
let rules = $('#rules')
let timerCont = $('#timerContainer')
let timerCountdown= ('#timer')
let timeLimit = 80;
let quizMain = $('#quizMain')
let listEl = $('#answerList')
let aOne = $('#answer1')
let aTwo = $('#answer2')
let aThree = $('#answer3')
let aFour = $('#answer4')
let aFive = $('#answer5')
let scores = $('#highScores')
let finalScore = 0;

// declare questions for the quiz
const quizQuestions = [
    {
        question:'Commonly used data types DO Not Include:',
        choices:['stings', 'booleans','alerts','numbers'],
        correctAnswer: 'alerts'
    },
    {
        question:'The condition in an if/else statement is enclosed with _______.',
        choices:['quotes','curly braces', 'parenthesis', 'square brackets'],
        correctAnswer:'parenthesis'
    },
    {
        question:'Arrays in JavaScript can be used to store _______.',
        choices:['numbers and strings','other arrays','booleans','all of the above'],
        correctAnswer: 'all of the above'
    },
    {
        question:'String values must be enclosed within ______ when being assigned to variables',
        choices:['commas','cruly','quotes','parenthesis'],
        correctAnswer: 'quotes'
    },
    {
        question:'A very usefull tool used during development and debegging for printing content to the debugger is:',
        choices:['JavaScript','terminal/bash','for loops','console log'],
        correctAnswer: 'console log'
    },
]

let questionIndex = 0;

//console.log(quizQuestions)
//console.log(quizQuestions[1].question)
//console.log(quizQuestions[1].choices)
//console.log(quizQuestions[1].correctAnswer)

function timer(){
    displayQuestion();
    let timerInterval = setInterval(function (){
        timeLimit--;
            timerCountdown.textContent = 'Timer: ' + timeLimit
        if (timeLimit === 0 || questionIndex >= 5) {
            clearInterval(timerInterval);
            highScores();
            return;
        }
    }, 1000);
}

function displayQuestion (){
    startButton.style.display='none';
    listEl.style.display='block';
    let questionOutput = quizQuestions[questionIndex].question;
    let answerChoices = quizQuestions[questionIndex].choices;
    answerChoices = [aOne,aTwo,aThree,aFour,aFive];
    aOne.textContent = (quizQuestions[questionIndex].choices[0]);
    aTwo.textContent = (quizQuestions[questionIndex].choices[1]);
    aThree.textContent = (quizQuestions[questionIndex].choices[2]);
    aFour.textContent = (quizQuestions[questionIndex].choices[3]);
    aFive.textContent = (quizQuestions[questionIndex].choices[4]);

//add eventListeners to the item list then for loop to cycle through
    let answerClick = $('li')
    for(i = 0; i < answerClick.length; i++){
        answerClick[i].onClick(checkAnswers);
    }
    if (questionIndex >= 5) {
        return;
    };
}
//check if answers are correct
function checkAnswers () {
    Event.preventDefault()
    let rightAnswer = Event.target.textContent;
    let answerMessage = $('p');
    $(answerMessage).append(listEl);
    {
        if (rightAnswer === quizQuestions[questionIndex].correctAnswer){
            answerMessage.textContent = 'Correct!';
        }
        else {
            answerMessage.textContent = 'Incorrect!';
            timeLimit = timeLimit -10;
        }
    }
    if (questionIndex >= 5) {
        return;
    } else {
        questionIndex++;
        displayQuestion();
    }
}

//set up highScores