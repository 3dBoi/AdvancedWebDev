import { Collision,YPosition, PlatformVY } from "./Platform.js";
import { DeltaTime } from "./Main.js";

let posy;
let posx;
let vx = 0;
let vy = 0;
let ax = 0;
let ay = 0;
let player;
let playerBounds;
let holdLeft = false;
let holdRight = false;
let onGround = true;
let gravity = 2000;
let friction = 900;
let speedGround = 400;
let speedAir = 100;
let jumpheight = 1300;
let onFloor = false;

export let velocity;

// Update Player Position
export function PlayerUpdate(){
    
    updatePosition();
    
    player.style.top = posy+"px";
    player.style.left = posx+"px";
}

export function InitPlayer(){

    player = document.getElementById("player");
    playerBounds = player.getBoundingClientRect();
    posy = playerBounds.y;
    posx = playerBounds.x;
}

// Events for Movement
export function RegisterEventListener(){

    window.addEventListener("keydown", function(event) {

        if (event.code === "ArrowUp"){

            if(onGround){
                onGround = false;
                vy = -jumpheight;
            }
            
        } else if (event.code === "ArrowLeft"){

            holdLeft = true;

            if(onGround){
                vx = -speedGround;
            }else{
                vx = -speedGround;
            }
            
        } else if (event.code === "ArrowRight"){

            holdRight = true;

            if(onGround){
                vx = speedGround;
            }else{
                vx = speedAir;
            }
            
        }

        event.preventDefault();

    }, true)

    window.addEventListener("keyup", function(event) {

        if (event.code === "ArrowRight"){

            holdRight = false;
            
        } else if (event.code === "ArrowLeft"){

            holdLeft = false;
        }

        event.preventDefault();

    }, true)


}

// Updates Position regarding the cubes velocity
function updatePosition(){

    ay = gravity;

    if(!holdLeft&&onGround&&vx<0){
        ax = friction;
    }
    else if(!holdRight&&onGround&&vx>0){
        ax = -friction;
    }
    if(-50<=vx&&vx<=50){
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
    }else if (posx>window.innerWidth-playerBounds.width) {
        posx = window.innerWidth-playerBounds.width;
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

    if (posy>window.innerHeight-playerBounds.height) {
        posy = window.innerHeight-playerBounds.height;
        vy = 0;
        ay = 0;
        onGround = true;
        onFloor = true;
    } else if(vy>0&&Collision()){
        posy = YPosition()-playerBounds.height;
        vy = PlatformVY();
        ay = 0;
        onGround = true;
    }

    return posy;

}

// check if player is at defined height to start game
export function CheckGameStart(){

    if(posy <= window.innerHeight/3){
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

    


