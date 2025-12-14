const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "Qual é a capital do Brasil?",
        answers: [
            { text: "Brasília", correct: true },
            { text: "Rio de Janeiro", correct: false },
            { text: "São Paulo", correct: false },
            { text: "Salvador", correct: false },
        ],
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        answers: [
            { text: "Terra", correct: false },
            { text: "Júpiter", correct: true },
            { text: "Saturno", correct: false },
            { text: "Marte", correct: false },
        ],
    },
    {
        question: "Em que ano o homem pisou na Lua pela primeira vez?",
        answers: [
            { text: "1959", correct: false },
            { text: "1969", correct: true },
            { text: "1979", correct: false },
            { text: "1989", correct: false },
        ],
    },
    {
        question: "Quem pintou a Mona Lisa?",
        answers: [
            { text: "Pablo Picasso", correct: false },
            { text: "Vincent van Gogh", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Claude Monet", correct: false },
        ],
    },
    {
        question: "Qual é a fórmula química da água?",
        answers: [
            { text: "CO2", correct: false },
            { text: "H2O", correct: true },
            { text: "O2", correct: false },
            { text: "NaCl", correct: false },
        ],
    },
    {
        question: "Qual idioma é falado no Brasil?",
        answers: [
            { text: "Espanhol", correct: false },
            { text: "Inglês", correct: false },
            { text: "Português", correct: true },
            { text: "Francês", correct: false },
        ],
    },
    {
        question: "Qual é a menor unidade da vida?",
        answers: [
            { text: "Molécula", correct: false },
            { text: "Célula", correct: true },
            { text: "Átomo", correct: false },
            { text: "Órgão", correct: false },
        ],
    },
    {
        question: "Qual é o oceano mais profundo do mundo?",
        answers: [
            { text: "Atlântico", correct: false },
            { text: "Índico", correct: false },
            { text: "Pacífico", correct: true },
            { text: "Ártico", correct: false },
        ],
    },
    {
        question: "Qual país é famoso por suas tulipas e moinhos de vento?",
        answers: [
            { text: "Bélgica", correct: false },
            { text: "Países Baixos", correct: true },
            { text: "Alemanha", correct: false },
            { text: "Dinamarca", correct: false },
        ],
    },
    {
        question: "Quantos segundos existem em um minuto?",
        answers: [
            { text: "30", correct: false },
            { text: "45", correct: false },
            { text: "60", correct: true },
            { text: "90", correct: false },
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {

    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfeito! Você é um gênio!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Ótimo trabalho! Você mandou bem!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Bom esforço! Continue aprendendo!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Nada mal! Tente novamente para melhorar!";
    } else {
        resultMessage.textContent = "Continue estudando! Você vai melhorar!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}