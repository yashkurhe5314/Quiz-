const questions= [
    {
        questions: "Which is larget animal in the world?",
        answers: [
        { Text: "Shark", correct: false},
        { Text: "Blue Whale", correct: true},
        { Text: "Elephant", correct: false},
        { Text: "Giraffe", correct: false},
        ]     
     },
     {
        questions: "Which is the smallest country in the world?",
        answers: [
        { Text: "Vatican City", correct: true},
        { Text: "Bhutan", correct: false},
        { Text: "Nepal", correct: false},
        { Text: "Shri Lanka", correct: false},
        ] 
     },
     {
        questions: "Which is the largest desert in the world?",
        answers: [
        { Text: "Kalahari", correct: false},
        { Text: "Gobi", correct: false},
        { Text: "Sahara", correct: false},
        { Text: "Antarctica", correct: true},
        ] 
     },
     {
        questions: "Which is the smallest continent in the world?",
        answers: [
        { Text: "Asia", correct: false},
        { Text: "Australia", correct: true},
        { Text: "Arctic", correct: false},
        { Text: "Africa", correct: false},
        ] 
     }
];
const questionsElement = document.getElementById("question");
const answersButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function showQuiz() {
    currentQuestionIndex= 0;
    score=0;
    nextButton.innerHTML= "Next"
    showQuestions();
}
function showQuestions(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex +1;
    questionsElement.innerHTML = questionNo+ ". "+ currentQuestion.questions

    currentQuestion.answers.forEach(answers =>{
        const button= document.createElement("button")
        button.innerHTML= answers.Text;
        button.classList.add("btn");
        answersButton.appendChild(button);
        if (answers.correct) {
            button.dataset.correct=answers.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function  resetState(){
    nextButton.style.display= "none";
    while (answersButton.firstChild) {
        answersButton.removeChild(answersButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn= e.target;
    const correctAnswer=selectedBtn.dataset.correct === "true";
    if(correctAnswer){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answersButton.children).forEach(button =>{
        if (button.dataset.correct ==="true") {
            button.classList.add("correct");
        }
        button.disabled = "true;"
    });
    nextButton.style.display="block";
    
}
function showScore(){
    resetState();
    questionsElement.innerHTML=`You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";

}
function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        showQuiz();
    }
});
showQuiz();


