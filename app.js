let gameSeq=[];
let userSeq=[];

let btns = ["yellow", "red", "purple","green"];

let started = false;
let level=0;
let highScore = localStorage.getItem("highScore") || 0;

let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("#high-score");
highScoreDisplay.innerText = `High Score: ${highScore}`;

document.addEventListener("keypress", function(){
    if(started==false){
        
        started=true;
        h2.innerText="Level 1";
         levelUp();
    }

});

function gameFlash(btn){
      btn.classList.add("gameflash");
      setTimeout(function(){
        btn.classList.remove("gameflash")
      }, 250);
}

function userFlash(btn){
      btn.classList.add("userflash");
      setTimeout(function(){
        btn.classList.remove("userflash")
      }, 250);
}



function levelUp(){
    userSeq=[];
     level++;
     h2.innerText= `Level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    //   console.log(randBtn);
    //   console.log(randColor);
    //   console.log(randIdx);
    gameSeq.push(randColor);
     
     gameFlash(randBtn);
}


function checkAns(idx){
     // console.log("curr level : ", level);
    
     if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        
        }
       
     }
     else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to Start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
         document.querySelector("body").style.backgroundColor="white";
        },150);
         updateHighScore();
        reset();
     }
}



function btnPress(){
    console.log(this);
    let btn =this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
  started =false;
  gameSeq=[];
  userSeq=[];
  level=0;
  
}

function updateHighScore() {
    if (level > highScore) {
        highScore = level; 
        localStorage.setItem("highScore", highScore); 
        highScoreDisplay.innerText = `High Score: ${highScore}`; 
    }
}