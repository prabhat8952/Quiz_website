const question=document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choice-text"));
// console.log(choices);
const progressText=document.getElementById("progress-Text");
const scoreText=document.getElementById("score");
const progressBarFull=document.getElementById("progress-bar-full");
const gameContainer=document.getElementById("game-container");
const loader=document.getElementById("loader");
let currentQuestion={};
let score=0;
let acceptingAnswers=false;
let questionCounter=0;
let availableQuestions=[];
let questions=[];
fetch("https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple")
  .then(res=>{
  return res.json();
})
  .then(loadedQuestions=>{
    questions=loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question:loadedQuestion.question
      };

      const answerChoices=[...loadedQuestion.incorrect_answers];
      formattedQuestion.answer=Math.floor(Math.random()*3)+1;
      answerChoices.splice(formattedQuestion.answer-1,0,loadedQuestion.correct_answer);
      
      answerChoices.forEach((choice,index) => {
        formattedQuestion["choice" + (index+1)]=choice;
      });
      return formattedQuestion;
    });
    startGame();
  })
  .catch(err=>{
    console.error(err);
  });
const correctBonus=10;
const maxQuestion=5;
startGame=()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestion();
    gameContainer.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion=()=>{
    if(availableQuestions.length===0 || questionCounter>=maxQuestion){
      localStorage.setItem("mostRecentScore",score);
      return window.location.assign("end.html");
    }
    
   questionCounter++;
   progressText.innerText=`Questions ${questionCounter}/${maxQuestion}`;
   progressBarFull.style.width=`${(questionCounter/maxQuestion)*100}%`;
   const questionIndex=Math.floor(Math.random()*availableQuestions.length);
   currentQuestion=availableQuestions[questionIndex];
   question.innerText=currentQuestion.question;

    choices.forEach((choice)=>{
      const number=choice.dataset['number'];
      choice.innerText=currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers=true;
};

function handleChoiceSelection(e) {
  if (!acceptingAnswers) return;
  acceptingAnswers = false;

  const selectedChoice = e.target;
  const selectedAnswer = selectedChoice.dataset["number"];
  const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  if(classToApply=="correct")
  {
    incrementScore(correctBonus);
  }
  if(classToApply=="incorrect")
  {
     choices.forEach((choice)=>{
        if(choice.dataset["number"]==currentQuestion.answer)
        {
          choice.parentElement.classList.add("correct");
          setTimeout(() => {
            choice.parentElement.classList.remove("correct");
          }, 1500);
        }
     })
  }
  selectedChoice.parentElement.classList.add(classToApply);
  setTimeout(() => {
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
    acceptingAnswers = true;
  }, 1500);
}

choices.forEach((choice) => {
  choice.addEventListener("click", handleChoiceSelection);
}); 

incrementScore=num=>{
  score+=num;
  scoreText.innerText=score;
}

