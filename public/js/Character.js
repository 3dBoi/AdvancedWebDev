import { Collision,YPosition, PlatformVY } from "./Platform.js";
import { DeltaTime } from "./Main.js";

// Player Variables
let posy;
let posx;
let vx = 0;
let vy = 0;
let ax = 0;
let ay = 0;
let player;

// Player Input
let holdLeft = false;
let holdRight = false;

// Worldinteraction
let gravity = 300;
let friction = 200;
let speedGround = 30;
let speedAir = 15;
let jumpheight = 150;
let onFloor = false;
let onGround = true;

// Animation Variables
let animation = 0;
let animationStart = 0;
let animationCurr = 0;
let animationStarted = false;
let animationIndex = 0;

// Animation Arrays
let leftAnimation = ["images/animation/right1.png" , "images/animation/right2.png" , "images/animation/right3.png" , "images/animation/right4.png" , "images/animation/right5.png"];
let rightAnimation = ["images/animation/right1.png" , "images/animation/right2.png" , "images/animation/right3.png" , "images/animation/right4.png" , "images/animation/right5.png"];
let jumpAnimation = ["images/animation/jump1.png" , "images/animation/jump2.png"];
let defaultAnimation = ["images/animation/default.png"];

export let velocity;

// Update Player Position
export function PlayerUpdate(){
    
    updatePosition();
    if(vy>0&&!onGround){
        animationStarted = false;
        animationIndex = 0;
    }

    Animation();
    
  
    
    player.style.top = posy+"%";
    player.style.left = posx+"%";
}

export function InitPlayer(){

    let gamescreen = document.getElementById("gamescreen");
    player = document.createElement("img");
    player.src = "images/default.png";
    player.alt = "player";
    player.id = "player";
    player.style.width = 3.8+"%";
    player.style.height = (((7/100)*window.innerWidth)/window.innerHeight)*100+"%";
    player.style.top = 100-(parseFloat(player.style.height))+"%";
    player.style.left = 50+"%";
    gamescreen.appendChild(player);
    posy = parseFloat(player.style.top);
    posx = parseFloat(player.style.left);

}

// Events for Movement
export function RegisterEventListener(){

    window.addEventListener("keydown", function(event) {

        if (event.code === "ArrowUp"){

            if(onGround){

                if(!animationStarted){
                    animationStart = Date.now();
                    animationStarted = true;
                }

                onGround = false;
                vy = -jumpheight;
            }
            
        } else if (event.code === "ArrowLeft"){

            holdLeft = true;

            if(onGround){

                if(!animationStarted){
                    animationStart = Date.now();
                    animationStarted = true;
                }

                vx = -speedGround;
                ax = 0;
            }else{
                vx = -speedAir;
            }
            
        } else if (event.code === "ArrowRight"){

            holdRight = true;

            if(onGround){

                if(!animationStarted){
                    animationStart = Date.now();
                    animationStarted = true;
                }

                vx = speedGround;
                ax = 0;
            }else{
                vx = speedAir;
            }
            
        }

        event.preventDefault();

    }, true)

    window.addEventListener("keyup", function(event) {

        if (event.code === "ArrowRight"){

            animationStarted = false;
            animationIndex = 0;
            holdRight = false;
            
        } else if (event.code === "ArrowLeft"){

            animationStarted = false;
            animationIndex = 0;
            holdLeft = false;
        }

        event.preventDefault();

    }, true)


}

// Updates Position regarding the cubes velocity
function updatePosition(){

    ay = gravity;

    if(!holdLeft&&onGround&&vx<0){
        //ax = friction;
        vx = 0;
    }
    else if(!holdRight&&onGround&&vx>0){
        //ax = -friction;
        vx = 0;
    }
    if(-5<=vx&&vx<=5){
        vx = 0;
        ax = 0;
    }

    velocity = vy;

    posx = updateXPosition();
    posy = updateYPosition();

}

// Update Position for X, Spawns on opposite side on leaving window
function updateXPosition(){

    posx = posx + (vx*(DeltaTime()*0.001)) + (0.5*ax*Math.pow((DeltaTime()*0.001),2));
    vx = vx + (ax * (DeltaTime()*0.001));
   

    if(posx<0){
        posx = 0;
        vx=0;
        ax=0;
    }else if (posx>100-parseFloat(player.style.width)) {
        posx = 100-parseFloat(player.style.width);
        vx=0;
        ax=0;
    }

    return posx;

}

// Update Position for Y, Spawns on opposite side on leaving window
function updateYPosition(){

    posy = posy + (vy*(DeltaTime()*0.001)) + (0.5*ay*Math.pow((DeltaTime()*0.001),2));
    vy = vy + (ay * (DeltaTime()*0.001));

    onGround = false;
    onFloor = false;

    if (posy>=100-parseFloat(player.style.height)) {
        posy = 100-parseFloat(player.style.height);
        vy = 0;
        ay = 0;
        onGround = true;
        onFloor = true;
    } else if(vy>=0&&Collision()){
        posy = YPosition()-parseFloat(player.style.height);
        vy = PlatformVY();
        ay = 0;
        onGround = true;
    }

    return posy;

}

// check if player is at defined height to start game
export function CheckGameStart(){

    if(posy <= 100/3){
        return true;
    } else{
        return false;
    }
}

function calcVelocity(v1, v2){

    return Math.sqrt(Math.pow(v1, 2) + Math.pow(v2, 2));

}

export function CheckGameOver(){

    if(onFloor){
        return true;
    }
    return false;
}

function Animation(){

    if(holdLeft&&onGround){
        animationCurr = Date.now();
        animation = 1;
    }else if(holdRight&&onGround){
        animationCurr = Date.now();
        animation = 2;
    }else if(vy<0&&!onGround){
        animationCurr = Date.now();
        animation = 3;
    } else {
        animationCurr = animationStart;
        animation = 0;
    }

    let animationDelta = animationCurr - animationStart;

    console.log(animationDelta);
    

    player = document.getElementById("player");

    switch (animation){

        case 0:

            player.src = defaultAnimation[animationIndex];
            break;

        case 1:

            
            if(animationDelta>50){
                NextKeyframe(leftAnimation)
                player.src = leftAnimation[animationIndex];
                animationStart = Date.now();
            } else {
                player.src = leftAnimation[animationIndex];
            }

            player.style.transform = "scaleX(-1)";
            break;

        case 2:

            if(animationDelta>50){
                NextKeyframe(rightAnimation)
                player.src = rightAnimation[animationIndex];
                animationStart = Date.now();
            } else {
                player.src = rightAnimation[animationIndex];
            }

            player.style.transform = "scaleX(1)";
            break;

        case 3:

            if(animationDelta>50){
                NextKeyframe(jumpAnimation)
                player.src = jumpAnimation[animationIndex];
                animationStart = Date.now();
            } else {
                player.src = jumpAnimation[animationIndex];
            }

            break;

        default:

            player.src = defaultAnimation[animationIndex];
            break;
    }
}

function NextKeyframe(keyframes){

    
    if(animationIndex>=keyframes.length-1){
        animationIndex=0;
    }else{
        animationIndex++;
    }

}

    


