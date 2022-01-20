import { ChangeBG } from "./View.js";
import { PlayerUpdate, RegisterEventListener, CheckGameStart, InitPlayer } from "./Character.js";
import { InstantiatePlatforms, MovePlatforms } from "./Platform.js";


window.onload = start();

let score = document.getElementById("score");
let scorePoints = 0;
let lastUpdate = Date.now();
let gamestart = false;
let deltaTime;

function start(){

    InitPlayer();
    InstantiatePlatforms();
    RegisterEventListener();
    setAnimator(30);
    
    
}

// start Animator
function setAnimator(fps){
    
    setInterval(update,1000/fps);
    

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
    }else{

        gamestart = CheckGameStart();
    }

}

export function DeltaTime(){
    return deltaTime;
}




