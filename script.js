const questions = [
    {
        question: "Which Is The Largest Animal In The World?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },

    {
        question: "Which Is The Largest Continent In The World?",
        answers: [
            { text: "Africa", correct: false},
            { text: "Europe", correct: false},
            { text: "Australia", correct: false},
            { text: "Asia", correct: true},
        ]
    },

    {
        question: "What country won the 1982 World Cup in Spain defeating West Germany 3-1?",
        answers: [
            { text: "France", correct: false},
            { text: "Portugal", correct: false},
            { text: "Italy", correct: true},
            { text: "Georgia", correct: false},
        ]
    },

    {
        question: "Which Nation Won World Cup 2022 (Football)?",
        answers: [
            { text: "Spain", correct: false},
            { text: "France", correct: false},
            { text: "Argentina", correct: true},
            { text: "Brazil", correct: false},
        ]
    },

    {
        question: "What Was The Name Of Main Character In Beyond Two Souls?",
        answers: [
            { text: "Conor", correct: false},
            { text: "Jodi", correct: true},
            { text: "Emma", correct: false},
            { text: "North", correct: false},
        ]
    },

    {
        question: "Who Is Not Taking Part In PVPFlow",
        answers: [
            { text: "Moska", correct: false},
            { text: "Nikki Slow", correct: true},
            { text: "Taha 9/11", correct: false},
            { text: "Kami 24", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions()
{
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => 
    {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answersButton");
        answerButtons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState()
{
    nextButton.style.display = "none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if(isCorrect)
    {
        selectedButton.classList.add("correct");
        score++;
    }
    else
    {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => 
    {
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore()
{
    resetState();
    questionElement.innerHTML = `You Scored ${score} Out Of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestions();
    }
    else
    {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>
{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();