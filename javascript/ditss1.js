const questions = [
    {
        question: "Siapa presiden pertama Indonesia?",
        answers: ["Soekarno", "Soeharto", "Joko Widodo"],
        correct: "Soekarno"
    },
    {
        question: "Apa ibu kota Indonesia?",
        answers: ["Jakarta", "Bandung", "Yogyakarta"],
        correct: "Jakarta"
    },
    {
        question: "Gunung tertinggi di Indonesia?",
        answers: ["Gunung Merapi", "Gunung Rinjani", "Gunung Jayawijaya"],
        correct: "Gunung Jayawijaya"
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer);
        answersDiv.appendChild(button);
    });
}

function checkAnswer(answer) {
    const question = questions[currentQuestionIndex];
    const result = document.getElementById('result');
    if (answer === question.correct) {
        result.textContent = "Jawaban Benar!";
        result.classList.add('green');
        result.classList.remove('red');
    } else {
        result.textContent = "Jawaban Salah!";
        result.classList.add('red');
        result.classList.remove('green');
    }
}

function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    loadQuestion();
    document.getElementById('result').textContent = '';
}

loadQuestion();
