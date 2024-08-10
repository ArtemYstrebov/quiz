let welcomeScreen = document.querySelector(".welcome");
let quizScreen = document.querySelector(".quiz");
let resultScreen = document.querySelector(".result");
let startQuizBtn = document.querySelector(".start-quiz-btn");
let answerBtns = document.querySelectorAll(".answer");
let restartQuizBtn = document.querySelector(".restart-quiz-btn");
let quizQuestion = document.querySelector(".quiz_question")
let resultTitle = document.querySelector(".result_title")
let quizCounter = document.querySelector(".quiz_counter span")

let timerElement = document.querySelector(".timer");
let interval;
let startTimerValue = 10;

function startTimer() {
    timerElement.style.display = "block"
    timerElement.innerHTML = startTimerValue;

 interval = setInterval(function () {
    if (startTimerValue == 1) {
    timerElement.innerHTML = 0;
    clearInterval(interval);
    showQuestionResult("red");
    showNextQuestion();
     } else {
        startTimerValue--;
         timerElement.innerHTML = startTimerValue;
      }
  }, 1000);
}

let allQuestion = [
    {
        question: "69-18*2",
        answers: [90, 74, 56, 33, 36],
        correctAnswer: 33
    },
    {
        question: "(5*6)+78",
        answers: [110, 108, 80, 46, 87],
        correctAnswer: 108
    },
     {
        question: "x+42=64",
        answers: [52, 18, 22, 34, 26],
        correctAnswer: 22
    },
    {
        question: "3739-(5113+4739)",
        answers: [6113, 7890, 2554, 9437, 8545],
        correctAnswer: 6113
    },
    {
        question: "4*(4560-3420)",
        answers: [4675, 9574, 2537, 5798, 4560],
        correctAnswer: 4560
    }
]
let userPoint = 0
let currQuestionNumber = 0

function renderQuestion(quest) {
    quizQuestion.innerHTML = quest.question
    let sorted = shuffle(quest.answers);
    answerBtns.forEach((btn, i) => btn.innerHTML = quest.answers[i])
    startTimer ()
}

function showQuestionResult(color) {
    quizScreen.style.background = color

 setTimeout(() => {
        quizScreen.style.background = "#113018"
    }, 600)
}

function disabledButton(option) {
    answerBtns.forEach(btn => btn.disabled = option)
}

function deleteActiveScreen() {
  welcomeScreen.classList.remove("active");
  quizScreen.classList.remove("active");
  resultScreen.classList.remove("active");
}

function runQuiz() {
  deleteActiveScreen();
  quizScreen.classList.add("active");
  currQuestionNumber = 0
    userPoint = 0
    renderQuestion(allQuestion[currQuestionNumber])
    quizCounter.innerHTML = currQuestionNumber + 1
}

function finishQuiz() {
  deleteActiveScreen();
  resultScreen.classList.add("active");
  resultTitle.innerHTML = `Вітаю, ти закінчив опитування і отримав ${userPoint} з ${allQuestion.length}`
}

startQuizBtn.addEventListener("click", runQuiz);
restartQuizBtn.addEventListener("click", runQuiz);

answerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        clearInterval(interval);

         if (btn.innerHTML == allQuestion[currQuestionNumber].correctAnswer) {
            userPoint++
            showQuestionResult("lightgreen")
        } else {
            showQuestionResult("red")
        }

          showNextQuestion(); 
    });
});



function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function showNextQuestion() {
    disabledButton(true);

    startTimerValue = 10; 

    setTimeout(() => {
        if (currQuestionNumber == allQuestion.length - 1) {
            finishQuiz();
        } else {
            currQuestionNumber++;
            renderQuestion(allQuestion[currQuestionNumber]);
            quizCounter.innerHTML = currQuestionNumber + 1;
        }
        disabledButton(false);
    }, 800);
}
