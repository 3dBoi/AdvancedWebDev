
import { ChangeBG } from "./View.js";
import { PlayerUpdate, RegisterEventListener, CheckGameStart, InitPlayer, CheckGameOver } from "./Character.js";
import { InstantiatePlatforms, MovePlatforms } from "./Platform.js";
import { Collect } from "./Collectable.js";


let score = document.getElementById("score");
let scorePoints = 0;
let lastUpdate = Date.now();
export let gamestart = false;
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
    
    

    if(gamestart){

        MovePlatforms();

        scorePoints += deltaTime;

        if(CheckGameOver()){

            gameOver();
        }


    }else{

        gamestart = CheckGameStart();
    }

    //ChangeBG();
    scorePoints += Collect();
    PlayerUpdate();

    score.innerHTML = "Score: "+scorePoints;
    

}

function gameOver(){

    clearInterval(tick);
    document.getElementById("gameover").style.visibility = "visible";
    document.getElementById("finalscore").innerHTML = "Score: "+scorePoints;
}

function reloadGame(){
    location.reload();
}

export function DeltaTime(){
    return deltaTime;
}

