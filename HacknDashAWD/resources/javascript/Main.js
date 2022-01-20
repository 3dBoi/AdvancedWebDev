import { ChangeBG } from "./View.js";
import { PlayerUpdate, RegisterEventListener, CheckGameStart, InitPlayer, CheckGameOver } from "./Character.js";
import { InstantiatePlatforms, MovePlatforms } from "./Platform.js";


let score = document.getElementById("score");
let scorePoints = 0;
let lastUpdate = Date.now();
let gamestart = false;
let deltaTime;
let tick;


window.onload = start();

function start(){

    InitPlayer();
    InstantiatePlatforms();
    RegisterEventListener();
    setAnimator(30);

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
    
    ChangeBG();
    PlayerUpdate();

    if(gamestart){

        MovePlatforms();

        scorePoints += deltaTime;

        score.innerHTML = "Score: "+scorePoints;

        if(CheckGameOver()){

            gameOver();
        }


    }else{

        gamestart = CheckGameStart();
    }

}

function gameOver(){

    clearInterval(tick);
    document.getElementById("tryAgainBtn").style.visibility = "visible";
}

function reloadGame(){

    console.log("RELOAD");
    location.reload();
}

export function DeltaTime(){
    return deltaTime;
}




