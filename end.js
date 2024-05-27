const username=document.getElementById("username");
const saveScoreBtn=document.getElementById("saveScoreBtn");
const mostRecentScore=localStorage.getItem("mostRecentScore");
const finalScore=document.getElementById("finalScore");
const highScore=JSON.parse(localStorage.getItem("highScore"))||[];
const maxHighScore=5;
finalScore.innerText=mostRecentScore;
username.addEventListener("keyup",()=>{
    saveScoreBtn.disabled=!username.value;
});

SaveHighScore = e => {
    e.preventDefault();
    const score={
        score:mostRecentScore,
        name:username.value
      };
      highScore.push(score);
      highScore.sort((a,b)=>b.score-a.score);
      highScore.splice(4);
      localStorage.setItem("highScore",JSON.stringify(highScore));
      window.location.assign("index.html");
};