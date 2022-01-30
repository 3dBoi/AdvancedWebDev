
import { PlayerUpdate, RegisterEventListener, CheckGameStart, InitPlayer, CheckGameOver } from "./Character.js";
import { InstantiatePlatforms, MovePlatforms } from "./Platform.js";
import { Collect } from "./Collectable.js";
import { Fight } from "./Enemy.js";


let score = document.getElementById("score");
let scorePoints = 0;
let lastUpdate = Date.now();
export let gamestart = false;
let deltaTime;
let tick;
let elapsedTime = 0;


window.onload = start();

function start(){

    InitPlayer();
    InstantiatePlatforms();
    RegisterEventListener();
    setAnimator(60);

    document.getElementById("tryAgainBtn").onclick = function(){reloadGame()};
    
    
}

// start Animator
function setAnimator(fps){
    
    tick = setInterval(update,1000/fps);
    

}

// Called on every frame
function update(){

    let now = Date.now();
    deltaTime = now - lastUpdate;
    lastUpdate = now;
    
    

    if(gamestart){

        MovePlatforms();

        scorePoints += deltaTime;
        elapsedTime += deltaTime;

        if(CheckGameOver()||Fight()){

            gameOver();
        }


    }else{

        gamestart = CheckGameStart();
    }

    scorePoints += Collect();
    PlayerUpdate();

    score.innerHTML = "Score: "+scorePoints;
    

}

function gameOver(){
    clearInterval(tick);
    document.getElementById("gameover").style.visibility = "visible";
    document.getElementById("finalscore").innerHTML = "Score: " + scorePoints;

    const data = new URLSearchParams();
    data.append('score', scorePoints);
    data.append('time', elapsedTime);
    fetch('/profile', {
        method: 'POST',
        body: data
    }).then(() => {
      //  document.getElementById("feedback").innerHTML = "Status: synced with server";
    }).catch((reason) => {
      //  document.getElementById("feedback").innerHTML = "Status: failed: " + reason;
    });
}

function reloadGame(){
    location.reload();
}

export function DeltaTime(){
    return deltaTime;
}
