import { ChangeBG } from "./View.js";
import { PlayerUpdate, RegisterEventListener } from "./Character.js";


window.onload = start();


let bg = new ChangeBG();
let pu = new PlayerUpdate();
let el = new RegisterEventListener();

function start(){

   
    setAnimator(30);
    
}

// start Animator
function setAnimator(fps){
    
    setInterval(update,1000/fps);

}

// Called on every frame
function update(){
    

    bg = new ChangeBG();
    pu = new PlayerUpdate();

}




