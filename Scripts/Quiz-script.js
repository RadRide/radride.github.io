const params = new URLSearchParams(window.location.search);
const username = params.get("username");
let score = 0;
document.getElementById("username").textContent = username + ": ";

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("answer"));
const button = document.getElementById("next");

let currentQuestion = {};
let acceptingAnswer = false;
let questionCounter = 0;
let availableQuestions = [];

const maxQuestions = 10;

let questions = [
    {
        question: "Which country is located to the north of Lebanon?",
        choice1: "Syria",
        choice2: "Turkey",
        choice3: "Jordan",
        choice4: "Cyprus",
        answer: 1
    },
    {
        question: "What is the capital city of Lebanon?",
        choice1: "Tyre",
        choice2: "Byblos",
        choice3: "Tripoli",
        choice4: "Beirut",
        answer: 4
    },
    {
        question: "In which year did Lebanon gain its independence from French colonial rule?",
        choice1: "1945",
        choice2: "1943",
        choice3: "1947",
        choice4: "1944",
        answer: 2
    },
    {
        question: "What is the largest cedars forest in Lebanon",
        choice1: "Cedars of God Bcharre",
        choice2: "Barouk Cedars Reserve",
        choice3: "Tannourine Cedars Reserve",
        choice4: "Jaj Cedars Forest ",
        answer: 3
    },
    {
        question: "What is the altitude of the highest peak in Lebanon 'Qurnat Al Sawda'?",
        choice1: "3,088 m",
        choice2: "4,102 m",
        choice3: "2,424 m",
        choice4: "3,536 m",
        answer: 1
    },
    {
        question: "What Lebanese's touristic site was nearly added to the 7 wonders of the world?",
        choice1: "Bala's Gorge",
        choice2: "Jeita Grotto",
        choice3: "Cedars of God Bcharre",
        choice4: "Byblos Citadel",
        answer: 2
    },
    {
        question: "Who is the iconic Lebanese singer and actress known as the 'Divine' and considered one of the Arab world's most celebrated artists?",
        choice1: "Sabah",
        choice2: "Nancy Ajram",
        choice3: "Wael Kfouri",
        choice4: "Fairuz",
        answer: 4
    },
    {
        question: "What is the national dish of Lebanon?",
        choice1: "Hummus",
        choice2: "Falafel",
        choice3: "Kibbeh",
        choice4: "Raw Meat",
        answer: 3
    },
    {
        question: "Which Lebanese city is famous for its annual international music festival held in an ancient Roman amphitheater?",
        choice1: "Akkar",
        choice2: "Baalbek",
        choice3: "Laqlouq",
        choice4: "Zgharta",
        answer: 2
    },
    {
        question: "What is the most famous book written by Gibran Kahlil Gibran?",
        choice1: "The Prophet",
        choice2: "Broken Wings",
        choice3: "Sand and foam",
        choice4: "Lord of the Rings",
        answer: 1
    }
]

startGame();

choices.forEach(choice =>{
    choice.addEventListener("click", e =>{
        if(!acceptingAnswer) return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const number = selectedChoice.closest(".answer-container").querySelector(".number");

        let classToApply = "incorrect";
        if(selectedAnswer == currentQuestion.answer){
            classToApply = "correct";
            score++;
            document.getElementById("score").innerText = score + "/10";
        }

        addColors();
        button.disabled = false;
    })
})

button.onclick = getNewQuestion;
button.disabled = acceptingAnswer;
function startGame(){
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

function getNewQuestion(){
    if(availableQuestions.length == 0 || questionCounter >= maxQuestions){
        button.onclick = goToFinish();
    }

    removeColor();

    questionCounter++;
    // Chooses a random question
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    // Assign the related choices
    choices.forEach(choice =>{
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })
    // Removes already displayed question
    availableQuestions.splice(questionIndex, 1);

    if(questionCounter >= maxQuestions){
        button.innerText = "Finish";
    }

    acceptingAnswer = true;
    button.disabled = true;
}

function addColors(){
    choices.forEach(choice => {
        const numberDiv = choice.closest(".answer-container").querySelector(".number");
        let classToApply = "incorrect";
        if (choice.dataset["number"] == currentQuestion.answer) {
            classToApply = "correct";
        }
        choice.parentElement.classList.add(classToApply);
        numberDiv.classList.add(classToApply);
    });
}

function removeColor(){
    choices.forEach(choice => {
        const numberDiv = choice.closest(".answer-container").querySelector(".number");
        let classToApply = "incorrect";
        if (choice.dataset["number"] == currentQuestion.answer) {
            classToApply = "correct";
        }
        choice.parentElement.classList.remove(classToApply);
        numberDiv.classList.remove(classToApply);
    });
}

function goToFinish(){
    window.location.href = "Finish.html?username=" + encodeURIComponent(username) + "&score=" + encodeURIComponent(score);
}