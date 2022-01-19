import { ChangeBG } from "./View.js";
import { PlayerUpdate, RegisterEventListener } from "./Character.js";
import { InstantiatePlattforms } from "./Plattform.js";


window.onload = start();


let bg = new ChangeBG();
let pu = new PlayerUpdate();
let el = new RegisterEventListener();
let score = document.getElementById("score");
let scorePoints = 0;

function start(){

    let n = InstantiatePlattforms();
    setAnimator(30);
    
}

// start Animator
function setAnimator(fps){
    
    setInterval(update,1000/fps);
    

}

// Called on every frame
function update(){
    
    score.innerHTML = "Score: "+scorePoints++;
    bg = new ChangeBG();
    pu = new PlayerUpdate();
    

}




