import { ChangeBG } from "./View.js";
import { PlayerUpdate, RegisterEventListener } from "./Character.js";
import { InstantiatePlatforms } from "./Platform.js";


window.onload = start();

let score = document.getElementById("score");
let scorePoints = 0;
let deltaTime;
let lastUpdate = Date.now();

function start(){


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

    score.innerHTML = "Score: "+Math.floor(scorePoints+=deltaTime);
    ChangeBG();
    PlayerUpdate(deltaTime);
    

}




