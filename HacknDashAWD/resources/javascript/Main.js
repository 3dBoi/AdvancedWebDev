import View from "./View.js"; 

window.onload = start();

let view = new View();

function start(){

    setAnimator(30);
    
}

// start Animator
function setAnimator(fps){
    
    setInterval(update,1000/fps);

}

// Called on every frame
function update(){
    
    view.changeBG();
}


