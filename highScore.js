const highScoreList=document.getElementById("highScoreList");
const highScores=JSON.parse(localStorage.getItem("highScore"))||[];
console.log(highScores);
highScoreList.innerHTML=highScores.map(score=>{
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");